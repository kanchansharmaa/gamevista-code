const express=require('express')
const router=express.Router();

const {userSubscription}=require('./user.controller')
const {otpvalidation}=require('./user.controller')

router.post('/',userSubscription)
router.post('/validate',otpvalidation)

module.exports=router