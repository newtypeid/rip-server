let models = require('../models');

exports.comments_get = (req, res) => //댓글들을 불러오는 controller
  models.Comments
    .findAll({ 
     include:[
      {model: models.User, 
      attributes: ["nickname"] //댓글 쓴 사람들의 userid에서 nickname 만 가져옴 
       }
      ]
    })
    .then((comments) => {
    res.status(200).json(comments) //성공
  })
    .catch(error => {
    console.log(error) //실패
  })


exports.comments_post = (req, res) => { //댓글 작성
  const { comment, toiletId, userId } = req.body
  models.Comments
    .create({
        comment : comment, 
        toiletId: toiletId, //각각 toilet마다 댓글이 달려있으므로 toiletId를 외래 키로 가져오기 위해
        userId: userId, //각 user들이 댓글을 남기고 나중에 화장실에 달린 댓글들을 불러올때 nickname을 외래 키로 가져오기 위해
       created_at: Date()
    })

    .then(result => {
      res.status(201).json(result)
    })
    .catch(error => {
        console.log(error)
    })
  }



