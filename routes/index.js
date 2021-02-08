const express = require('express');
const router = express.Router();

/* GET / */
router.get('/', (req, res, /* next */) => {
    res.render('index', { title: '숙소, 체험, 장소를 모두 한 곳에서 - 에어비앤비' });
});

module.exports = router;
