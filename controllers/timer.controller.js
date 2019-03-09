const socket = require('./socket.controller');
const REQUEST = require('../models/request.model');

class Timer {
    constructor(){}
    requestExpire(type,id){
        return async (timer)=>{
            setTimeout(()=>{
                REQUEST.getRequestStatus(id,(error, status, email)=>{
                    if(error){
                        throw error;
                    }
                    else{
                        if(status === 0){
                            REQUEST.updateRequestStatus(id,3,(error, isUpdate)=>{
                                if(error){
                                    throw error;
                                }
                                else{
                                    if(isUpdate){
                                        socket.unAcceptedRequest(type,email,id);
                                    }
                                }
                            });
                        }
                    }
                });
            },timer);
        }
    }
}

module.exports = new Timer();
