require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const pageRouter = require('./routers/pageRouter.js');
const authRouter = require('./routers/authRouter.js');
const mongoose = require('mongoose');
const Users = require('./schemas/schema_users.js');
const Posts = require('./schemas/schema_posts.js');
const Hashtags = require('./schemas/schema_hashtags.js');
const expressSession = require('express-session');//passport 사용 시 먼저 써줘야 함.
const passport = require('passport'); //passport 에서 세션이 있어야 하기 때문에.





//create express app(server)
const app = express();


//port setting
app.set('port',process.env.PORT);


//mongoDB 연결
mongoose.connect(process.env.DB_URI)
.then(()=>{
    console.log('MongoDB 연결 성공');
}).catch((err)=>{
    console.error(err);
});
//mongoDB 연결 에러 처리
mongoose.connection.on('error',(err)=>{
    console.error('MongoDB 연결 에러',err);
});
//mongoDB 연결 끊김 처리
mongoose.connection.on('disconnected',()=>{
    console.error('MongoDB 연결 끊김. 연결 재시도');
    connect();
});



//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
    origin:'http://localhost:8080',
    credentials:true,
}));
app.use(expressSession({
    resave:false,//세션 데이터 변경 없으면 저장하지 않음.
    saveUninitialized:false,//세션 데이터가 없으면 저장하지 않음.
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,//https만으로 사용시 true로 변경.
        maxAge:60*1000*3,//3분
    }
}));
app.use(passport.initialize());//passport 초기화(사용 시작을 위한 작업.)
app.use(passport.session());//passport 세션 사용 시 필요.(로그인 인증 전략중 session 방식 사용. jwt나 다른 인증 전략들이 있음.)



//router
app.use('/',pageRouter);
app.use('/auth',authRouter);


//404 error handler
app.use((req,res,next)=>{
    res.status(404).send(`${req.method} ${req.url} 라우터 없음`);
});

//error handler
app.use((err,req,res,next)=>{
    console.log('에러 처리 미들웨어 실행');
    const statusCode = err.statusCode || 500;
    console.error(err);
    res.status(statusCode).send(err.message);
});


//server start 
app.listen(app.get('port'),()=>{
    console.log(`${app.get('port')}번 포트에서 서버 실행중`);
});