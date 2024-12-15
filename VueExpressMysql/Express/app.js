require('dotenv').config();

const express = require('express');
const path = require('path');
const db = require('./models/model_index.js');
const cors = require('cors');
const connect_mongoose = require('./schemas/schema_mongoose.js');
const Posts = require('./schemas/schema_posts.js');
const Hashtags = require('./schemas/schema_hashtags.js');
const Users = require('./models/model_Users.js');
const indexRouter = require('./routes/route_index.js');
const userRouter = require('./routes/route_users.js');
const commentRouter = require('./routes/route_comments.js');
const loginRouter = require('./routes/route_login.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');



const app = express();
app.set('port',process.env.PORT);


//MySQL 연결
db.sequelize.sync({force:false})
.then(()=>{
    console.log('데이터베이스 연결 성공');
})
.catch((error)=>{
    console.log('데이터베이스 연결 실패');
    console.error(error);
})
//Mongoose 연결
connect_mongoose();


//미들웨어
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const corsOptions = {
    origin: 'http://localhost:8083', // Vue.js 개발 서버의 기본 포트
    credentials: true, // 필요한 경우 쿠키/인증 헤더 허용
    optionsSuccessStatus: 200
  };
app.use(cors(corsOptions));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
        maxAge:60*1000*60*24,//1day
    }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user,done)=>{ //인증 정보를 사용하고 받아온 데이터를 세션에 저장할 때 저장하는 정보를 serialize해야함. 들어온 세션 데이터를 DB의 데이터 id로 변환.
    console.log('serializeUser',user);
    done(null,user.id);
});
passport.deserializeUser(async (id,done)=>{//세션에 저장된 데이터를 사용할 때 다시 원래 데이터로 복원해야 하는데, 그 때 사용하는 메서드.(필수) 세션 쿠키에 저장된 id를 사용해서 원래 데이터를 찾아서 복원.
    try{ 
        const user = await Users.findOne({where:{id:id}});
        done(null,user);
    }
    catch(err){
        console.error(err);
        done(err);
    }
});

//라우터
app.use('/',indexRouter);
app.use('/user',userRouter);
app.use('/comment',commentRouter);
app.use('/login',loginRouter);

//404 에러처리 미들웨어
app.use((req,res,next)=>{
    res.status(404).send(`${req.method} ${req.url} 라우터 없음`);
});
//에러처리 미들웨어
app.use((err,req,res,next)=>{
    console.log('에러 처리 미들웨어 실행');
    const statusCode = err.statusCode || 500;
    console.error(err);
    res.status(statusCode).send(err.message);
});

//서버 실행
app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기중');
});


