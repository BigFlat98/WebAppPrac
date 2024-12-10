const express = require('express');
const router = express.Router();
const Users = require('../models/model_Users.js');

router.route('/')
.post(async (req,res,next)=>{
    try{
        console.log("req.body@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",req.body);
        await Users.create({
            name:req.body.name,
            gender:req.body.gender,
            email:req.body.email,
            number:req.body.number,
            address:req.body.address,
            password:req.body.password
        });
        const users = await Users.findAll();
        res.status(200).json(users);
    }
    catch(err){
        console.error(err);
        next(err);
    }
})


module.exports = router;