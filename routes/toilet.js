let express = require('express');
let router = express.Router();
let toiletControl = require('../controller/toiletController');

router.get('',toiletControl.toilet) // db 내에 있는 화장실 보여주기
router.post('',toiletControl.toilet_add) //화장실 정보 추가
router.put('/:id', toiletControl.rating) //화장실 별점 

module.exports = router;