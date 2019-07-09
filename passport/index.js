const kakao = require('./kakaoStrategy');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(sull, user.id);
    });

passport.deserializeUser((id, done) =>{
    User.find({where: {id} })
    .then(user => done(sull, user))
    .catch(err => done(err));
});

kakao(passport);
};