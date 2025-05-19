
const jwt=require('jsonwebtoken')
const{JWT_KEY}=require('../../config')

const auth=(req,res,next)=>{
    let token=req.cookies["Token"]
   const decoded=jwt.verify(token,JWT_KEY,(err,data)=>{
    if(err){
        res.status(401).json({message:'Unauthorized access',err})
    }else{
        let userName=data['data']['userName']
        req.cookies.key=userName;
       // console.log(email)
        next();
    }
   })


}

module.exports={auth}