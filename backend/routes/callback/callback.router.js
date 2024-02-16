const express=require('express')
const router=express.Router();
const {callbackNotify}=require('./callback.controller')

router.post('/',callbackNotify)

module.exports=router;