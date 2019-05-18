let models = require('../models');
let bcrypt = require('bcrypt');
let passport = require('passport');
let { isLoggedIn, isNotLoggedIn } = require('./middlewares')

exports.login = (isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user) => {
    if(authError){
      console.error(authError);
      return next(authError);
    }
    if(!user){
      console.log('가입해 새끼야')
      return res.redirect('/signup');
    }
    return req.login(user, (loginError) => {
      if(loginError){
        console.error(loginError);
        return next(loginError)
      }
      console.log('환영한다 새끼야')
      return res.redirect('/')
    });
  })(req, res, next); //미들웨어 내의 미들웨어에는 (req, res, next) 첨부
})

    // const {email, password} = req.body;
    // models.User
    // .findOne({
    //     where: {
    //         email: email,
    //         password: password
    //     }
    // })
    // .then(result => {
    //     res.status(200).json(result)
    // })
    // .catch(error => {
    //   console.log(error)
    // })
   

    exports.signup = (isNotLoggedIn, async (req, res) => { //회원가입, post
        const {nickname, email, password} = req.body;
        try {
          const exUser = await models.User
          .findOne({
            where: {email}
          });
          if(exUser){
            console.log('이미 했다 새끼야')
            return res.redirect('/login')
          }
          const hash = await bcrypt.hash(password, 12);
          await models.User.create({
            nickname : nickname,
            email: email,
            password: hash,
            createdAt: Date(),
            updatedAt: Date()
          });
          return res.redirect('/');
        } catch(error){
          console.log(error);
       
        }
      })
      //   models.User
      // .create({
      //   nickname : nickname,
      //   email: email,
      //   password: password,
      //   createdAt: Date(),
      //   updatedAt: Date()
      // })
      // .then(result => {
      //     res.status(200).json(result)
      // })
      // .catch(err => {
      //   console.error(err)
      // })
      exports.logout = (isLoggedIn, (req, res) => { //logout, get
        req.logout();
        req.session.destroy();
        res.redirect('/');
      })