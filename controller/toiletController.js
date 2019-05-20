let models = require('../models');


exports.toilet = (req, res) => { //get, 화장실 db 가져오기
   models.Toilet
   .findAll() //db에 있는 모든 화장실을 불러옴, 차후 500m 반경내 장실들만 가져오게 수정.
   .then(result => {
       if(result){
           res.status(200).json(result) // ok
       } 
   })
   .catch(error => {
       res.status(500).send(error) //Server Error
   })
}

exports.toilet_add = (req, res) => { //post, 화장실 추가
    const {lat, lon, address, description} = req.body;
    models.Toilet
    .create({
        lat : lat, //x좌표
        lon : lon, //y좌표
        address: address, //주소
        description: description, //화장실에 대한 간단한 묘사
        createdAt: Date(), 
        updatedAt: Date()
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
        console.log(error)
    })
}