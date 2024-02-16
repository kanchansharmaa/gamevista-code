const express=require('express')
const router=express.Router();

const {getUserSubscriptionStatus}=require('./subscription.controller')

router.get("/:msisdn/:password", getUserSubscriptionStatus);
module.exports=router;
