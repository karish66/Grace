const mongoose = require('mongoose');

class dbConfig{
    constructor(dbURL){
        this.dbURL = dbURL;
    }
    connectDb(cb){
        mongoose.connect(this.dbURL,{useNewUrlParser:true})
            .then(()=>{
                console.log('Db is connected successfully....');
                cb(false);
            })
            .catch((error)=>{
                cb(true, error)
            });
    }
}

module.exports = dbConfig;
