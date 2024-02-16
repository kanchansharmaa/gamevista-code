require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const crypto = require('crypto');
const querystring = require('querystring');
const acoObj = { APIKey: process.env.API_KEY, APISecret:process.env.API_SECRET};
const currentTimestamp = new Date().toISOString();



function calculateOtpSignature(msisdn, lang) {
  

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
        Method: 'RequestPinCode'
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

function calculateOtpValidateSignature(msisdn, lang,method,otp) {
  

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
        Code:otp.toUpperCase(),
        Method: 'ValidatePinCode'
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

module.exports = {

    userSubscription: (req, res) => {
        
        const { msisdn,requestId,lang } = req.body;
        console.log("data from frontend ", msisdn,requestId,lang)
        const clientHostname = req.headers['x-hostname'];
        // const lang ="en";
        const method='RequestPinCode'

        const signature = calculateOtpSignature(msisdn, lang,method);
        // console.log("signature",signature)
       
        const data = {
            applicationId: process.env.APPLICATION_ID,
            countryId: process.env.COUNTRY_ID,
            operatorId: process.env.OPERATOR_ID,
            MSISDN: msisdn,
            cpId: process.env.CPID,
            requestId: requestId,
            apiKey: process.env.API_KEY,
            signature: signature,
            timestamp: currentTimestamp,
            lang: lang,
            shortcode: process.env.SHORTCODE,
            ipAddress: clientHostname,
            lpUrl: process.env.CONTENT_URL,
            adpartnername: '',
            pubId: ''
        };

      
        const apiURL = process.env.REQUEST_CODE;
        console.log('Requesting Pin:', apiURL, 'with data:', data);

        axios.post(apiURL, data)
            .then(apiResponse => {
                res.json({ Response: apiResponse.data });
            })
            .catch(error => {
                console.error('Error making API request:', error);
                res.status(500).json({ message: "error", error: error.message });
            });
    },


    otpvalidation:(req,res)=>{
        const {msisdn,requestId,otp,language}=req.body
        console.log("data from body",req.body)
       
        
        const lang=language;
        const method='ValidatePinCode'
        const signature=calculateOtpValidateSignature(msisdn,lang,method,otp)
        console.log("signature",signature)


        const data = {
            applicationId: process.env.APPLICATION_ID,
            countryId: process.env.COUNTRY_ID,
            operatorId: process.env.OPERATOR_ID,
            MSISDN: msisdn,
            cpId: process.env.CPID,
            requestId: requestId,
            apiKey: process.env.API_KEY,
            signature: signature,
            timestamp: currentTimestamp,
            lang: lang,
            shortcode: process.env.SHORTCODE,
            code:otp,
            adpartnername: '',
            pubId: ''
        };

        const apiURL = process.env.VALIDATE_PIN_CODE;
        console.log('Validating Pin==========================:', apiURL, 'with data:', data);

        axios.post(apiURL, data)
            .then(apiResponse => {
                console.log("validationresponse",apiResponse.data)
                if ('100' in apiResponse.data) {
                    console.log("Message:", apiResponse.data['100']);
                 
                    res.json({ Response: apiResponse.data, status: 1 });
                } else {
               
                    res.json({ Response: apiResponse.data });
                }
            })
            .catch(error => {
                console.error('Error making API request:', error);
                res.status(500).json({ message: "error", error: error.message });
            });


       
     }


    
};
