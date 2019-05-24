let models = require("../models");
const Op = require("sequelize").Op;

exports.toilet = (req, res) => {
  //get, 화장실 db 가져오기
  let latitude = Number(req.body.latitude);
  let longitude = Number(req.body.longitude);

  models.Toilet.findAll({
    where: {
      latitude: {
        [Op.gt]: [latitude - 0.0065], //현재 위치에서 반경 700m에 있는 화장실 data만 불러옴
        [Op.lt]: [latitude + 0.0065]
      },
      longitude: {
        [Op.gt]: [longitude - 0.0065],
        [Op.lt]: [longitude + 0.0065]
      }
    },
    include: [{ model: models.Comments, attributes: ["comment"] }]
  })
    .then(result => {
      if (result) {
        res.status(200).json(result); // ok
      }
    })
    .catch(error => {
      res.status(500).send(error); //Server Error
    });
};

exports.toilet_add = (req, res) => {
  //post, 화장실 추가
  const { latitude, longitude, address, rating } = req.body;
  models.Toilet.create({
    latitude: latitude, //x좌표
    longitude: longitude, //y좌표
    address: address, //주소
    rating: rating, //star rating
    createdAt: Date(),
    updatedAt: Date()
  })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      console.log(error);
    });
};

exports.rating = async (req, res) => {
  //별점 추가

  let oldRating = await models.Toilet.findOne({
    //기존 star rating
    where: { id: req.params.id } //선택한 화장실 id
  });
  oldRating = oldRating.rating;
  models.Toilet.update(
    {
      rating: oldRating + req.body.rating //기존 star rating에 client에서 보내온 rating 값을 더해줌
    },
    {
      where: { id: req.params.id }
    }
  )
    .then(rating => {
      res.status(200).send(rating);
    })
    .catch(error => {
      console.log(error);
    });
};
