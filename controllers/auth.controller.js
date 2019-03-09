const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const {USER} = require('../models/user.model');

class Auth{
    constructor(){}
    validateSession(){
        return (req, res, next)=> {
            try {
                const token = req.headers.authorization;
                console.log(req.headers.authorization);
                jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
                    if (error) {
                        res.json({
                            error: {
                                status: true,
                                message: error.message
                            }
                        });
                    } else {
                        if (data.tokenType === 'emailVerification') {
                            const cookies_email = data.userData.email;
                            const email = req.body.email;
                            if (email === cookies_email) {
                                next();
                            } else {
                                res.json({
                                    error: {
                                        status: false
                                    },
                                    resData: {
                                        isMatched: false,
                                        message: 'Entered email is not matched with verified.'
                                    }
                                })
                            }
                        } else {
                            req.body.email = data.userData.email;
                            req.body.accountType = data.userData.accountType;
                            next();
                        }
                    }
                });
            }
            catch (error) {
                res.json({
                    error: {
                        status: true,
                        message: error.message
                    }
                })
            }
        }
    }
    isNotLoggedIn(){
        return (req, res, next)=>{
            try{
                const token = req.headers.authorization;
                jwt.verify(token, process.env.JWT_SECRET, (error)=>{
                    if(error){
                        next();
                    }
                    else{
                        res.json({
                            error : {
                                status : false
                            },
                            resData :  {
                                userData:{
                                  isMatched : true,
                                  token : req.cookies.Auth,
                                  message : 'user is already logedin'
                                }

                            }
                        });
                    }
                });
            }
            catch{
                next();
            }
        }
    }
    redirectForLogin(){
        return (req, res, next)=>{
          res.json({
            error:{
              status: false
            },
            resData:{
              userData: {
                isMatched : false,
                message : 'user not logged in'
              }
            }
          });
        };
    }
    login(){
        return (req, res, next) => {
            try{
              console.log(typeof(req.body));
              const email = req.body.email.toLowerCase();
              const password = req.body.password;
              if(typeof(password) !== 'string'|| typeof(email) !== 'string')
                res.json({
                  error: {
                    status : true,
                    message : 'email or password not defined'
                  }
                })
              USER.getPasswordByEmail(email, (error, data)=>{
                  if(error){
                    console.log("here");
                      res.json({
                          error : {
                              status : true,
                              message : error.message
                          }
                      });
                  }
                  else{
                      console.log(data);
                      const isMatched = bcrypt.compareSync(password, data.password);
                      if(isMatched){
                          const token = jwt.sign({
                              tokenType : 'Auth',
                              userData : {
                                  email : email,
                                  accountType : 'DO' || data.accountType,
                                  isAdmin : false
                              }
                          }, process.env.JWT_SECRET);
                          res.cookie('Auth', token);
                          res.json({
                              error : {
                                  status : false
                              },
                              resData : {
                                  userData:{
                                    isMatched : isMatched,
                                    email : email,
                                    accountType : data.accountType,
                                    profile : data.profile,
                                    firstName : data.firstName,
                                    lastName : data.lastName,
                                    accountStatus : data.accountStatus,
                                    token : token,
                                    message : 'Successfully logged in...'
                                  }
                              }
                          });
                      }
                      else{
                          res.json({
                              error : {
                                  status : false
                              },
                              resData : {
                                  isMatched : isMatched,
                                  message : 'Email or Password is not matched...'
                              }
                          });
                      }
                  }
              });
            }catch(error){
              res.json({
                error:{
                  status: true,
                  message : error.message
                }
              });
            }
        };
    }
    filterUser(type){
      return (req, res, next)=>{
        if(req.body.accountType === type){
          next();
        }else{
          res.json({
            error : {
              ststus : true,
              message : 'unauthrized user'
            }
          })
        }
      };
    }
}

module.exports = new Auth();
