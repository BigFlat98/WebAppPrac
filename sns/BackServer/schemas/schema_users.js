const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    snsId:{
        type:String,
        required:true,
        unique:true,
        maxlength:30,
    },
    password:{
        type:String,
        required:true,
        maxlength:100,
    },
    email:{
        type:String,
        unique:true,
        sparse:true, //보통 unique와 같이 씀. unique가 true지만 null은 허용하는 경우 사용.(원래는 null도 중복될 수 있기 때문에 null 허용이 안됨.)
        maxlength:50,
    },
    nick:{
        type:String,
        required:true,
        maxlength:20,
    },
    phoneNumber:{
        type:String,
        unique:true,
        maxlength:20,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    deletedAt:{
        type:Date,
        default:null,
    },
},{
    timestamps:false,
    collection:'users',
});

//schema 적용
const Users = mongoose.model('Users',usersSchema);

module.exports = Users;