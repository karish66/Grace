const mongoose = require('mongoose');

class USERS{
    constructor(){
        this.Schema = mongoose.Schema({
            firstName : {
                type: String,
                required: true
            },
            lastName : {
                type : String,
                required: true
            },
            email : {
                type : String,
                unique : true,
                required : true
            },
            contactNo : {
                type : String,
                unique: true,
                required : true
            },
            password : {
                type : String,
                required : true
            },
            addressLine1 : {
                type: String,
                required: true
            },
            addressLine2 : {
                type : String
            },
            landMark : {
                type : String
            },
            city : {
                type : String,
                required : true
            },
            pinCode : {
                type : String,
                required : true
            },
            profile : {
                type: String,
                required: true,
                default : "NONE"
            },
            photoId : {
                type : String,
                required : true,
                default : "NONE"
            },
            accountType : {
                type : String,
                required : true
            },
            accountStatus : {
                type : Boolean,
                required : true,
                default : false
            },
            lat : {
                type: Number,
                required : true
            },
            long : {
                type : Number,
                required : true
            },
            range : {
              type : Number,
              default : 1000
            },
            maxRange : {
              type : Number,
              defalut : 1000
            }
        });
        this.model = mongoose.model('USERS',this.Schema);
    }
    addUser(userData, cb){
        let newUser = new this.model(userData);
        newUser.save()
            .then(() => {
                cb(true);
            })
            .catch(error =>{
                cb(false, error.message);
            });
    }
    getPasswordByEmail(email, cb){
        this.model.findOne({email:email}, (error, data)=>{
            if(error){
                cb(error);
            }
            else{
                cb(null,{
                    password : data.password,
                    accountType : data.accountType,
                    profile : data.profile,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    accountStatus: data.accountStatus
                });
            }
        });
    }
    getUserDetail(email, cb){
      this.model.findOne({email:email})
        .then(data=>cb(null, data))
        .catch(error=>cb(error));
    }
    addFile(email,profile, photoId, cb){
        this.model.update({email:email}, {profile : profile, photoId: photoId})
            .then(()=>{
                cb(null, true);
            })
            .catch(error=>{
                cb(error);
            });
    }
    getUserRange(email, cb){}
}

module.exports  = { USER : new USERS() };
