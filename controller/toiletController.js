let models = require('../models');


exports.toilet = (req, res) => { //get, 화장실 db 가져오기
   models.Toilet
   .findAll()
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
        lat : lat, 
        lon : lon,
        address: address,
        description: description,
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