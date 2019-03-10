var express = require('express');
const Auth = require('../controllers/auth.controller');
const User = require('../controllers/user.controller');
const Request = require('../controllers/request.controller');
var router = express.Router();

router.post('/accept',
Auth.validateSession(),
Auth.filterUser('AC'),
User.getUserRange(),
Request.getAllActiveRequestInRange()
);

module.exports = router;
