const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const models = require('../models');

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => { //callback 함수
        try {
            const exUser = await models.User
            .findOne({where: { email } });
            if(exUser){
                const result = await bcrypt.compare(password, exUser.password);
                if(result){
                    done(null, exUser);
                } else {
                    done(null, false, {message: "꺼져"});
                }
            } else{
                done(null, false, {message: "가입해"})
            }
        } catch(error){
            done(error)
        }
    }))
}