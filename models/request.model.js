const mongoose = require('mongoose');

class REQUEST {
    constructor(){
        // >>>>>>>>>>>>>>>>
        const Schema = mongoose.Schema({
            email : {
                type : String,
                required : true
            },
            typeOfDonation : {
                type : String,
                required: true
            },
            amountOfDonation : {
                type : Number,
                required : true
            },
            description : {
                type : String
            },
            location: {
             type: { type: String },
             coordinates: []
           },
            status : {
                type : Number,
                required : true,
                default : 0
            },
            date : {
              type: Date,
              default : new Date()
            },
            emailA:{
              type : String,
              default : ""
            },
            otp:{
              type:String
            }
        });
        // <<<<<<<<<<<<<<<<
        Schema.index({ location: "2dsphere" });
        this.model = mongoose.model('Request', Schema);
    }
    addRequest(requestData,cb){
        const newRequest = new this.model(requestData);
        newRequest.save()
            .then(data=>{
                cb(null, {data : data, isAdded:true});
            })
            .catch(error=>{
                cb(error);
            });
    }
    getRequestStatus(id, cb){
        this.model.findOne({_id:id})
            .then(data=>{
                cb(null, data.status, data.email);
            })
            .catch(error=>{
                cb(error);
            });
    }
    updateRequestStatus(id, updateData, cb){
        this.model.updateOne({_id:id},updateData)
            .then(()=>{
                cb(null, true);
            })
            .catch(error=>{
                cb(error);
            });
    }
    getActiveRequest(email,cb){
      this.model.find({email:email, status:0})
          .then(data=>cb(null,data))
          .catch(error=>cb(error));
    }
    getActiveRequestRange(loc, maxRange, cb){
      this.model.find({location:
        {$near: {
            $maxDistance: maxRange,
            $geometry: { type: "Point", coordinates: loc}
          }
        },
        status : 0
      }).then(data=>cb(null, data)).catch(error=>cb(error));
    }
    getDonationDetail(email, limit, cb){
      if(limit != -1){
        this.model.find({email:email}).sort({'date':-1}).limit(limit)
            .exec((error, data)=>{cb(error, data)});
      }
      else{
        this.model.find({email : email})
            .then(data=>{
              cb(null, data);
            })
            .catch(error=>{
              cb(error);
            });
      }
    }

    // >>>>>>>>>>>>>>>>>>

    getActiveRequest(email, cb){
      this.model.find({emailA:email, status : 2})
          .then(data=>cb(null, data))
          .catch(error=>cb(error));
    }

    getRequestDetail(id, cb){
      this.model.findById(id)
          .then(data=>cb(null, data))
          .catch(error=>cb(error));
    }

    // <<<<<<<<<<<<<<<<<<
}

module.exports = new REQUEST();
