const express = require('express');
const router = express.Router();
const Users = require('../models/model_Users.js');

router.get('/',async(req,res)=>{
    const users = await Users.findAll();
    res.send(users);
});

module.exports = router;
