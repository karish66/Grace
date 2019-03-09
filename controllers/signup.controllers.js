const {USER} = require('../models/user.model');
const bcrypt = require('bcryptjs');
const otplib = require('otplib');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);
const OTP = require('../models/opt.model');


class  signUp {
    constructor(){
        this.model = USER;
    }
    generateOPT(){
        return (req, res, next)=>{
            try{
                const email = req.body.email;
                const email_hash = bcrypt.hashSync(email,salt);
                req.otp = otplib.authenticator.generate(email_hash);
                console.log(req.otp);
            }catch(error){
                console.log(error);
                res.json({
                    error : {
                        status : true,
                        error : error.message
                    }
                });
            }finally {
                next();
            }
        };
    }
    saveOTP(){
        return(req, res, next)=>{
            const otp = req.otp;
            const email = req.body.email;
            OTP.addOTP(email,otp,(error, isSaved)=>{
                if(error){
                    res.json({
                        error:{
                            status : true,
                            message : error.message
                        }
                    });
                }
                else{
                    if(isSaved)
                        next();
                    else
                        res.json({
                            error : {
                                status : false
                            },
                            resData : {
                                isOtpSaved : false,
                                message : 'unable to save the otp'
                            }
                        });
                }
            });
        }
    }
    verifyOTP(){
        return (req, res, next)=>{
            const otp = req.body.otp;
            const email = req.body.email;
            console.log(req.body);
            OTP.verifyOTP(email,otp, (error, isValid)=>{
                if(error){
                    res.json({
                        error : {
                            status : true,
                            message : error.message
                        }
                    });
                }
                else{
                    if(isValid){
                        OTP.removeOTP(email,(error, isRemoved)=>{
                            if(error){
                                res.json({
                                    error : {
                                        status : true,
                                        message : error.message
                                    }
                                });
                            }
                            else{
                                req.isValidEmail = true;
                                let token = jwt.sign({
                                    tokenType : 'emailVerification',
                                    userData : {
                                        email : email
                                    }
                                },process.env.JWT_SECRET,{ expiresIn: '30m' });
                                res.cookie('Auth',token);
                                res.json({
                                    error : {
                                        status : false
                                    },
                                    resData : {
                                        isVerified : true,
                                        message : 'Email is successfully verified.'
                                    }
                                });
                            }
                        });
                    }
                    else{
                        res.json({
                            error : {
                                status : false
                            },
                            resData : {
                                isVerified : false,
                                message : 'Unable to verify OTP, please enter write OTP.'
                            }
                        });
                    }
                }
            });
        };
    }
    hashPassword(){
        return (req, res, next)=>{
            if(!req.body.password)
            {
                res.json({
                    error:{
                        status : true,
                        message : 'password is not defined'
                    }
                });
            }
            const password = req.body.password;
            const hash = bcrypt.hashSync(password, salt);
            req.body.password = hash;
            next();
        }
    }
    addUser(){
        return (req, res)=>{
            this.model.addUser(req.body, (isSaved,error)=>{
                if(isSaved){
                    res.clearCookie('Auth');
                    res.json(
                        {
                            error:{
                                status:false
                            },
                            resData : {
                                isSaved : isSaved,
                                message : 'User successfully added...'
                            }
                        }
                    );
                }
                else{
                    res.json({
                        error:{
                            status : true,
                            message: 'unable to add user due to some error',
                            reason : error
                        }
                    });
                }
            });
        };
    }
}

module.exports = new signUp();
