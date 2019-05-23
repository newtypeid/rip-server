let models = require('../models');
const Op = require('sequelize').Op;
// const sequelize = require('sequelize').sequelize
exports.toilet = (req, res) => { //get, 화장실 db 가져오기
   models.Toilet
   .findAll(
    {   where:{
       id: {
           [Op.between]: [1, 20]
       }
    },
        include:[
         {model: models.Comments, 
         attributes: ["comment"] // toiletId에 맞춰서 comment 불러옴
          }
         ]
       }
   ) 
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
    const {latitude, longitude, address, rating} = req.body;
    models.Toilet
    .create({
        latitude : latitude, //x좌표
        longitude : longitude, //y좌표
        address: address, //주소
        rating: rating, //star rating
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

// exports.rating =  (req, res) => {
//      models.Toilet
//     .update({
//         rating: 2
//     }, {
//         where:{id:1}
//     })
// }
// exports.rating = async (id) => {
//     await sequelize.query('SELECT AVG(rating) FROM toilets where id = ${id}')
//    .spread(async(res, meta) => {
//      const newRating = res[0]['AVG(rating)'];
    //  console.log(newRating)
//        models.Toilet.update({
//            rating : newRating,
//        },{ where:{ id } },
//        ).then('updated!').catch('update error');
//    });
//   } 

