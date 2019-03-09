const express = require('express');
const multer  = require('multer');



const multerConfig = require('../controllers/multer.controller');
const SignUp = require('../controllers/signup.controller');
const Auth = require('../controllers/auth.controller');
const File = require('../controllers/file.controller');
const Mailer = require('../controllers/mail.controller');
const Upload = multer(multerConfig);


const router = express.Router();


router.post('/sign-up',
    Auth.validateSession(),
    SignUp.hashPassword(),
    SignUp.addUser());

router.post('/verify/send-otp',
    SignUp.generateOPT(),
    SignUp.saveOTP(),
    Mailer.sendOTP());

router.post('/verify/validate-otp', SignUp.verifyOTP());

router.get('/login', Auth.isNotLoggedIn(), Auth.redirectForLogin());

router.post('/login', Auth.isNotLoggedIn(), Auth.login());

router.post('/upload',
    Auth.validateSession(),
    Upload.fields([
        {name:'profile', maxCount:1},
        {name:'photoid', maxCount:1}
        ]),
    File.uploadProfile());

module.exports = router;
