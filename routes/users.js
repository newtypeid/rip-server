let express = require("express");
let router = express.Router();
let usersControl = require("../controller/usersController");

router.post("/login", usersControl.login);
/*
로그인 요청이 사용자 이름과 암호를 제공하는 사용자를 통한 것이면 POST를 사용한다.
세부 정보는 URL이 아닌 HTTP 메시지 본문으로 전송된다.
https를 통해 암호화하지 않는 한 일반 텍스트로 전송된다. */

router.post("/signup", usersControl.signup); //회원가입
router.get("/logout", usersControl.logout); //로그아웃
module.exports = router;
