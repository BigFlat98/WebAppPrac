const express = require('express');
const router = express.Router();
const {isLoggedIn,isNotLoggedIn} = require('../middlewares/middleware_checkLogin.js');
const {login,logout} = require('../controllers/controller_login.js');
//로그인
router.post('/signin',isNotLoggedIn,login);

//로그아웃
router.get('/signout',isLoggedIn,logout);



module.exports = router;
