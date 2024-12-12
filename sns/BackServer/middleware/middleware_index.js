exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){//passport에서 제공하는 메서드. 로그인 돼있으면 true리턴.
        next();
    }
    else{//login이 안돼있는 경우.
        res.status(403).send('need login');
    }
}
exports.isNotLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        next();
    }
    else{
        res.status(403).json({message:'already logged in'});
    }
}