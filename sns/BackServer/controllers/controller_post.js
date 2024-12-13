const Posts = require('../schemas/schema_posts');
const Hashtags = require('../schemas/schema_hashtags');

exports.afterUploadImage = async (req,res)=>{//uploads 폴더에 이미지 업로드 후 이미지 경로 반환
    res.json({url:`/img/${req.file.filename}`});
}

exports.uploadPost = async (req,res,next)=>{
    try{
        const post = await Posts.create({
            content:req.body.content,
            img:req.body.url,
            author:req.user._id,//login 후에는 req에 user 속성 추가.
        });
        const hashtags = req.body.content.match(/#[^\s#]*/g);//hashtag는 content에 포함돼서 들어올 예정.
                                                             //해당 문자열에서 공백이나 샾 전까지 나오는 텍스트 분리. 분리한 값들을 배열로 반환.
        console.log("hashtags",hashtags);
        if(hashtags){
            const result = await Promise.all(
                hashtags.map(async(tag)=>{
                    const title = tag.slice(1).toLowerCase();//각 배열의 첫번째 문자를 제거하고(slice(1)) 소문자로 변환(toLowerCase).(#Hashtag -> hashtag)
                    let hashtag = await Hashtags.findOne({tag:title});
                    if(!hashtag){
                        hashtag = await Hashtags.create({tag:title});
                    }
                    return hashtag
                })
            );
            post.hashtags = result.map(hashtag=>hashtag._id);
            await post.save();
        }
        res.redirect('/');
    }catch(err){
        next(err);
    }
}