const express=require('express')
const router=express.Router();


const {otpvalidation}=require('./otp.controller')


router.post('/',otpvalidation)

module.exports=router