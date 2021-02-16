var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.get('/popup', function(req, res, next) {
  res.render('popup.html');
});

module.exports = router;
