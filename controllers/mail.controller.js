const nodemailer = require('nodemailer');

class mailer{
    constructor(email, password){
        this.transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : email,
                pass : password
            }
        });
    }
    sendOTP(){
        return (req, res)=>{
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: req.body.email,
                subject: 'OTP',
                text: req.otp
            };
            this.transporter.sendMail(mailOptions, function(error){
                if (error) {
                    console.log(error);
                    res.json({
                        error : {
                            status : true,
                            message : error.message
                        }
                    });
                } else {
                    res.json({
                        error : {
                            status : false
                        },
                        resData : {
                            isSent : true,
                            message : 'email successfully sent...'
                        }
                    });
                }
            });
        }
    }
}


module.exports = new mailer(
    process.env.EMAIL_USER,
    process.env.EMAIL_USER_PASSWORD
);
