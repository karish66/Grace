const jwt = require('jsonwebtoken');

class socketIo {
    config(http){
        this.i = 0;
        this.io = require('socket.io')(http);
        this.io.set('origins', '*:*')
        this.io.use((socket, next)=>{
            if(socket.handshake.query.token){
              const token  = socket.handshake.query.token;
              jwt.verify(token, process.env.JWT_SECRET, (error, data)=>{
                  if(error)
                      next(new Error('Authentication failure..'));
                  socket.userData =  data.userData;
                  next(null,socket.email);
              });
            }
            else{
              next(new Error('Authentication failure..'));
            }
        });
        this.io.on('connection',socket=>{
          if(socket.userData.accountType == 'AC' || socket.userData.accountType == 'EA'){
              socket.join(socket.userData.accountType);
          }else{
              socket.join(socket.userData.accountType);
              socket.join(socket.userData.email);
          }
        });
    }
    unAcceptedRequest(type,email,id){
        this.io.in(email).emit('destroy',{status:3, id:id,message:'no one can accept your request..'});
        if(type == 'ED'){
          this.io.in('EA').emit('destroy',{id:id});
        }else{
          this.io.in('AC').emit('destroy',{id:id});
        }
    }
    acceptedRequest(email,acceptorEmail){
        this.io.in(email).emit('create', {
            status:1,
            message: `your request is accepted by ${accepterEmail}`,
            acceptorEmail : acceptorEmail
        });
    }
    pickedUpRequest(email, pickUpEmail){
        this.io.in(email).emit('create',{
            status:2,
            message: `your request is picked up by ${pickUpEmail}`
        });
    }
    requestBroadcast(type,data){
        if(type == 'ED'){
          this.io.in('EA').emit('create',data);
        }else{
          this.io.in('AC').emit('create',data);
        }
    }
}

module.exports = new socketIo();
