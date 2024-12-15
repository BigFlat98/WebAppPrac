const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    image:{
        type:String,
        maxlength:200,
    },
    content:{
        type:String,
        required:true,
        maxlength:300,
    },
    likeCount:{
        type:Number,
        default:0,
    },
    author:{
        type:Number,
        required:true,
    },
    hashtags:[{ //N:M 관계 생성시, 그냥 1:N 처럼 만들고 그걸 배열에 넣으면 됨.
        type:mongoose.Schema.Types.ObjectId,
        ref:'Hashtags',
    }],
},{
    timestamps:true,
    collection:'posts',
});

const Posts = mongoose.model('Posts',postsSchema);

module.exports = Posts;