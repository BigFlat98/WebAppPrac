const express = require('express');
const router = express.Router();
const {isLoggedIn,isNotLoggedIn} = require('../middlewares/middleware_checkLogin.js');
const {login,logout} = require('../controllers/controller_login.js');
const {googleLogin,googleCallback,getUserInfo} = require('../controllers/controller_googleLogin.js');
const {facebookLogin,facebookCallback} = require('../controllers/controller_facebookLogin.js');
const {kakaoLogin,kakaoCallback} = require('../controllers/controller_kakaoLogin.js');
//로그인
router.post('/signin',isNotLoggedIn,login);

//로그아웃
router.get('/signout',isLoggedIn,logout);


//google api login
router.get('/googleLogin',isNotLoggedIn,googleLogin);
//google api callback
router.get('/googleCallback',googleCallback);

//facebook api login
router.get('/facebookLogin',isNotLoggedIn,facebookLogin);
//facebook api callback
router.get('/facebookCallback',facebookCallback);

//kakao api login
router.get('/kakaoLogin',isNotLoggedIn,kakaoLogin);
//kakao api callback
router.get('/kakaoCallback',kakaoCallback);


//get login user info after login
router.get('/getUserInfo',getUserInfo);



module.exports = router;
