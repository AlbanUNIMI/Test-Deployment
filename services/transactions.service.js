import axios from 'axios';

const backend = process.env.AZURE_BACKEND;

export const userService = {
   getTeC,
   getPrivacyPolicy,
   getUser,
   recoverOTP,
   userRelatedTier,
   userRelatedSite,
   userRelatedLocations
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
/* ----------------------------- END User Activation ------------------------------ */  

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


  async function userRelatedTier() {
  
    try {
      return axios({
        url: backend + "/getTier",
        method: "get"
      }).catch((err) => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
   }
  }

  async function userRelatedSite() {
  
    try {
      return axios({
        url: backend + "/getSite",
        method: "get"
      }).catch((err) => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
   }
  }

  async function userRelatedLocations() {

    let type = 'APP_LOCATION';

    try {
      return axios({
        url: backend + "/getRecord",
        method: "get",
        params: {
          type: type,
        }
      }).catch((err) => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
   }
  }

