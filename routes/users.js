const express = require('express');


const SignUp = require('../controllers/signup.controller');
const Auth = require('../controllers/auth.controller');
const Mailer = require('../controllers/mail.controller');


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


module.exports = router;
