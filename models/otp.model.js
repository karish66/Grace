const mongoose = require('mongoose');

class OTP{
    constructor(){
        const Schema = mongoose.Schema({
            email : {
                type : String,
                unique : true,
                required : true
            },
            otp : {
                type: String,
                required: true
            }
        });
        this.model = mongoose.model('OTP',Schema);
    }
    addOTP(email, otp, cb){
        const newOTP = new this.model({
            email : email,
            otp : otp
        });
        newOTP.save()
            .then(()=>{
                cb(null, true);
            })
            .catch(error=>{
                cb(error);
            });
    }
    removeOTP(email, cb){
        this.model.deleteOne({email:email})
            .then(()=>{
                cb(null, true);
            })
            .catch(error=>{
                cb(error);
            });
    }
    verifyOTP(email, otp, cb){
        this.model.findOne({email:email, otp:otp})
            .then(data=>{
                if(data.otp === otp)
                    cb(null, true);
                else
                    cb(null, false);
            })
            .catch(error=>{
                cb(error);
            });
    }
}
module.exports = new OTP();
