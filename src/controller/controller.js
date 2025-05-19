
const {User}=require('../model/User')


const {RegisterServices,LoginServices,readUserService,UpdateService,DeleteService}=require('../services/service')
const RegisterController=(req,res)=>{
 try{
const{email,password}=req.body;

if(!email || !password){
    return res.status({message:'Email and Password are required'})
}
  RegisterServices(req,res);
    }catch(err){
        res.status(500).json({message:'Server error'})
    }
  
}

const LoginController=(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password){
        return res.status(400).json({message:'Email & Password are required'})
    }
     LoginServices(req,res); 
    }catch(err){
        res.status(500).json({message:'Error Occured',err})
    }
  

}

const readUserController=(req,res)=>{
   readUserService(req,res)
}

const UpdateContoller=(req,res)=>{
 UpdateService(req,res)
}
const DeleteController=(req,res)=>{
    DeleteService(req,res)

}
module.exports={RegisterController,LoginController,readUserController,UpdateContoller,DeleteController}