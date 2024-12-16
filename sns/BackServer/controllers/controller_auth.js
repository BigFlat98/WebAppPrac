const dotenv = require('dotenv');
dotenv.config();
const Users = require('../schemas/schema_users.js');
const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


exports.signup = async (req,res,next)=>{
    console.log("req.body",req.body);
    const {snsId,password,email,nick,phoneNumber,} = req.body;
    try{
        const existID = await Users.findOne({$or:[{snsId:snsId},{email:email},{phoneNumber:phoneNumber}]});
        if(existID){
            return res.status(409).json({//status로 오류 상태를 보내야 받는 쪽의 try catch문에서 오류쪽으로 넘길 수 있음.
                success: false,
                error: 'exist',
                message: '이미 존재하는 사용자입니다'
            });
        }
        
        const salt = process.env.SALT;
        const hashCount = Number(process.env.HASH_COUNT);
        const hashLength = Number(process.env.HASH_LENGTH);
        const hashAlgorithm = process.env.HASH_ALGORITHM;
        console.log('hashCount',hashCount);
        console.log('hashLength',hashLength);
        console.log('hashAlgorithm',hashAlgorithm);
        const hash = crypto.pbkdf2Sync(password,salt,hashCount,hashLength,hashAlgorithm).toString('hex');//동기식 암호화 메서드
        await Users.create({
            snsId:snsId,
            password:hash,
            email,
            nick,
            phoneNumber,
        })
        return res.redirect('/');
    }
    catch(err){
        console.error(err);
        next(err);
    }
}



//local strategy, 보통은 로그인 방식이 여러가지고 
passport.use(new LocalStrategy({ //passport-local 객체 생성, 이렇게 만들어서 아래 login 메서드에서 passport.authenticate('local')로 호출했을 때 이 객체가 호출되는 것.
                                 //인증 방식을 사용할 때 지금처럼 인증 객체를 생성해서 해당 객체를 통해 인증 방식을 사용할 수 있음.
    usernameField:'snsId', //사용자 id
    passwordField:'password', //사용자 password
    passReqToCallback:false, //callback 함수에 req 객체 전달 안함.
},async (snsId,password,done)=>{//done-> passport 에서 next역할
    try{
        //id로 회원 찾기
        const user = await Users.findOne({snsId});//가입 회원 찾기
        if(!user){
            return done(null,false,{message:'가입되지 않은 회원'});//passport내장 콜백 메서드 done(error(error|null), user(obj|false), info(obj|false))
        }
        //비밀번호 검증
        const salt = process.env.SALT;
        const hashCount = Number(process.env.HASH_COUNT);
        const hashLength = Number(process.env.HASH_LENGTH);
        const hashAlgorithm = process.env.HASH_ALGORITHM;
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
    passport.authenticate('local',(authError,user,info)=>{//여기서 우리가 만든 local이라는 로그인 인증 방식으로 가서 확인 후에 done에 있는 파라미터가 여기에(authError,user,info) 똑같이 들어옴.
                                                          //passport 를 통한 로그인. 첫번��� 인자는 전략(우리가 만들어줘야 함. 예를 들어 암호화 등을 어떻게 처리했는지 적용해 줘야함.), 두번째 인자는 콜백함수()
        if(authError){//에러 발생 시 처리문
            console.error(authError);
            return next(authError);
        }
        if(!user){//login에 필요한 유저 정보가 없는 경우 처리문
            return res.status(401).json({
                success:false,
                error:'not found',
                message:'가입되지 않은 회원입니다.'
            });
        }
        return req.login(user,(loginError)=>{//로그인이 돼서 로그인 정보가 있으면 로그인 정보를 세션에 저장해줌.
            if(loginError){
                return next(loginError);
            }
            return res.status(200).json({
                success:true,
                message:'로그인 성공'
            });
        });
    })(req,res,next);
}

exports.logout = (req,res)=>{
    req.logout((error)=>{
        if(error){
            console.error(error);
            return res.redirect(`/?error=logout failed`);
        }
        
        clearCookie('connect.sid');
        res.redirect('/');
    });
}