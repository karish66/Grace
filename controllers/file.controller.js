var multer  = require('multer');
const {USER} = require('../models/user.model');

class FileManager{
    uploadProfile(){
        return (req, res, next)=>{
            req.body.profile = req.files.profile[0].filename;
            req.body.photoId = req.files.photoid[0].filename;
            USER.addFile(req.body.email,req.body.profile, req.body.photoId,(error, isUpdated)=>{
                if(error){
                    res.json({
                        error:{
                            status : true,
                            message : error.message
                        }
                    });
                }
                else{
                    res.json({
                        error : {
                            status : false
                        },
                        resData : {
                            isUploaded : isUpdated,
                            message: 'successfully updated...'
                        }
                    });
                }
            });
            next();
        };
    }
}

module.exports = new FileManager();
