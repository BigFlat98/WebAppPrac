const express = require('express');
const router = express.Router();
const Comments = require('../models/model_Comments.js');
const Users = require('../models/model_Users.js');

router.route('/')
.get(async (req,res,next)=>{
    try{
        const comments = await Comments.findAll({
            include:{
                model:Users,
                attributes:['name'],
            }
        });
        res.status(200).json(comments);
    }
    catch(err){
        console.error(err);
        next(err);
    }
})
.post(async (req,res,next)=>{
    try{
        await Comments.create({
            comment:req.body.comment,
            commenter:req.body.user_id
        });
        res.status(200).end();
    }
    catch(err){
        console.error(err);
        next(err);
    }
})
.patch(async (req,res,next)=>{
    try{
        console.log("req.body@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",req.body);
        await Comments.update({comment:req.body.comment},{where:{id:req.body.comment_id}});
        res.status(200).end();
    }
    catch(err){
        console.error(err);
        next(err);
    }
})

router.route('/:id')
.delete(async (req,res,next)=>{
    try{
        console.log("req.params@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",req.params);
        await Comments.destroy({where:{id:req.params.id}});
        res.status(200).end();
    }
    catch(err){
        console.error(err);
        next(err);
    }
})
module.exports = router;