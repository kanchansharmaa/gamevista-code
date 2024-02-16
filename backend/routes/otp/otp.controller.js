require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const crypto = require('crypto');
const querystring = require('querystring');
const acoObj = { APIKey: process.env.API_KEY, APISecret:process.env.API_SECRET};
const currentTimestamp = new Date().toISOString();


function calculateSignature(msisdn, lang) {
  

  let decryptedSignature = querystring.stringify({
      ApiKey: acoObj.APIKey,
      ApiSecret: acoObj.APISecret,
      ApplicationId: process.env.APPLICATION_ID.toString(),
      CountryId: process.env.COUNTRY_ID.toString(),
      OperatorId: process.env.OPERATOR_ID.toString(),
      CpId: process.env.CPID.toString(),
      MSISDN: msisdn.toUpperCase(),
      Timestamp: currentTimestamp.toUpperCase(),
      Lang: lang.toUpperCase(),
      ShortCode: process.env.SHORTCODE.toUpperCase(),
      Method: 'ValidatePinCode'
  }).replaceAll('%2F','%2f');

  console.log("decryptedSignature",decryptedSignature )
 
  
  try {
      const hmac = crypto.createHmac('sha256', acoObj.APISecret);
      return hmac.update(decryptedSignature).digest('hex');
  } catch (e) {
      console.error(e);
      return null;
  }
}


module.exports = {
    otpvalidation:(req,res)=>{
       const {number,requestId,otp}=req.body
      console.log("data from form",data)
      const lang='en'
      const signature=calculateSignature(number,lang)
      res.send("Success")
    }

    
};
