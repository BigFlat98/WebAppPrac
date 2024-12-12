const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('../middleware/middleware_index.js');
const {signup,login,logout} = require('../controllers/controller_auth.js');

// POST /auth/signin 회원 가입
router.post('/signup', isNotLoggedIn, signup);//isNotLoggedIn -> 우리가 만드는 미들웨어.  /  signin -> 우리가 만드는 컨트롤러.

// POST /auth/login 로그인 
router.post('/login', isNotLoggedIn, login);

// GET /auth/logout 로그아웃
router.get('/logout', isLoggedIn, logout);

module.exports = router;