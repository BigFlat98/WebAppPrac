require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const pageRouter = require('./routers/pageRouter');

//create express app(server)
const app = express();

//port setting
app.set('port',process.env.PORT);

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
    origin:'http://localhost:8080',
    credentials:true,
}));



//router
app.use('/',pageRouter);



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