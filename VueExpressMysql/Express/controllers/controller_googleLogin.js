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
   passport.authenticate('google',{ //authenticate는 호출되면 첫번째 파라미터를 통해 적용할 인증 방식을 찾아서 실행하고, 두번째 파라미터를 통해 작동할 기능을 정함.
                                    //이 정해진 기능을 수행하는 middleware를 return해주는 메서드임.
    scope:['profile','email'],
   })(req,res); //그렇게 return된 미들웨어를 바로 실행
};
exports.googleCallback = (req,res) =>{
    passport.authenticate('google',{ //여기서 로그인에 성공했을 때 로그인 정보를 DB에 저장하는 기능을 추가하면 될 것 같음.
                                     //이럴경우 password는 필요가 없기 때문에 db에서 null 허용이 필수임.
        failureRedirect:'http://localhost:8083/login?success=false',
        successRedirect:'http://localhost:8083/login?success=true',
    })(req,res);
};
//authenticate 메소드는 2번 사용됨. 첫번째는 구글 로그인 페이지로 이동하는 메소드, 두번째는 로그인 성공 시 로그인 정보를 DB에 저장하는 메소드임.

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
            user: req.user
        });
    } else {
        res.json({
            isLoggedIn: false,
            user: null
        });
    }
};