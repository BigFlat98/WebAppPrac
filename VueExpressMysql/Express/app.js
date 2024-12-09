const express = require('express');
const path = require('path');
const db = require('./models/model_index.js');
const cors = require('cors');
const indexRouter = require('./routes/route_index.js');
const userRouter = require('./routes/route_users.js');
const commentRouter = require('./routes/route_comments.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const app = express();
app.set('port',process.env.PORT);

//데이터베이스 연결
db.sequelize.sync({force:false})
    .then(()=>{
        console.log('데이터베이스 연결 성공');
    })
    .catch((error)=>{
        console.log('데이터베이스 연결 실패');
        console.error(error);
    })
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

//라우터
app.use('/',indexRouter);
app.use('/user',userRouter);
app.use('/comment',commentRouter);

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


