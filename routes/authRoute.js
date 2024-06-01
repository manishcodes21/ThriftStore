import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object is needed when you do routing in separate file

const router = express.Router()

//routing
//REGISTER|| METHOD IS POST
//instead using call back functions we are writing the logic in controllers and importing to make it look simpler
router.post('/register',registerController)

//logiN || mETHOD IS POST
router.post('/login',loginController)

//forgot password || post

router.post('/forgot-password',forgotPasswordController)

//test route
router.get('/test',requireSignIn,isAdmin,testController)


//protected route path
router.get('/user-auth',requireSignIn,(req,res)=>{
  res.status(200).send({ok:true})
 
})
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
  res.status(200).send({ok:true})
 
})
export default router;
