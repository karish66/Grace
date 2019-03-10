var express = require('express');
const Auth = require('../controllers/auth.controller');
const User = require('../controllers/user.controller');
const Request = require('../controllers/request.controller');
const Signup = require('../controllers/signup.controller');
const Socket = require('../controllers/socket.controller');
var router = express.Router();

router.post('/create',
    Auth.validateSession(),
    Auth.filterUser('DO'),
    Request.filterAnyActiveRequest(),
    Request.createRequest(),
    Request.createTimer('OD',1000*60),
    Request.requestBroadcast('OD'),
    Request.sendNotification());

router.post('/active-request',
    Auth.validateSession(),
    Auth.filterUser('AC'),
    User.getUserRange(),
    Request.getAllActiveRequestInRange());

//>>>>>>>>>>>>>>>>>>>>>>


router.post('/accept',
    Auth.validateSession(),
    Request.getRequestDetailById(),
    Signup.generateOPT(),
    Request.accceptRequest(),
    Socket.sendOtp(),
    (req, res)=>{
      res.json({ok:1});
    }
  );


  router.post('/pickup',
      Auth.validateSession(),
      Request.getRequestDetailById(),
      Request.verifyOtp(),
      Socket.pickUp(),
      (req, res)=>{
        res.json({ok:1});
      }
    );

//<<<<<<<<<<<<<<<<<<<<<<


module.exports = router;
