const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const FaceBookStrategy = require('passport-facebook').Strategy;

passport.use(new FaceBookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_REDIRECT_URI,
    profileFields:['id','displayName','emails','photos']
},async(accessToken,refreshToken,profile,done)=>{
    //여기에 가져온 사용자 정보를 DB에 저장하거나 확인하는 로직을 구현함.
    console.log(profile);
    return done(null,profile);
}))

passport.serializeUser((user,done)=>{
    done(null,user);
})
passport.deserializeUser((user,done)=>{
    done(null,user);
})


exports.facebookLogin = passport.authenticate('facebook',{scope:['email']});

exports.facebookCallback = passport.authenticate('facebook',{
    successRedirect:'http://localhost:8083/login?success=true',
    failureRedirect:'http://localhost:8083/login?success=false'
})