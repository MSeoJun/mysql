const KakaoStrategy = require('passport-kakao').Strategy;

module.exports = (passport) => {
   passport.use(new KakaoStrategy({
       
       clientID: process.env.KAKAO_ID,
       callbackURLL: '/auth/kakao/callback',
   }, async (accessToken, refreshToken, profile, done) => {
       try {
           const exUser = await User.find({ where: { snsId: profile.id, provider: 'kakao' } });
           if (exUser) {
               done(null, exUser);
           } else {
               const newUser = conn.query(`INSERT INTO player (email,sns_id,provider) VALUES ('${title}','${description}','${author}');`,function(err, results){
                conn.release();
               });
               done(null, newUser);
           }
       } catch (error) {
           console.error(error);
           done(error);
       }
   }));
};