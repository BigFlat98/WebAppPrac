const Posts = require('../schemas/schema_posts');
const Hashtags = require('../schemas/schema_hashtags');

exports.afterUploadImage = async (req,res)=>{//uploads 폴더에 이미지 업로드 후 이미지 경로 반환
    res.json({url:`/img/${req.file.filename}`});
}

exports.uploadPost = async (req,res,next)=>{
    try{
        const post = await Posts.create({
            content:req.body.content,
            image:req.body.url,
            author:req.user._id,//login 후에는 req에 user 속성 추가.
        });
        const hashtags = content.match(/#\s*[^\s#]+/g);//hashtag는 content에 포함돼서 들어올 예정.
                                                      //해당 문자열에서 공백이나 샾 전까지 나오는 텍스트 분리. 분리한 값들을 배열로 반환.
        console.log("hashtags",hashtags);
        if(hashtags){
            const result = await Promise.all(
                hashtags.map(async(tag)=>{
                    const title = tag.slice(1).trim().toLowerCase();//각 배열의 첫번째 문자를 제거하고(slice(1)) 소문자로 변환(toLowerCase).(#Hashtag -> hashtag)
                    let hashtag = await Hashtags.findOne({tag:title});
                    if(!hashtag){
                        hashtag = await Hashtags.create({tag:title});
                        console.log("created hashtag : ",hashtag);
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


exports.updatePost =async (req,res,next)=>{
    try{
        const {postId} = req.params;
        console.log("postId : ",postId);
        const { content,image } = req.body;
        const updateData = {content,image};
        console.log("updateData : ",updateData);
        const hashtags = content.match(/#[^\s#]*/g);
        if(hashtags){
            const hashtagDocs =await Promise.all(
                hashtags.map(async(tag)=>{
                    const title = tag.slice(1).toLowerCase();
                    let hashtag = await Hashtags.findOne({tag:title});
                    if(!hashtag){
                        hashtag = await Hashtags.create({tag:title});
                        console.log("created hashtag : ",hashtag);
                    }
                    return hashtag._id;
                })
            );
            updateData.hashtags = hashtagDocs;
        }
        console.log("updateDatawithHashtags : ",updateData);
        const updatePost = await Posts.findByIdAndUpdate(postId,updateData,{new:true});//{new:true} : 업데이트된 데이터 반환 -> create 메서드도 동일하게 사용하는 생성되는 데이터를 리턴하는 옵션.
                                                                                       //여기서 업데이트 시킬 데이터의 속성은 DB의 속성값과 동일해야 업데이트가 적용됨.
        
        res.json(updatePost);
    }
    catch(err){
        console.error(err);
        next(err);
    }
}

exports.deletePost = async (req,res,next)=>{
    try{
        const {postId} = req.params;
        const post = await Posts.findByIdAndDelete(postId);
        res.json({message:"Post deleted successfully"});
    }
    catch(err){
        console.error(err);
        next(err);
    }
}