const express = require('express');
const router = express.Router();
const {isLoggedIn,isNotLoggedIn} = require('../middleware/middleware_index.js');
const {renderProfile,renderSignup,renderMain} = require('../controllers/controller_page.js');


router.get('/profile',isLoggedIn,renderProfile);
router.get('/signup',isNotLoggedIn,renderSignup);
router.get('/',renderMain);

module.exports = router;