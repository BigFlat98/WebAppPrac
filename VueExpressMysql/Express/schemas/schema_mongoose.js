const dotenv = require('dotenv');
dotenv.config();
const mongoose =require('mongoose');
const dbURI = process.env.DB_URI;
const connect_mongoose = () => {
    if(process.env.NODE_ENV !== 'production'){
        mongoose.set('debug',true);
    }
    mongoose.connect(dbURI).then(()=>{
        console.log('몽고디비 연결 성공');
    }).catch((err)=>{
        console.log('몽고디비 연결 실패');
        console.error('몽고디비 연결 실패',err);
    });
};

mongoose.connection.on('error',(error)=>{
    console.error('몽고디비 연결 에러',error);
});
mongoose.connection.on('disconnected',()=>{
    console.error('몽고디비 연결 끊김 재연결 시도');
    connect_mongoose();
});

module.exports = connect_mongoose;