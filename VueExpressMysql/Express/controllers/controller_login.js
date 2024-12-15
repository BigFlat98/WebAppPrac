const dotenv = require('dotenv');
dotenv.config();
const Users = require('../models/model_Users.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');





//local strategy, 보통은 로그인 방식이 여러가지고 
passport.use(new LocalStrategy({ //passport-local 객체 생성, 이렇게 만들어서 아래 login 메서드에서 passport.authenticate('local')로 호출했을 때 이 객체가 호출되는 것.
    //인증 방식을 사용할 때 지금처럼 인증 객체를 생성해서 해당 객체를 통해 인증 방식을 사용할 수 있음.
    usernameField:'email', //사용자 id
    passwordField:'password', //사용자 password
    passReqToCallback:false, //callback 함수에 req 객체 전달 안함.
},async (email,password,done)=>{//done-> passport 에서 next역할
    console.log('strategy email',email);
    console.log('strategy password',password);
    try{
        //id로 회원 찾기
        const user = await Users.findOne({where:{email:email}});//가입 회원 찾기
        console.log('strategy user',user);
        if(!user){
            return done(null,false,{message:'가입되지 않은 회원'});//passport내장 콜백 메서드 done(error(error|null), user(obj|false), info(obj|false))
        }
        //비밀번호 검증
        const salt = process.env.SALT;
        const hashCount = Number(process.env.HOW_MANY_TIMES);
        const hashLength = Number(process.env.PW_LENGTH);
        const hashAlgorithm = process.env.HASH_FUNCTION;
        const hash = crypto.pbkdf2Sync(password,salt,hashCount,hashLength,hashAlgorithm).toString('hex');
        if(user.password != hash){
            return done(null,false,{message:'비밀번호가 일치하지 않음'});
        }
        return done(null,user);
    }
    catch(error){
        console.error(error);
        return done(error);
    }
}))


exports.login = async (req,res,next)=>{ //여기서 받은 데이터를 
    console.log(req.body);
    passport.authenticate('local',(authError,user,info)=>{//여기서 우리가 만든 local이라는 로그인 인증 방식으로 가서 확인 후에 done에 있는 파라미터가 여기에(authError,user,info) 똑같이 들어옴.
                                //passport 를 통한 로그인. 첫번째 인자는 전략(우리가 만들어줘야 함. 예를 들어 암호화 등을 어떻게 처리했는지 적용해 줘야함.), 두번째 인자는 콜���함수()
        console.log('login user',user);
        if(authError){//에러 발생 시 처리문
            console.error(authError);
            return next(authError);
        }
        if(!user){//login에 필요한 유저 정보가 없는 경우 처리문
            return res.redirect(`/?error11=${info.message}`);
        }
        return req.login(user,(loginError)=>{//로그인이 돼서 로그인 정보가 있으면 로그인 정보를 세션에 저장해줌.
            if(loginError){
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req,res,next);
}



//로그아웃
exports.logout = (req, res) => {
    req.logout((error) => {
        if(error) {
            console.error(error);
            return res.redirect(`/?error=logout failed`);
        }
        req.session.destroy((err) => {
            if(err) {
                console.error(err);
                return res.redirect(`/?error=session destroy failed`);
            }
            res.clearCookie('connect.sid')  // 세션 쿠키 제거
                .redirect('/');  // 메서드 체이닝으로 리다이렉트
        });
    });
}