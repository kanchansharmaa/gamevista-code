const axios = require('axios');
const crypto = require('crypto');
const querystring = require('querystring');
require('dotenv').config();
const currentTimestamp = new Date().toISOString();

const { insertCallback,insertSubscription ,checkUserExists,insertUnSub,billingsuccess} = require('./callback.service');

const acoObj = {
  APIKey: process.env.API_KEY,
  APISecret: process.env.API_SECRET
};

function calculateSMSSignature(msisdn, text, lang) {
  
  console.log("calculate sms==========\n", msisdn , text , lang, currentTimestamp,'\n')

  let decryptedSignature = querystring.stringify({
    ApiKey: acoObj.APIKey,
    ApiSecret: acoObj.APISecret,
    ApplicationId: process.env.APPLICATION_ID,
    CountryId: process.env.COUNTRY_ID,
    OperatorId: process.env.OPERATOR_ID,
    CpId: process.env.CPID,
    MSISDN: msisdn.toUpperCase(),
    Timestamp: currentTimestamp.toUpperCase(),
    Lang: lang.toUpperCase(),
    ShortCode: process.env.SHORTCODE.toUpperCase(),
    MsgText: text.toUpperCase(),
    Method: 'SendSMS'
  }).replaceAll('%2F', '%2f');


  let parts = decryptedSignature.split('&');
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].startsWith('MsgText=')) {
     
      parts[i] = parts[i].replaceAll('%20', '+').replaceAll('%2f','%2F')
      break;
    }
  }

 
  decryptedSignature = parts.join('&');

  console.log("decryptedSignature\n", decryptedSignature)
  try {
    const hmac = crypto.createHmac('sha256', acoObj.APISecret);
    return hmac.update(decryptedSignature).digest('hex');
  } catch (e) {
    console.error(e);
    return null;
  }
}

function sendSMS(msisdn, text, lang,requestId) {
  console.log("sendsms function data============\n", msisdn , text , lang , requestId,currentTimestamp,'\n')
  const signature = calculateSMSSignature(msisdn, text, lang);

  const data = {
    applicationId: process.env.APPLICATION_ID,
    countryId: process.env.COUNTRY_ID,
    operatorId: process.env.OPERATOR_ID,
    MSISDN: msisdn,
    cpId: process.env.CPID,
    requestId:requestId ,
    apiKey: process.env.API_KEY,
    signature: signature,
    timestamp: currentTimestamp,
    lang: lang,
    shortcode: process.env.SHORTCODE,
    msgText: text
  };

  const apiURL = process.env.SMS_URL;

  axios.post(apiURL, data)
    .then(apiResponse => {
      console.log("sms url data====================\n",apiURL,data)
      console.log("SMS Response:", apiResponse.data);
    })
    .catch(error => {
      console.error('Error sending SMS:', error);
    });
}

function generateFourDigitPassword() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  module.exports = {
    callbackNotify: (req, res) => {
      const data = req.body;
       console.log("data callabck========\n",data)
      insertCallback(data, (err) => {
        if (err) {
          console.error("Error: ", err);
          return res.status(500).json({ message: " failed", error: err.message });
        }
  
        if (data.transaction.data.action.subType =="SUBSCRIBE") {
          const msisdn = data.transaction.data.msisdn;
          const fourDigitPassword = generateFourDigitPassword();
    
          checkUserExists(msisdn, (existsErr, exists) => {
            if (existsErr) {
              console.error("Error : ", existsErr);
              return res.status(500).json({ message: "Error ", error: existsErr.message });
            }
  
        
            if (exists.length > 0) {
              return res.json({ message: "User is already subscribed." });
            }
            
            else {
              // Insert data into billingsuccess first
              billingsuccess(data, (billingErr) => {
                if (billingErr) {
                  console.error("Billing Error: ", billingErr);
                  return res.status(500).json({ message: "Billing failed", error: billingErr.message });
                }
            
                // Now, insert data into subscription
                insertSubscription(data, fourDigitPassword, (subscriptionErr) => {
                  if (subscriptionErr) {
                    console.error("Subscription Error: ", subscriptionErr);
                    return res.status(500).json({ message: "Subscription failed", error: subscriptionErr.message });
                  }
            
                  const text = `Dear Customer, Welcome to GAMEVISTA service. You can access your account and enjoy the service by visiting ${process.env.CONTENT_URL}. Username : ${msisdn} and Password : ${fourDigitPassword}. For Terms & Conditions, click here https://gamejunction.visiontrek.in/.`;
                  const lang = 'en';
                  sendSMS(msisdn, text, lang, data.requestId);
                  return res.json({ message: "Success" });
                });
              });
            }
            
          });
        } 
        else if (data.transaction.data.action.subType === "UNSUBSCRIBE") {
          
          insertUnSub(data, (unSubErr) => {
            if (unSubErr) {
              console.error("Error: ", unSubErr);
              return res.status(500).json({ message: " failed", error: unSubErr.message });
            }
            return res.json({ message: "Success" });
          });
        } else {
          return res.json({ message: "Undefined action" }); 
        }
      });
    }
  };
  