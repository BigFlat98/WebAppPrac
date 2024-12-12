const express = require('express');
const router = express.Router();
const Users = require('../models/model_Users.js');
const hashPassword = require('../crypto.js');

router.route('/')
.post(async (req,res,next)=>{
    try{
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
        res.status(200).json(users);
    }
    catch(err){
        console.error(err);
        next(err);
    }
})


module.exports = router;