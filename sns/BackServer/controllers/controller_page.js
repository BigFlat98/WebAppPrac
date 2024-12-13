const Posts = require('../schemas/schema_posts');
const Users = require('../schemas/schema_users');
const Hashtags = require('../schemas/schema_hashtags');


//프로필 페이지
exports.renderProfile = (req,res) =>{
    res.render('profile',{title:'내 정보 - NodeSNS'});
}

//회원가입 페이지
exports.renderSignup = (req,res) =>{
    res.render('signup',{title:'회원가입 - NodeSNS'});
}

//메인 페이지
exports.renderMain = async (req,res,next) =>{
    try{
        const posts = await Posts.find().populate({path:'author',select:'snsId nick'}).sort({createdAt:-1});
        res.json({title:'SNS-Main',twits:posts});
    }
    catch(err){
        console.error(err);
        next(err);
    }
}