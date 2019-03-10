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
          console.log(socket.userData)
          if(socket.userData.accountType == 'AC' || socket.userData.accountType == 'EA'){
              socket.join(socket.userData.accountType);
              socket.join(socket.userData.email);
              console.log("1");
          }else{
              socket.join(socket.userData.accountType);
              socket.join(socket.userData.email);
              console.log("2");
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
    acceptedRequest(email,emailA){
      this.io.in()
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
        this.io.in(data.email).emit('create', data);
    }
    sendOtp(){
      return (req, res, next)=>{
        req.body.requestData.emailA = req.body.email;
        console.log(req.body);
        this.io.in('AC').emit('accept',{id:req.body.id});
        this.io.in(req.body.email).emit('accept',req.body.requestData);
        this.io.in(req.body.requestData.email).emit('accept',{id:req.body.id, otp : req.otp});
        next();
      };
    }
    pickUp(){
      return (req, res, next)=>{
        this.io.in(req.body.email).emit('pickedup',req.body.requestData);
        this.io.in(req.body.requestData.email).emit('pickedup',{id:req.body.id, otp : req.otp});
        next();
      };
    }
}

module.exports = new socketIo();
