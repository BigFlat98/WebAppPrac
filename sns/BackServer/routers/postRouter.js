const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const {isLoggedIn} = require('../middleware/middleware_index.js');
const {afterUploadImage,uploadPost,updatePost,deletePost} = require('../controllers/controller_post.js');
const router = express.Router();


//uploads 폴더 생성
try{
    fs.readdirSync('uploads');//uploads 폴더가 있는지 확인
}catch(err){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');//없으면 생성
}


const upload = multer({
    storage:multer.diskStorage({
        destination(req,file,cb){
            cb(null,'uploads/');
        },
        filename(req,file,cb){
            const ext = path.extname(file.originalname);
            cb(null,path.basename(file.originalname,ext)+Date.now()+ext);
        }
    }),
    limits:{fileSize:5*1024*1024},
});


//router
router.post('/img',isLoggedIn,upload.single('img'),afterUploadImage);

const upload2 = multer();
router.post('/',isLoggedIn,upload2.none(),uploadPost);

router.patch('/update/:postId',isLoggedIn,upload2.none(),updatePost);

router.delete('/delete/:postId',isLoggedIn,deletePost);

module.exports = router;