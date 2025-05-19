
  const {User}=require('../model/User')
const jwt=require('jsonwebtoken')
const {JWT_KEY}=require('../../config')

  const RegisterServices=async(req,res)=>{
 try{
 const reqBody=req.body;
 await User.create(reqBody)
 .then((data)=>{
    res.status(201).json({message:'User Registration Sucessfully',data})
 }).catch((err)=>{
    res.status(400).json({message:'Error occured',err})
 })
 }catch(err){
    res.status(500).json({message:'Server error',err})
 }
  }

  const LoginServices=async(req,res)=>{
    try{
// let {email,password}=req.body;
// let query={email:email,password:password}
// let projection='_id firstName lastName email'
// await User.find(query,projection)
let reqbody=req.body;
let matchingstage={
   $match:reqbody
};
let projection={
   $project:{
      _id:1,
      firstName:1,
      lastName:1,
      email:1,
      userName:1
   }

}
await User.aggregate([matchingstage,projection])
.then((data)=>{
   if(data.length>0){
   
      let payloads={
        exp: Math.floor(Date.now()/1000 + (24*60*60)),
        data:data[0]
      }
const token=jwt.sign(payloads,JWT_KEY)
let option={
   maxAge:30*24*60*60*1000,
   httpOnly:true,
   sameSite:"none",
   secure:true
}

res.cookie('Token',token,option)
 res.status(200).json({message:'Login Sucessful',data,'Token':token})

}else{
 res.status(404).json({message:'User not found'})
   }
   
}).catch((err)=>{
   res.status(500).json({message:'Server error'})
})
       
    }catch(err){
      res.status(500).json({message:'Server error'})
    }
  }

  const readUserService=async(req,res)=>{
  try{

let userName=req.cookies['key']
let projection={
   $project:{
      firstName:1,
      lastName:1,
      email:1,
      userName:1
   }
}
let matchingstage={
   $match:{userName}
}

let data=await User.aggregate([matchingstage,projection])

if(data.length<=0){
   res.status(404).json({message:'User not found'})
}
res.status(200).json({message:'User Profile',data})

   }catch(err){
      res.status(500).json({message:'Server Error'})
   }

  }

const UpdateService=async(req,res)=>{
 try{

   let username=req.cookies['key']
   let query={userName:username}
   let reqBody=req.body;
   await User.updateOne(query,reqBody)
   .then((data)=>{
      res.status(200).json({message:'User Updated Successfully',data})
   }).catch((err)=>{
      res.status(400).json({message:'Error occur'})
   })

 }catch(err){
   res.status(500).json({message:'Server error'})
 }
}

const DeleteService=async(req,res)=>{
 try{
let KEY=req.cookies['key']
let query={userName:KEY}
await User.deleteOne(query)
.then((data)=>{
   res.status(200).json({message:'User deleted'})
}).catch((err)=>{
   res.status(400).json({message:'Error occur'})
})
 }catch(err){
res.status(500).json({message:'Server error'})
 }
}

  module.exports={RegisterServices,LoginServices,readUserService,UpdateService,DeleteService}