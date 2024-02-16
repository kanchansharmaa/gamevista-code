const pool = require('../../config/db')
module.exports = {

    checkUserValid: (msisdn, password,callback) => {

       
        const checkIfUserSubscriptionExist = process.env.checkUserExistence
          .replace("<msisdn>", msisdn)
          .replace('<password>',password)
      
        console.log("checkIfUserSubscriptionExist", checkIfUserSubscriptionExist);
      
        pool.query(`${checkIfUserSubscriptionExist}`, [], (err, result) => {
          if (err) return callback(err);
      
          return callback(null, result);
        });
      },
}