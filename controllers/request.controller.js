const {USER} = require('../models/user.model');
const REQUEST = require('../models/request.model');
const socket = require('./socket.controller');
const Timer = require('./timer.controller');

class Request {
    constructor(){}
    filterAnyActiveRequest(){
        return (req, res, next)=>{
            REQUEST.getActiveRequest(req.body.email, (error, data)=>{
                if(error){
                  next();
                }
                else{
                  if(data.length > 0){
                    res.json({
                      error:{
                        status : true,
                        message : 'you have already an active request'
                      }
                    });
                  }
                  else{
                    next();
                  }
                }
            });
        };
    }
    createRequest(){
        return (req, res, next)=>{
            req.body = {
              	typeOfDonation:req.body.typeOfDonation,
              	amountOfDonation:req.body.amountOfDonation,
                location: {
                 type: "Point",
                 coordinates:  [req.body.long, req.body.lat]
                },
                email : req.body.email
            }
            REQUEST.addRequest(req.body, (error, data)=>{
                if(error){
                    res.json({
                        error : {
                            status : true,
                            message: error.message
                        }
                    });
                }
                else{
                    req.isAdded = data.isAdded;
                    req.body.id = data.data.id;
                    next();
                }
            });
        };
    }
    createTimer(type,timer){
        return (req, res, next)=>{
            Timer.requestExpire(type,req.body.id)(timer);
            next();
        };
    }
    requestBroadcast(reqType){
        return (req, res, next)=>{
            const reqId = req.body.id;
            socket.requestBroadcast(reqType,req.body);
            next();
        };
    }
    sendNotification(){
        return (req, res) => {
            res.json({ok:1});
        };
    }
    getAllActiveRequestInRange(){
      return (req, res, next)=>{
        const loc = [req.body.long, req.body.lat];
        const maxRange = req.body.maxRange;
        REQUEST.getActiveRequestRange(loc, maxRange, (error, data)=>{
          if(error){
            res.json({
              error:{
                status: true,
                message : error.message
              }
            });
          }else{
            res.json({
              error:{
                status: false
              },
              resData : {
                activeRequests: data
              }
            });
          }
        })
      };
    }
}

module.exports = new Request();
