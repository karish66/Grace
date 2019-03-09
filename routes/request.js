var express = require('express');
const Auth = require('../controllers/auth.controller');
const User = require('../controllers/user.controller');
const Request = require('../controllers/request.controller');
var router = express.Router();

router.post('/create',
    Auth.validateSession(),
    // Auth.filterUser('AC'),
    Request.filterAnyActiveRequest(),
    Request.createRequest(),
    Request.createTimer('OD',1000*60*2),
    Request.requestBroadcast('OD'),
    Request.sendNotification());

router.post('/active-request',
Auth.validateSession(),
// Auth.filterUser('AC'),
User.getUserRange(),
Request.getAllActiveRequestInRange()
);

module.exports = router;
