const dotenv = require('dotenv');
dotenv.config();
const Users = require('../schemas/schema_users.js');
const crypto = require('crypto');

exports.signup = async (req,res,next)=>{
    console.log(req.body);
    const {snsID,password,email,nick,phoneNumber,} = req.body;
    try{
        const existID = await Users.findOne({$or:[{snsId:snsID},{email:email},{phoneNumber:phoneNumber}]});
        if(existID){
            return res.redirect('/signup?error=exist');//특정 화면으로 redirect
        }
        
        const salt = process.env.SALT;
        const hashCount = Number(process.env.HASH_COUNT);
        const hashLength = Number(process.env.HASH_LENGTH);
        const hashAlgorithm = process.env.HASH_ALGORITHM;
        const hash = crypto.pbkdf2Sync(password,salt,hashCount,hashLength,hashAlgorithm).toString('hex');

        await Users.create({
            snsId:snsID,
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

exports.login = async (req,res,next)=>{
    passport.authenticate('local',(authError,user,info)=>{//passport 를 통한 로그인. 첫번째 인자는 전략(우리가 만들어줘야 함. 예를 들어 암호화 등을 어떻게 처리했는지 적용해 줘야함.), 두번째 인자는 콜백함수()
        if(authError){//에러 발생 시 처리문
            console.error(authError);
            return next(authError);
        }
        if(!user){//login에 필요한 유저 정보가 없는 경우 처리문
            return res.redirect(`/?error=${info.message}`);
        }
        return req.login(user,(loginError)=>{//로그인이 돼서 로그인 정보가 있으면 로그인 정보를 세션에 저장해줌.
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req,res,next);
}

exports.logout = (req,res)=>{
    req.logout((error)=>{
        if(error){
            console.error(error);
            return res.redirect(`/?error=logout failed`);
        }
        res.redirect('/');
    });
}