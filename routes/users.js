const express = require('express');
const upload = multer(multerConfig);
const multer  = require('multer');


const SignUp = require('../controllers/signup.controller');
const Auth = require('../controllers/auth.controller');


const router = express.Router();


router.post('/sign-up',
    Auth.validateSession(),
    signUp.hashPassword(),
    signUp.addUser());

router.post('/verify/send-otp',
    signUp.generateOPT(),
    signUp.saveOTP(),
    mailer.sendOTP());

router.post('/verify/validate-otp', SignUp.verifyOTP());

router.get('/login', Auth.isNotLoggedIn(), Auth.redirectForLogin());

router.post('/login', Auth.isNotLoggedIn(), Auth.login());


module.exports = router;
