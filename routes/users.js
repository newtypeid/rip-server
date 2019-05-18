let express = require('express');
let router = express.Router();
let usersControl = require('../controller/usersController');

router.post('/login',usersControl.login) // 로그인
router.post('/signup',usersControl.signup) //회원가입
router.get('/logout', usersControl.logout) //로그아웃
module.exports = router;
