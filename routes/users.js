const express = require('express');
const router = express.Router();
const signUp = require('../controllers/signup.controller');
const mailer = require('../controllers/mail.controller');
const Auth = require('../controllers/auth.controller');
const multer  = require('multer');
const multerConfig = require('../controllers/multer.controller');
const upload = multer(multerConfig);
const file = require('../controllers/file.controller');
const User = require('../controllers/user.controller');
router.post('/sign-up',
    Auth.validateSession(),
    signUp.hashPassword(),
    signUp.addUser());

router.post('/verify/send-otp',
    signUp.generateOPT(),
    signUp.saveOTP(),
    mailer.sendOTP());

router.post('/verify/validate-otp', signUp.verifyOTP());

router.get('/login', Auth.isNotLoggedIn(), Auth.redirectForLogin());

router.post('/login', Auth.isNotLoggedIn(), Auth.login());

router.get('/dashboard', Auth.validateSession(), User.getUserDetails(5))

router.post('/upload',
    Auth.validateSession(),
    upload.fields([
        {name:'profile', maxCount:1},
        {name:'photoid', maxCount:1}
        ]),
    file.uploadProfile());

module.exports = router;
