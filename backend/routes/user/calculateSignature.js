const crypto = require('crypto');
const querystring = require('querystring');

function HMACSHA256(key, data,msisdn) {
    try {
        const hmac = crypto.createHmac('sha256', key);
        return hmac.update(data).digest('hex');
    } catch (e) {
        console.error(e);
        return null;
    }
}


const acoObj = {
    APIKey: process.env.API_KEY,
    APISecret: process.env.API_SECRET
 
};

let applicationId = process.env.APPLICATION_ID; 
let countryId = process.env.COUNTRY_ID;    
let operatorId = process.env.OPERATOR_ID;   
let cpId = process.env.CPID;        
let msisdn = msisdn; 
let timestamp = new Date().toISOString(); 
let lang = 'en';       
let shortcode = process.env.SHORTCODE; 


let decryptedSignature = `ApiKey=${querystring.escape(acoObj.APIKey)}`;
decryptedSignature += `&ApiSecret=${querystring.escape(acoObj.APISecret)}`;
decryptedSignature += `&ApplicationId=${querystring.escape(applicationId.toString())}`;
decryptedSignature += `&CountryId=${querystring.escape(countryId.toString())}`;
decryptedSignature += `&OperatorId=${querystring.escape(operatorId.toString())}`;
decryptedSignature += `&CpId=${querystring.escape(cpId.toString())}`;
decryptedSignature += `&MSISDN=${querystring.escape(msisdn).toUpperCase()}`;
decryptedSignature += `&Timestamp=${querystring.escape(timestamp).toUpperCase()}`;
decryptedSignature += `&Lang=${querystring.escape(lang).toUpperCase()}`;
decryptedSignature += `&ShortCode=${querystring.escape(shortcode).toUpperCase()}`;
decryptedSignature += `&Method=RequestPinCode`;


let encryptedSignature = HMACSHA256(acoObj.APISecret, decryptedSignature);

console.log(encryptedSignature);
