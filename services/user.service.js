import axios from 'axios';

const backend = process.env.AZURE_BACKEND;

export const userService = {
   getTeC,
   getPrivacyPolicy,
   getUser,
   recoverOTP,
   userRelatedTier,
   userRelatedSite,
   userRelatedRecords,
   userRelatedTransactions,
   createTier
}

/* -------------------------------- Terms & Conditions -------------------------------- */  
  async function getTeC(language) {

      try {
        return axios({
          url: backend + "/retrieveTeC",
          method: "get",
          params: {
            language: language
          }
        }).catch((err) => {
          console.log(err);
        });
      } catch (err) {
        console.log(err);
    }
  }
/* ------------------------------ END Terms & Conditions ------------------------------ */  

/* ---------------------------------- Privacy Policy ---------------------------------- */  
  async function getPrivacyPolicy(language) {

    let jwt = '';

      try {
        return axios({
          url: backend + "/retrievePrivacyPolicy",
          method: "get",
          params: {
            jwt: jwt,
            language: language
          }
        }).catch((err) => {
          console.log(err);
        });
      } catch (err) {
        console.log(err);
    }
  }
/* -------------------------------- END Privacy Policy -------------------------------- */  

/* --------------------------------- User Activation ---------------------------------- */  
  async function getUser(otp) {
 
    try {
      return axios({
        url: backend + "/getUser",
        method: "get",
        params: {
          userCode: otp,
        }
      }).catch((err) => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
   }
  }
/* ------------------------------- END User Activation -------------------------------- */  

  /*
  async function getUser(otp, action, jwt) {

    let obj = {
      "otp": otp,
      "action": action,
      "jwt": jwt
    };
  
    try {
      return await axios({
        url: backend + "/getUser",
        method: "post",
        data: obj
  
      }).catch((err) => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
    }
  }
  */

/* -------------------------- END User Authentication ----------------------------- */

/* --------------------------------- Recover OTP ---------------------------------- */  
  async function recoverOTP(recoverOtp) {
  
      try {
        return axios({
          url: backend + "/recoverOTP",
          method: "get",
          params: {
            email: recoverOtp,
          }
        }).catch((err) => {
          console.log(err);
        });
      } catch (err) {
        console.log(err);
     }
  }
/* --------------------------------- Recover OTP ---------------------------------- */  


  async function userRelatedTier(code) {
  
    try {
      return axios({
        url: backend + "/getTier",
        method: "get",
        params: {
          userCode: code
        }
      }).catch((err) => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
   }
  }

  async function userRelatedSite(code) {
  
    try {
      return axios({
        url: backend + "/getSite",
        method: "get",
        params: {
          userCode: code
        }
      }).catch((err) => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
   }
  }

  async function userRelatedRecords(code, type) {

    try {
      return axios({
        url: backend + "/getRecord",
        method: "get",
        params: {
          userCode: code,
          type: type
        }
      }).catch((err) => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
   }
  }

  async function userRelatedTransactions(code, type) {

    try {
      return axios({
        url: backend + "/retrieveTransactions",
        method: "get",
        params: {
          userCode: code,
          type: type
        }
      }).catch((err) => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
   }
  }

/* ------------------------------- Create New Tier -------------------------------- */  
  async function createTier(userCode, nameOriginal, nameReference, tierLevelCod, ZIP, adressOriginal, adressReference, locationOriginal, locationReferences) {
     
    try {
      return axios({
        url: backend + "/createTier",
        method: "get",
        params: {
          userCode: userCode,
          nameOriginal: nameOriginal,
          nameReference: nameReference,
          tierLevelCod: tierLevelCod,
          ZIP: ZIP,
          adressOriginal: adressOriginal,
          adressReference: adressReference,
          locationOriginal: locationOriginal,
          locationReference: locationReferences
        }
      }).catch((err) => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
   }
  }
/* ----------------------------- END Create New Tier ------------------------------ */  




