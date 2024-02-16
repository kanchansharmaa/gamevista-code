const pool = require('../../config/db')

const { default: axios } = require("axios");
const moment = require('moment');
module.exports={
    insertCallback: (data, callback) => {

        function formatToMySQLDateTime(datetimeStr) {
            const date = moment(datetimeStr, 'M/D/YYYY h:mm:ss A');
            return date.format('YYYY-MM-DD HH:mm:ss');
        }

        
    
        const insertCallbackLogs = process.env.insertCallbackLogs
          .replace("<msisdn>", data.transaction.data.msisdn)
          .replace("<transactionid>", data.transaction.transactionId)
          .replace("<requestid>", data.requestId)
          .replace("<shortcode>", data.transaction.data.shortcode)
          .replace("<channelid>", data.transaction.data.channelId)
          .replace("<applicationid>", data.transaction.data.applicationId)
          .replace("<countryid>", data.transaction.data.countryId)
          .replace("<operatorid>", data.transaction.data.operatorId)
          .replace("<action>", data.transaction.data.action.subType)
          .replace("<status>", data.transaction.data.action.status)
          .replace("<amount>",data.transaction.data.action.rate)
          .replace("<billing_date>", formatToMySQLDateTime(data.transaction.data.activityTime))
          .replace("<next_billed_date>", data.transaction.data.subscriptionEnd)

    
    
    
        console.log("insertCallbackLogs \n ", insertCallbackLogs , "\n");
    
        pool.query(`${insertCallbackLogs}`, [], (err, result) => {
          if (err) return callback(err);
          else return callback("", "Success");
        });
      },

      insertSubscription: (data,password, callback) => {

        function formatToMySQLDateTime(datetimeStr) {
            const date = moment(datetimeStr, 'M/D/YYYY h:mm:ss A');
            return date.format('YYYY-MM-DD HH:mm:ss');
        }
    
        const insertintoSubscription = process.env.insertSubscription
          .replace("<msisdn>", data.transaction.data.msisdn)
          .replace("<transactionid>", data.transaction.transactionId)
          .replace("<requestid>", data.requestId)
          .replace("<applicationid>", data.transaction.data.applicationId)
          .replace("<countryid>", data.transaction.data.countryId)
          .replace("<operatorid>", data.transaction.data.operatorId)
          .replace("<type_event>", data.transaction.data.action.subType)
          .replace("<status>", data.transaction.data.action.status)
          .replace("<amount>",data.transaction.data.action.rate)
          .replace("<billing_date>", formatToMySQLDateTime(data.transaction.data.activityTime))
          .replace("<next_billed_date>", data.transaction.data.subscriptionEnd)
          .replace('<password>',password)

    
    
    
        console.log("insertintoSubscription \n", insertintoSubscription,'\n');
    
        pool.query(`${insertintoSubscription}`, [], (err, result) => {
          if (err) return callback(err);
          else return callback("", "Success");
        });
      },

      checkUserExists: (msisdn, callback) => {

        const checkIfUserExist = process.env.checkUserSubscription
          .replace("<msisdn>", msisdn)
        
    
        console.log("checkIfUserExist \n", checkIfUserExist,'\n');
        pool.query(`${checkIfUserExist}`, [], (err, result) => {
          if (err) return callback(err);
    
          return callback("", result);
        });
      },

      insertUnSub: (data, callback) => {
    
        function formatToMySQLDateTime(datetimeStr) {
          const date = moment(datetimeStr, 'M/D/YYYY h:mm:ss A');
          return date.format('YYYY-MM-DD HH:mm:ss');
      }
    
    
    
        const insertIntoUnSubscription = process.env.insertIntoUnsub
          .replace("<msisdn>",  data.transaction.data.msisdn)
          .replace("<transactionid>", data.transaction.transactionId)
          .replace("<requestid>",  data.requestId)
          .replace("<applicationid>",  data.transaction.data.applicationId)
          .replace("<countryid>", data.transaction.data.countryId)
          .replace("<operatorid>", data.transaction.data.operatorId)
          .replace("<type_event>", data.transaction.data.action.subType)
          .replace("<status>", data.transaction.data.action.status)
          .replace("<amount>", data.transaction.data.action.rate)
          .replace("<billing_date>", formatToMySQLDateTime(data.transaction.data.activityTime))
          .replace("<next_billed_date>", data.transaction.data.subscriptionEnd);
    
    
    
        console.log("insertIntoUnSubscription \n", insertIntoUnSubscription,'\n');
    
        const deleteTblSubscription = process.env.deleteTblSubscription
          .replace("<msisdn>", data.transaction.data.msisdn)
    
        console.log("deleteTblSubscription \n", deleteTblSubscription, "\n");
    
        pool.query(`${insertIntoUnSubscription}`, [], (err, result) => {
          if (err) return callback(err);
        });
    
        pool.query(`${deleteTblSubscription}`, [], (errDelete, resultDelete) => {
          if (errDelete) return callback(errDelete);
    
          return callback("", "Unsubscription successful");
        });
      },

      



       billingsuccess: (data, callback) => {
   
      function formatToMySQLDateTime(datetimeStr) {
        const date = moment(datetimeStr, 'M/D/YYYY h:mm:ss A');
        return date.format('YYYY-MM-DD HH:mm:ss');
    }

    const insertIntoBillingSuccess = process.env.insertBillingSuccess
      .replace("<msisdn>", data.transaction.data.msisdn)
      .replace("<transactionid>", data.transaction.transactionId)
      .replace("<requestid>", data.requestId)
      .replace("<applicationid>", data.transaction.data.applicationId)
      .replace("<countryid>", data.transaction.data.countryId)
      .replace("<operatorid>", data.transaction.data.operatorId)
      .replace("<type_event>", data.transaction.data.action.subType)
      .replace("<status>", data.transaction.data.action.status)
      .replace("<amount>",data.transaction.data.action.rate)
      .replace("<billing_date>", formatToMySQLDateTime(data.transaction.data.activityTime))
      .replace("<next_billed_date>", data.transaction.data.subscriptionEnd)

    
    
        console.log("insertIntoBillingSuccess ", insertIntoBillingSuccess);
    
        pool.query(`${insertIntoBillingSuccess}`, [], (err, result) => {
          if (err) return callback(err);
          else return callback("", "Success");
        });
      },
}