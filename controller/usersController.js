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

 
   

    exports.signup = (isNotLoggedIn, async (req, res) => { //회원가입, post
        const {nickname, email, password} = req.body;
        try {
          const exUser = await models.User 
          .findOne({
            where: {email} //user db에서 email을 가져와서 비교
          });
          if(exUser){ //입력된 값이 exUser에 있을 시
            console.log('이미 했다 새끼야') //이미 가입 했다고 알려줌
            return res.redirect('/login') //그리고 로그인하는 곳으로 보내버림
          }
          const hash = await bcrypt.hash(password, 12); //hash 알고리즘으로 비번을 관리자도 못알아보게 해줌
          await models.User.create({
            nickname : nickname,
            email: email,
            password: hash,
            createdAt: Date(),
            updatedAt: Date()
          });
          return res.redirect('/'); //index로 보내버림
        } catch(error){
          console.log(error);
       
        }
      })
 
      exports.logout = (isLoggedIn, (req, res) => { //logout, get
        req.logout();
        req.session.destroy();
        res.redirect('/');
      })