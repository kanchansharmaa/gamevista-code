require('dotenv').config();
const crypto = require('crypto');
const querystring = require('querystring');
const acoObj = { APIKey: process.env.API_KEY, APISecret:process.env.API_SECRET};
// const currentTimestamp = new Date().toISOString();

const smsSignature=(msisdn, lang,text,currentTimestamp)=>{
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
                MsgText:text.toUpperCase(),
                Method: 'SendSMS'
            }).replaceAll('%2F','%2f');


    console.log("decryptedSignature===================",decryptedSignature )
   
    
    try {
        const hmac = crypto.createHmac('sha256', acoObj.APISecret);
        return hmac.update(decryptedSignature).digest('hex');
    } catch (e) {
        console.error(e);
        return null;
    }
}

module.exports={
    smsSignature
    
}




// function calculateSMSSignature(msisdn,text,lang) {


//     let decryptedSignature = querystring.stringify({
//         ApiKey: acoObj.APIKey,
//         ApiSecret: acoObj.APISecret,
//         ApplicationId: process.env.APPLICATION_ID.toString(),
//         CountryId: process.env.COUNTRY_ID.toString(),
//         OperatorId: process.env.OPERATOR_ID.toString(),
//         CpId: process.env.CPID.toString(),
//         MSISDN: msisdn.toUpperCase(),
//         Timestamp: currentTimestamp.toUpperCase(),
//         Lang: lang.toUpperCase(),
//         ShortCode: process.env.SHORTCODE.toUpperCase(),
//         MsgText:text.toUpperCase(),
//         Method: 'SendSMS'
//     }).replaceAll('%2F','%2f');


//     console.log("decryptedSignature===================",decryptedSignature )
   
    
//     try {
//         const hmac = crypto.createHmac('sha256', acoObj.APISecret);
//         return hmac.update(decryptedSignature).digest('hex');
//     } catch (e) {
//         console.error(e);
//         return null;
//     }
// }
