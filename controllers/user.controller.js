const REQUEST = require('../models/request.model');
const {USER} = require('../models/user.model');

class User{
  constructor(){}
  getUserDetails(limit){
    return (req, res, next)=>{
      if(req.body.accountType === 'AC'){
        this.getAcceptorDetails(req.body.email, limit, (error, data)=>{
          if(error){
            res.json({
              error : {
                status : true,
                message : error.message
              }
            });
          }else{
            res.json({
              error : {
                status : false
              },
              resData : data
            });
          }
        });
      }
      else if (req.body.accountType === 'DO') {
        this.getDonerDetails(req.body.email, limit, (error, data)=>{
          if(error){
            res.json({
              error : {
                status : true,
                message : error.message
              }
            });
          }else{
            res.json({
              error : {
                status : false
              },
              resData : data
            });
          }
        });
      }
      else{
        this.getEAcceptorDetails(req.body.email, limit, (error, data)=>{
          if(error){
            res.json({
              error : {
                status : true,
                message : error.message
              }
            });
          }else{
            res.json({
              error : {
                status : false
              },
              resData : data
            });
          }
        });
      }
    };
  }
  getDonerDetails(email, limit, cb){
    // cb(null,{});
    USER.getUserDetail(email,(error, userData)=>{
      userData.password = undefined;
      if(error) cb(error)
      let dataToSend = {
        userData : userData
      };
      REQUEST.getDonationDetail(email,limit, (error, donationData)=>{
        dataToSend.donationData = donationData;
        if(error) cb(error);
        USER.getUserInRange(dataToSend.userData.location.coordinates,
             dataToSend.userData.maxRange,
             email,(error, nearUserData)=>{
               dataToSend.acceptorData = nearUserData;
               cb(error,dataToSend);
        });
      });
    })

  }
  getAcceptorDetails(email, limit, cb){
    cb(null,{
      userData:{
        accountType:'AC'
      }
    });
    // REQUEST.getAcceptorDetails(email,limit, (error, data)=>{
    //   cb(error, data);
    // });
  }
  getEAcceptorDetails(email, limit, cb){
    cb(null,{});
    // REQUEST.getDonationDetail(email,limit, (error, data)=>{
    //   cb(error, data);
    // });
  }
  getUserRange(){
    return (req, res, next)=>{
      USER.getUserRange(req.body.email,(error, data)=>{
        if(error){
          res.json({
            error:{
              status : true,
              message : error.message
            }
          });
        }else{
          req.body.maxRange = data.maxRange;
          next();
        }
      });
    };
  }
}

module.exports = new User();
