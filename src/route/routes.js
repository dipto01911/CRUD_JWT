
const router=require('express').Router()
const{RegisterController,LoginController,readUserController,UpdateContoller,DeleteController}=require('../controller/controller')
const{auth}=require('../middleware/auth')


router.post('/register',RegisterController)
router.post('/login',LoginController)
router.get('/read',auth,readUserController)
router.patch("/update",auth,UpdateContoller)
router.delete('/delete',auth,DeleteController)

module.exports=router