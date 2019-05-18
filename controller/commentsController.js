let models = require('../models');

exports.comments_get = (req, res) => {
  models.Comments
  .findAll({
   include:[
   {model: models.User,
    attributes: ["nickname"]
  }
  ]
  })
  .then((comments) => {
    res.status(200).json(comments)
  })
  .catch(error => {
    console.log(error)
  })
}

exports.comments_post = (req, res) => {
  const { comment, toiletId, userId } = req.body
  models.Comments
    .create({
        comment : comment,
        toiletId: toiletId,
        userId: userId,
       created_at: Date()
    })

    .then(result => {
      res.status(201).json(result)
    })
    .catch(error => {
        console.log(error)
    })
}
