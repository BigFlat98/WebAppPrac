const express = require('express');
const router = express.Router();
const Users = require('../models/model_Users.js');
const hashPassword = require('../crypto.js');

router.route('/')
.post(async (req,res,next)=>{
    const {email} = req.body;
    try{
        const existUser = await Users.findOne({where:{email:email}});
        if(existUser){
            return res.json({message:'이미 가입된 이메일입니다.'});
        }
        const hashedPassword = await hashPassword(req.body.password);
        await Users.create({
            name:req.body.name,
            gender:req.body.gender,
            email:req.body.email,
            number:req.body.number,
            address:req.body.address,
            password:hashedPassword
        });
        const users = await Users.findAll();
        res.status(200).json({users:users,message:'회원가입이 완료되었습니다.'});
    }
    catch(err){
        console.error(err);
        next(err);
    }
})


module.exports = router;