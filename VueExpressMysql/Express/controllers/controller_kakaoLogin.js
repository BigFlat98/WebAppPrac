const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

passport.use( new KakaoStrategy({
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: process.env.KAKAO_REDIRECT_URI,
    },
    (accessToken, refreshToken, profile, done) => {
        try{
            const user = profile;
            return done(null, user);
        }
        catch(error){
            console.error(error);
            return done(error);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

exports.kakaoLogin = passport.authenticate('kakao');
exports.kakaoCallback = passport.authenticate('kakao', {
    successRedirect: 'http://localhost:8083?success=true',
    failureRedirect: 'http://localhost:8083?success=false',
});