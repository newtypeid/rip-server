
//라이브러리 모음
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sequelize = require('./models').sequelize;
var passportConfig = require('./passport')
var session = require('express-session')
var bodyParser = require('body-parser')

require('dotenv').config(); //.env에 모아둔 비밀키를 dotenv가 읽어 process.env 객체에 넣음.

//Router 모음
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var toiletRouter = require('./routes/toilet');
var commentsRouter = require('./routes/comments');

var app = express();
sequelize.sync(); //sequelize 연결


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json()) // body로 넘어온 데이터를 JSON 객체로 변환
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 중첩 객체를 허용할지 말지 결정하는 옵션
app.use(cookieParser(process.env.COOKIE_SECRET)); //넘어온 cookie 데이터를 관리하기 쉽게 JSON 객체로 변환해 주는 라이브러리
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false,  //session을 언제나 저장할지 정하는 값.
  saveUninitialized: true, // 세션이 저장되기 전에 uninitialized 상태로 만들어 저장
  secret: process.env.COOKIE_SECRET //session hijacking을 막기위해 hash값에 추가로 들어가는 값(git에 올라가는 것을 방지하기위해 .env에 넣어둠)
}))

var passport = require('passport');


app.use(passport.initialize()); //요청(req 객체)에 passport 설정을 심음.
app.use(passport.session()); //req.session 객체에 passport 정보를 저장. 
passportConfig(passport);

/* req.session 객체는 express-session에서 생성하는 것이므로 passport 미들웨어는 exporess-session 뒤에 와야 함. */

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/toilet', toiletRouter);
app.use('/comments', commentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); 


module.exports = app;

