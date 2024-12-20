const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;



passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_REDIRECT_URI,
},
async (accessToken, refreshToken, profile, done)=>{
    try{
        const user = {
            googleId:profile.id,
            email:profile.emails[0].value,
            name:profile.displayName,
            profileImage:profile.photos[0].value,
        };
        return done(null,user);
    }
    catch(error){
        console.error(error);
        return done(error);
    }
}));

exports.googleLogin = (req,res) =>{
   passport.authenticate('google',{
    scope:['profile','email'],
   })(req,res); //authenticate 미들웨어를 바로 실행
};

exports.googleCallback = (req,res) =>{
    passport.authenticate('google',{
        failureRedirect:'http://localhost:8083/login?success=false',
        successRedirect:'http://localhost:8083/login?success=true',
    })(req,res);
};

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
});

exports.getUserInfo = (req, res) => {
    // req.user는 passport가 세션에서 자동으로 불러온 사용자 정보
    if (req.isAuthenticated()&&req.user) {//여기 try catch로 에러처리 해주는게 좋음.
        res.json({
            isLoggedIn: true,
            user: {
                googleId: req.user.googleId,
                email: req.user.email,
                name: req.user.name,
                profileImage: req.user.profileImage
            }
        });
    } else {
        res.json({
            isLoggedIn: false,
            user: null
        });
    }
};