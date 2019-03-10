module.exports = {
    dest:'public/uploads/',
    fileFilter : (req, file, cb)=>{
        if(!file.mimetype.match(/jpe|jpeg|png|gif$i/))
            cb(new Error('file is not supported...'), false);
        cb(null, true);
    }
};