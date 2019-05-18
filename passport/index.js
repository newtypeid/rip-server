const local = require('./localStrategy');
const models = require('../models');

module.exports = (passport) => {
    passport.serializeUser((user, done) => { //객체에 어떤 데이터를 저장할지 선택
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        models.User
        .findOne({
            where : id
        })
        .then(user => done(null, user))
        .catch(err => done(err))
    });
    local(passport)
}