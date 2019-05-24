let express = require("express");
let router = express.Router();
let commentsControl = require("../controller/commentsController");

router.post("", commentsControl.comments_post); //댓글 쓰기
router.get("", commentsControl.comments_get); // 화장실 내 댓글 가져오기

module.exports = router;
