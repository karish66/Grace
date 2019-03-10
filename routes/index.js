var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.cookie('Auth',"jdshfjdh");
  res.render('index', { title: 'Express' });
});

module.exports = router;
