import React, { Fragment, useState, useEffect } from 'react';

import { useHistory } from "react-router-dom";

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Icon from '@mui/material/Icon';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Grid } from "@mui/material"; 
import useStyles from './user-jss';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { InsetDivider } from '../../components/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import ReplyIcon from '@mui/icons-material/Reply';
import TextField from '@mui/material/TextField';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import '@fontsource-variable/eb-garamond';

import sbLogo from "../Header/Logo.svg";
import sbLogoDark from "../Header/sbLogoDark.svg";

import Dexie from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import toast, {Toaster} from 'react-hot-toast';
import settings from '../../config/settings';
import indexedDB from '../../config/indexedDB';

import parse from 'html-react-parser';
import BeatLoader from "react-spinners/BeatLoader";


import { userService } from "../../../services/user.service";

const envTest = process.env.NODE_AZURE;

const RegisterForm = (props) => {

  let history = useHistory();

  const { classes, cx } = useStyles();

  const jwt = settings.jwtTemp;

/*-------------------------------------- INIT ------------------------------------------------*/
  const [register, setRegister] = useState(true);
  const [reset, setReset] = useState(false);

  const [otp, setOtp] = useState('');
  const [recoverOtp, setRecoverOtp] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [teC, setTeC] = useState('');
  const [privacyPolicy, setPrivacyPolicy] = useState('');

  const [teCModalOpen, setTeCModalOpen] = useState(false);
  const [teCBody, setTeCBody] = useState('');
  const [teCDisabled, setTeCDisabled] = useState(true);
  const [teCChecked, setTeCChecked] = useState(false);

  const [privacyPolicyModalOpen, setPrivacyPolicyModalOpen] = useState(false);
  const [privacyPolicyDisabled, setPrivacyPolicyDisabled] = useState(true);
  const [privacyPolicyBody, setPrivacyPolicyBody] = useState('');
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);

  const [loading, setLoading] = useState(false);
  const [getUserLoading, setGetUserLoading] = useState(false);
  const [getRecoverOtpLoading, setGetRecoverOtpLoading] = useState(false);
  const [privacyPolicyLoading, setPrivacyPolicyLoading] = useState(false);
/*------------------------------------ END INIT ----------------------------------------------*/

/*------------------------------- Terms & Conditions -----------------------------------------*/
  const handleTeCModalOpen = () => {
     getTeC();
     setTeCModalOpen(true);
     setTeCDisabled(false);
  }

  const handleTeCModalClose = () => {
     setTeCModalOpen(false);
 }

  const handleTeC = () => {
    setTeCChecked(!teCChecked);
  }

  const handleTeCAccept = () => {
    setTeCChecked(true);
    setTeCModalOpen(false);
  }

/*----------------------------- END Terms & Conditions ---------------------------------------*/

/*--------------------------------- Privacy Policy -------------------------------------------*/
  const handlePrivacyPolicyModalOpen = () => {
    getPrivacyPolicy();
    setPrivacyPolicyModalOpen(true);
    setPrivacyPolicyDisabled(false);
  }

  const handlePrivacyPolicyModalClose = () => {
    setPrivacyPolicyModalOpen(false);
  }

  const handlePrivacyPolicy = () => {
    setPrivacyPolicyChecked(!privacyPolicyChecked);
  }

  const handlePrivacyPolicyAccept = () => {
    setPrivacyPolicyChecked(true);
    setPrivacyPolicyModalOpen(false);
  }
/*------------------------------- END Privacy Policy -----------------------------------------*/

/*--------------------------------------- OTP ------------------------------------------------*/
  const handleChange = (newValue) => {
        setOtp(newValue);
  }
/*------------------------------------- END OTP ----------------------------------------------*/

/*--------------------------------------- OTP ------------------------------------------------*/
  const handleRecoverOtp = (e) => {
    setRecoverOtp(e.target.value);

    /* Validate Email */

    let email = e.target.value;

    let validate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validate)) 
    {
      setValidEmail(true)
    } else {
      setValidEmail(false)
    }

   // let eval = val && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)

   // console.log(validateOtp);
  }
/*------------------------------------- END OTP ----------------------------------------------*/

/*-------------------------------- SWITCH FORMS ----------------------------------------------*/
  const showForm = (reg, res) => {
    setRegister(reg);
    setReset(res);
  }
/*------------------------------ END SWITCH FORMS --------------------------------------------*/

/*------------------------------- Initiate IndexedDB Object Store ----------------------------*/
  const userDB = indexedDB.userDB;
  const logDB = indexedDB.logDB;
  const recordsDB = indexedDB.recordsDB;
  const transactionalDB = indexedDB.transactionalDB;
  const notificationsDB = indexedDB.notificationsDB;
/*----------------------------- END Initiate IndexedDB Object Store --------------------------*/


/*----------------------------- 00. Successfull User Authentication --------------------------*/
  const successfullAuthentication = async (userName) => {

    createLogDB();
    createNotificationsDB();

    toast.success("User succesfully authenticated! Welcome "+userName+" !", {duration: 3000});

    setTimeout(() => {

      history.push("/app");
      setGetUserLoading(false);

    }, 3000);
}
/*----------------------------- END Successfull User Authentication --------------------------*/

/*--------------------------------- 0a. Get Terms & Conditions -------------------------------*/
  const getTeC = async () => {

    // console.log(process.env.AZURE_BACKEND);

    if(!teCBody){setLoading(true)};

    try {
      let res = await userService.getTeC(props.lang);

      if (res.error) {
        
      console.log(res.error);

      } else {

        if (res.data){

        console.log(res.data);
        setTeCBody(res.data);
        setLoading(false);
          
      
        } else {

          toast.error("Something");

        }
      
      }
    } catch (err) {

      console.log(err);;

    }
  };
/*--------------------------------- END Get Terms & Conditions -------------------------------*/


/*----------------------------------- 0b. Get Privacy Policy ---------------------------------*/
  const getPrivacyPolicy = async () => {

    if(!privacyPolicyBody){setPrivacyPolicyLoading(true)};

    /*----------------- GET Request to NodeJS Server ----------------------*/
    try {
      let res = await userService.getPrivacyPolicy(props.lang);

      if (res.error) { 
        
      console.log(res.error);

      } else {

        if (res.data){

        console.log(res.data);
        setPrivacyPolicyBody(res.data);
        setPrivacyPolicyLoading(false);  
            
        } else {

          toast.error("Something");

        }
      }
    } catch (err) {
      console.log(err);;
    }
  };
/*----------------------------------- END Get Privacy Policy ---------------------------------*/


/*------------------- 01a. Call getUser Function / Create & Populate UserDB ------------------*/
  const getUser = async () => {

    setGetUserLoading(true);

    try {
      let res = await userService.getUser(otp);

      if (res.Error) { 
        
        toast.error(res.Error.ErrorMessage, {duration: 3000});
        console.log('1'); // LogDB
        setGetUserLoading(false);

      } else {

        if (res?.data?.Error){

        console.log('2'); // LogDB

        toast.error(res.data.ErrorMessage, {duration: 3000});
        setGetUserLoading(false);

        } else if (res?.data) {  

        console.log(res.data);
      
        let name = res?.data?.user[0]?.name;
        let email = res?.data?.user[0]?.eMail;
        let userCode = res?.data?.user[0]?.userCod;
        let tierCod = res?.data?.user[0]?.tierCod;                           
        let active = res?.data?.user[0]?.active;                             // T|F 
        let langugeCod = res?.data?.user[0]?.languageCod;                    // E|C|N
        let logActive = res?.data?.user[0]?.logActive;                       // T|F
        let RFIDActive = res?.data?.user[0]?.RFIDActive;                     // T|F
        let ASSIGNEMENTActive = res?.data?.user[0]?.ASSIGNEMENTActive;       // T|F
        let ACCEPTINGActive = res?.data?.user[0]?.ACCEPTINGActive;           // T|F
        let COLLECTINGActive = res?.data?.user[0]?.COLLECTINGActive;         // T|F
        let GPSActive = res?.data?.user[0]?.GPSActive;                       // T|F
        let COLLABORATIONActive = res?.data?.user[0]?.COLLABORATIONActive;   // T|F

        addUser(name, email, userCode, tierCod, active, langugeCod, logActive, RFIDActive, ASSIGNEMENTActive, ACCEPTINGActive, COLLECTINGActive, GPSActive, COLLABORATIONActive );

        } else {

          toast.error(res?.error?.ErrorMessage, {duration: 3000});
          console.log('4'); // LogDB
          setGetUserLoading(false);

        }
      
      }
    } catch (err) {

      console.log('5');  // LogDB
      setGetUserLoading(false);

    }
  };

  const addUser = async (name, email, userCode, tierCod, active, langugeCod, logActive, RFIDActive, ASSIGNEMENTActive, ACCEPTINGActive, COLLECTINGActive, GPSActive, COLLABORATIONActive) => {

    try {

            userDB.open().then(function () {
            
                userDB.currentUser.add({
                name: name,
                email: email,
                userCode: userCode,
                tierCod: tierCod, 
                active: active, 
                langugeCod: langugeCod,
                logActive: logActive,
                RFIDActive: RFIDActive,
                ASSIGNEMENTActive: ASSIGNEMENTActive,
                ACCEPTINGActive: ACCEPTINGActive,
                COLLECTINGActive: COLLECTINGActive,
                GPSActive: GPSActive,
                COLLABORATIONActive: COLLABORATIONActive
              });

              console.log('UserDB Successfully Created');
              
            }).catch (function (err) {
            
              console.log(err);
              
            });

          getTier(userCode);

    } catch (err) {

          console.log(err);
          toast.error(err, {duration: 3000});

    }

  }
/*-------------------- END Call getUser Function / Create & Populate UserDB ------------------*/

/*----------------------------------- 01b. Call Recover OTP ----------------------------------*/
  const otpRecoveryRequest = async (recoverOtp) => {

      setGetRecoverOtpLoading(true);
  
      try {
        let res = await userService.recoverOTP(recoverOtp);
  
        if (res.Error) { 
          
          toast.error(res.Error.ErrorMessage, {duration: 3000});
          console.log('1'); // LogDB
          setGetRecoverOtpLoading(false);
          setRecoverOtp('');
  
        } else {
  
          if (res?.data?.Error){
  
          console.log('2'); // LogDB
  
          toast.error(res.data.ErrorMessage, {duration: 3000});
          setGetRecoverOtpLoading(false);
          setRecoverOtp('');
  
          } else if (res?.data) {  

            toast.success('OTP successfully sent! Please check your inbox.', {duration: 3000});

            setGetRecoverOtpLoading(false);
            setReset(false);
            setRegister(true);
                       
          } else {
  
            toast.error(res?.error?.ErrorMessage, {duration: 3000});
            console.log('4'); // LogDB
            setGetRecoverOtpLoading(false);
            setRecoverOtp('');
  
          }
        
        }
      } catch (err) {
  
        console.log('5');  // LogDB
        setGetRecoverOtpLoading(false);
        setRecoverOtp('');
  
      }
  };
/*----------------------------------- END Call Recover OTP -----------------------------------*/

/*------------------------- 02. GET User Related Tier Sructure Creation ----------------------*/
  const getTier = async (code) => {

    try {

      let res = await userService.userRelatedTier(code);
    
    /*---------- Request Error ----------*/
      if (res.error) {
        
          console.log(res.error); // LogDB
    /*---------- END Request Error ----------*/

      } else if (res.data){

        let length = res?.data?.length;

          try {

            userDB.open().then(function () {

              for (let i=0; i<length; i++){
                
                userDB.userRelatedTier.add({
                    userCode: res.data[i].tierCod,
                    tierCode: res.data[i].nameOriginal,
                    tierLevelCode: res.data[i].tierLevelCod,
                    locationCode: '',
                    nameOriginal: res.data[i].nameOriginal,
                    nameReference: res.data[i].nameReference,
                    active: res.data[i].active,
                    site: res.data[i].site
                });
              }

            console.log('userRelatedTier Successfully Created');
          
          /*---------- IndexedDB Writing Error ----------*/
          }).catch (function (err) { // LogDB
          
            console.log(err);
          /*-------- END IndexedDB Writing Error --------*/
        });

        getSite(code);

      } catch (err) {
      /*---------- IndexedDB Opening Error ----------*/

        console.log(err); // LogDB

      /*-------- END IndexedDB Opening Error --------*/
      }

    } else {
      /*---------- Endpoint Response Error ----------*/

        toast.error("No Tier connected to current user!", {duration: 3000}); // LogDB

      /*-------- END Endpoint Response Error --------*/
      } 

    } catch (err) {
    /*---------- NodeJS Server Request Error ----------*/

      console.log(err); // LogDB

    /*-------- END NodeJS Server Request Error --------*/
  }
  };
/*------------------------- END GET User Related Tier Sructure Creation ----------------------*/

/*------------------------- 03. GET User Related Site Sructure Creation ----------------------*/
  const getSite = async (code) => {

    try {

      let res = await userService.userRelatedSite(code);
    
    /*---------- Request Error ----------*/
      if (res.error) {
        
          console.log(res.error); // LogDB
    /*---------- END Request Error ----------*/

      } else if (res.data){

        let length = res?.data?.site?.length;

        try {

            userDB.open().then(function () {

              for (let i=0; i<length; i++){

                userDB.userRelatedSite.add({
                  locationCode: res?.data.site[i].locationCod,
                  countryCode: res?.data.site[i].countryCod,
                  areaCode: res?.data.site[i].areaCod,
                  sitecode: res?.data.site[i].sitecode,
                  ZIP: res?.data.site[i].ZIP,
                  GPS: res?.data.site[i].GPS
                });
              }

            console.log('userRelatedSite Successfully Created');
          
          /*---------- IndexedDB Writing Error ----------*/
          }).catch (function (err) { // LogDB
          
            console.log(err);
          /*-------- END IndexedDB Writing Error --------*/
        });

        // successfullAuthentication('');
        getUserRecordsAsync(code);

      } catch (err) {
      /*---------- IndexedDB Opening Error ----------*/

        console.log(err); // LogDB

      /*-------- END IndexedDB Opening Error --------*/
      }

    } else {
      /*---------- Endpoint Response Error ----------*/

        toast.error("No Site connected to current user!", {duration: 3000}); // LogDB

      /*-------- END Endpoint Response Error --------*/
      } 

    } catch (err) {
    /*---------- NodeJS Server Request Error ----------*/

      console.log(err); // LogDB

    /*-------- END NodeJS Server Request Error --------*/
  }
  };
/*------------------------- END GET User Related Site Sructure Creation ----------------------*/

/*-------------------------- 04a. GET UserDB Transcoding Records Assync ----------------------*/
  const getUserRecordsAsync = async (code) => {

    let usrRelatedRecords = ['COUNTRY','LOCATION','AREA'];

    for (let i=0; i<usrRelatedRecords.length; i++)
    {

    try {

      let type = usrRelatedRecords[i];

      let res = await userService.userRelatedRecords(code, type);
    
    /*---------- Request Error ----------*/
      if (res.error) {
        
          console.log(res.error); // LogDB
    /*---------- END Request Error ----------*/

      } else if (res.data){

        let length = res?.data?.length;

          try {

            userDB.open().then(function () {

            /* Populate Site Related Country / Locations / Area Stores in UserDB */
            if (type === 'COUNTRY'){

              for (let i=0; i<length; i++){
                
                userDB.siteRelatedCountries.add({
                    recordCode: res.data[i].recordCod, 
                    description: res.data[i].description, 
                    languageCode: res.data[i].languageCod
                });
              }

            console.log('User Related Countries Successfully Created');

            } else if (type === 'LOCATION') {

              for (let i=0; i<length; i++){
                
                userDB.siteRelatedLocations.add({
                    recordCode: res.data[i].recordCod, 
                    description: res.data[i].description, 
                    languageCode: res.data[i].languageCod
                });
              }

            console.log('Site Related Locations Successfully Created');

            } else if (type === 'AREA'){

              for (let i=0; i<length; i++){
                
                userDB.siteRelatedArea.add({
                    recordCode: res.data[i].recordCod, 
                    description: res.data[i].description, 
                    languageCode: res.data[i].languageCod
                });
              }

            console.log('Site Related Area Successfully Created');

            }
           /* END Populate Site Related Country / Locations / Area Stores in UserDB */

          /*---------- IndexedDB Writing Error ----------*/
          }).catch (function (err) { // LogDB
          
            console.log(err);
          /*-------- END IndexedDB Writing Error --------*/
        });

      } catch (err) {
      /*---------- IndexedDB Opening Error ----------*/

        console.log(err); // LogDB

      /*-------- END IndexedDB Opening Error --------*/
      }

    } else {
      /*---------- Endpoint Response Error ----------*/

        toast.error("No Tier connected to current user!", {duration: 3000}); // LogDB

      /*-------- END Endpoint Response Error --------*/
      } 

    } catch (err) {
    /*---------- NodeJS Server Request Error ----------*/

      console.log(err); // LogDB

    /*-------- END NodeJS Server Request Error --------*/
  }
/*------------- END COUNTRY -------------*/
}

getAllRecordsAsync(code);

};
/*-------------------------- END GET UserDB Transcoding Records Assync -----------------------*/

/*-------------------------- 04b. GET All Transcoding Records Assync -------------------------*/
  const getAllRecordsAsync = async (code) => {

    let allRecords = ['BALES_PHYSICAL_STATUS','BALES_LOGICAL_STATUS','BALES_TRANSACTION_STATUS','READING_TYPE','USER_PROFILE','TRANSACTION_TYPE','TIER_LEVEL'];

    for (let i=0; i<allRecords.length; i++)
    {

    try {

      let type = allRecords[i];

      let res = await userService.userRelatedRecords(code, type);
    
    /*---------- Request Error ----------*/
      if (res.error) {
        
          console.log(res.error); // LogDB
    /*---------- END Request Error ----------*/

      } else if (res.data){

        let length = res?.data?.length;

          try {

            recordsDB.open().then(function () {

            /* Populate Site Related Country / Locations / Area Stores in UserDB */
            if (type === 'BALES_PHYSICAL_STATUS'){

              for (let i=0; i<length; i++){
                
                recordsDB.physicalStatus.add({
                    recordCode: res.data[i].recordCod, 
                    description: res.data[i].description, 
                    languageCode: res.data[i].languageCod
                });
              }

            console.log('Physical Status Records Successfully Created');

            } else if (type === 'BALES_LOGICAL_STATUS') {

              for (let i=0; i<length; i++){
                
                recordsDB.logicalStatus.add({
                    recordCode: res.data[i].recordCod, 
                    description: res.data[i].description, 
                    languageCode: res.data[i].languageCod
                });
              }

            console.log('Logical Statuses Successfully Created');

            } else if (type === 'BALES_TRANSACTION_STATUS'){

              for (let i=0; i<length; i++){
                
                recordsDB.transactionStatus.add({
                    recordCode: res.data[i].recordCod, 
                    description: res.data[i].description, 
                    languageCode: res.data[i].languageCod
                });
              } 

            console.log('Site Related Area Successfully Created');

            } else if (type === 'READING_TYPE'){

              for (let i=0; i<length; i++){
                
                recordsDB.readingType.add({
                    recordCode: res.data[i].recordCod, 
                    description: res.data[i].description, 
                    languageCode: res.data[i].languageCod
                });
              } 

            console.log('Reading Type Successfully Created');
           } else if (type === 'USER_PROFILE'){

            for (let i=0; i<length; i++){
              
              recordsDB.userProfile.add({
                  recordCode: res.data[i].recordCod, 
                  description: res.data[i].description, 
                  languageCode: res.data[i].languageCod
              });
            } 

          console.log('User Profile Successfully Created');

         } else if (type === 'TRANSACTION_TYPE'){

          for (let i=0; i<length; i++){
            
            recordsDB.transactionType.add({
                recordCode: res.data[i].recordCod, 
                description: res.data[i].description, 
                languageCode: res.data[i].languageCod
            });
           } 
            console.log('Transaction Type Successfully Created');

          } else if (type === 'TIER_LEVEL'){

            for (let i=0; i<length; i++){
              
              recordsDB.tierLevel.add({
                  recordCode: res.data[i].recordCod, 
                  description: res.data[i].description, 
                  languageCode: res.data[i].languageCod
              });
             } 
              console.log('Tier Level Successfully Created');
            }
          /* END Populate Site Related Country / Locations / Area Stores in UserDB */

          /*---------- IndexedDB Writing Error ----------*/
          }).catch (function (err) { // LogDB
          
            console.log(err);
          /*-------- END IndexedDB Writing Error --------*/
        });

      } catch (err) {
      /*---------- IndexedDB Opening Error ----------*/

        console.log(err); // LogDB

      /*-------- END IndexedDB Opening Error --------*/
      }

    } else {
      /*---------- Endpoint Response Error ----------*/

        toast.error("No Tier connected to current user!", {duration: 3000}); // LogDB

      /*-------- END Endpoint Response Error --------*/
      } 

    } catch (err) {
    /*---------- NodeJS Server Request Error ----------*/

      console.log(err); // LogDB

    /*-------- END NodeJS Server Request Error --------*/
  }
  /*------------- END COUNTRY -------------*/
    }

  getTransactions(code);

  };
/*--------------------------- END GET All Transcoding Records Assync -------------------------*/

/*-------------------------- 04a. GET UserDB Transcoding Records Assync ----------------------*/
  const getTransactions = async (code) => {

    for (let i=0; i<3; i++)
    {

    try {

      let type = i;

      let res = await userService.userRelatedTransactions(code, type);
    
    /*---------- Request Error ----------*/
      if (res.error) {
        
          console.log(res.error); // LogDB
    /*---------- END Request Error ----------*/

      } else if (res.data){

        let length = res?.data?.length;

          try {

            transactionalDB.open().then(function () {

          /* Populate Assignment / Acceptance / Collecting Bales Stores in TransactionalDB */
          if (type === 0){

              for (let i=0; i<length; i++){
               
                transactionalDB.assignBales.add({
                    transactionID: res.data[i].transactionID,
                    transactionTypeCode: res.data[i].transactionTypeCod, 
                    transactionStatusCode: res.data[i].transactionStatusCod, 
                    acceptanceStatusCode: res.data[i].acceptanceStatusCod,                    
                    tierCode: res.data[i].tierCod, 
                    siteCode: res.data[i].siteCod,             
                    date: res.data[i].date, 
                    GPSLongitude: res.data[i].GPSLongitude,                    
                    GPSLatitude: res.data[i].GPSLatitude, 
                    headerNote: res.data[i].note,             
                    balesList: res.data[i].bales
                });
              }

            console.log('Assignment Bales Successfully Retrieved');

            } else if (type === 1) {

              for (let i=0; i<length; i++){
                
                transactionalDB.acceptBales.add({
                    transactionID: res.data[i].transactionID,
                    transactionTypeCode: res.data[i].transactionTypeCod, 
                    transactionStatusCode: res.data[i].transactionStatusCod, 
                    acceptanceStatusCode: res.data[i].acceptanceStatusCod,                    
                    tierCode: res.data[i].tierCod, 
                    siteCode: res.data[i].siteCod,             
                    date: res.data[i].date, 
                    GPSLongitude: res.data[i].GPSLongitude,                    
                    GPSLatitude: res.data[i].GPSLatitude, 
                    headerNote: res.data[i].note,             
                    balesList: res.data[i].bales
                });
              }

            console.log('Accepted Bales Successfully Retrieved');

            } else if (type === 2){

              for (let i=0; i<length; i++){
                
                transactionalDB.collectedBales.add({
                  transactionID: res.data[i].transactionID,
                  transactionTypeCode: res.data[i].transactionTypeCod, 
                  transactionStatusCode: res.data[i].transactionStatusCod, 
                  acceptanceStatusCode: res.data[i].acceptanceStatusCod,                    
                  tierCode: res.data[i].tierCod, 
                  siteCode: res.data[i].siteCod,             
                  date: res.data[i].date, 
                  GPSLongitude: res.data[i].GPSLongitude,                    
                  GPSLatitude: res.data[i].GPSLatitude, 
                  headerNote: res.data[i].note,             
                  balesList: res.data[i].bales
              });
            }

            console.log('Collected Bales Successfully Retrieved');

            }
          /* END Populate Assignment / Acceptance / Collecting Bales Stores in TransactionalDB */

          /*---------- IndexedDB Writing Error ----------*/
          }).catch (function (err) { // LogDB
          
            console.log(err);
          /*-------- END IndexedDB Writing Error --------*/
        });

      } catch (err) {
      /*---------- IndexedDB Opening Error ----------*/

        console.log(err); // LogDB

      /*-------- END IndexedDB Opening Error --------*/
      }

    } else {
      /*---------- Endpoint Response Error ----------*/

        toast.error("Impossible to retrieve user related transactions!", {duration: 3000}); // LogDB

      /*-------- END Endpoint Response Error --------*/
      } 

    } catch (err) {
    /*---------- NodeJS Server Request Error ----------*/

      console.log(err); // LogDB

    /*-------- END NodeJS Server Request Error --------*/
  }
  /*------------- END COUNTRY -------------*/
  }

  successfullAuthentication('');

  };
/*-------------------------- END GET UserDB Transcoding Records Assync -----------------------*/

/*----------------------------- 05. Create / Resync TransactionsDB ---------------------------*/
  const getTransactions_ = async () => {
    

    transactionalDB.open().then(function () {

      console.log('TransactionalDB Successfully Created');
      
    }).catch (function (err) {
  
      console.log(err);
      
    });
      
  };
/*----------------------------- END Create / Resync TransactionsDB ---------------------------*/

/*----------------------------- 06. Create / Resync NotificationsDB --------------------------*/
/*----------------------------- END Create / Resync NotificationsDB --------------------------*/

/*--------------------------------------- 07. Create LogDB -----------------------------------*/
  const createLogDB = async () => {

    logDB.open().then(function () {

      console.log('LogDB Successfully Created');
      
    }).catch (function (err) {

      console.log(err);
      
    });  
  };
/*--------------------------------------- END Create LogDB -----------------------------------*/

/*---------------------------------- 08. Create NotificationsDB ------------------------------*/
  const createNotificationsDB = async () => {

    notificationsDB.open().then(function () {

      console.log('NotificationsDB Successfully Created');
      
    }).catch (function (err) {

      console.log(err);
      
    });  
};
/*---------------------------------- END Create NotificationsDB ------------------------------*/

  const mdUp = useMediaQuery(theme => theme.breakpoints.up('md'));
  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'));

  const { pristine, submitting, deco } = props;

  const TeCBody = parse(teCBody);
  const PrivacyPolicyBody = parse(privacyPolicyBody);

  const tecLink = 'https://www.loropiana.com/textile/_ui/SmartBales/SmartBalesTermsOfUse_'+props.lang+'.pdf';
  const privacyPolicyLink = 'https://www.loropiana.com/textile/_ui/SmartBales/SmartBalesPrivacyPolicy_'+props.lang+'.pdf';


  return (
    
    <Fragment>

    <Toaster position="top-center" reverseOrder="false"/>

    {/* NEW OTP REQUEST */}

      {reset && (

      <Fragment>

      {!mdUp && ( // Mobile Logo
      <Grid container direction='row' alignItems='center' justifyContent='center'>
        <Grid item m={2}> 
          <img src={sbLogo} alt='Loro Piana' style={{height: '5vh'}}/>
        </Grid>
      </Grid>
      )}

      <Paper className={cx(classes.paperWrap, deco && classes.petal)}>
          <div className={classes.topBar}>
            <Button size="small" className={classes.buttonLink} onClick={() => showForm(true, false)}>
               <ReplyIcon /> 
            </Button>
            <img src={sbLogoDark} alt="Smart Bales" style={{height: '3vh', display: mdUp ? 'block' : 'none' }} />
          </div>
      <Typography variant="h4" className={classes.title} gutterBottom>
        Reset Password
      </Typography>
      <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
        Send reset password link to Your email
      </Typography>
       <section className={classes.formWrap}>
          
          <InsetDivider />

          <Grid container alignItems='center'>
            <Grid xs={12}item textAlign='center'>
              <TextField fullWidth
                      onChange={(e)=> handleRecoverOtp(e)}
                      value={recoverOtp}
                      id="recover-otp"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ color: !validEmail ? '#9f5a47' : '#1c7e76', ml: 1, mb: 1 }} >
                            { !validEmail ? <UnsubscribeIcon /> : <MarkEmailReadIcon />}
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                    />
            </Grid>
          </Grid>

          <InsetDivider />

          <Grid container alignItems='center' mt={2}>
            <Grid xs={12}item textAlign='center'>
              <Button variant="contained" color="primary" disabled={!validEmail} fullWidth onClick={()=> otpRecoveryRequest(recoverOtp)}>
                {!getRecoverOtpLoading && (
                  <>
                    Send Recover Email
                    <ArrowForward className={cx(classes.rightIcon, classes.iconSmall)} />
                  </>
                  )}
                  {getRecoverOtpLoading && (
                  <>
                    <BeatLoader color={'#ffffff'} loading={getRecoverOtpLoading}/>
                  </>
                  )}
              </Button>
            </Grid>
          </Grid>

      </section>
    </Paper>
      </Fragment>

    )}

     {register && ( /* SHOW OTP FORM */

      <Fragment>

      {!mdUp && ( // Mobile Logo
      <Grid container direction='row' alignItems='center' justifyContent='center'>
       <Grid item m={2}> 
          <img src={sbLogo} alt='Loro Piana' style={{height: '5vh'}}/>
       </Grid>
      </Grid>
      )}
      <Paper className={cx(classes.paperWrap, deco && classes.petal)}>
        {!mdDown && ( // Widescreen Logo
          <div className={classes.topBar}>
            <img src={sbLogoDark} alt="Smart Bales" style={{height: '3vh'}} />
            <Button size="small" className={classes.buttonLink} onClick={() => showForm(false, true)}>
              <Icon className={classes.icon}>arrow_forward</Icon> Need help with your OTP ?
            </Button>
          </div>
        )}
        
        <Typography variant="h4" className={classes.title} gutterBottom style={{fontFamily: "EB Garamond Variable", fontWeight: "bolder"}}> OTP
          {/*
          <Tooltip title="Please insert your supplied One Time Password!">
              <InfoIcon />
          </Tooltip>
          */}
        </Typography>

        <Typography variant="caption" className={classes.subtitle} gutterBottom align="center" marginBottom="1rem">
            Please insert your supplied One Time Password!
        </Typography>

        <InsetDivider />

          <section className={classes.formWrap}>
              <div>
                <MuiOtpInput length={5} value={otp} onChange={handleChange} name="otp" autoComplete="off" TextFieldsProps={{disabled: false}}/>
                <InsetDivider />
              </div>

              <div>
                <Grid container direction='row' alignItems='center' justifyContent='center'>

              {/* Privacy Policy Checkbox*/}
              <Grid item xs={7} textAlign='left'>
                <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 20, marginRight: -1 } }} disabled={privacyPolicyDisabled} checked={privacyPolicyChecked} onChange={()=> handlePrivacyPolicy()}/>
                <Button variant="text" onClick={()=> handlePrivacyPolicyModalOpen()}>Privacy Policy</Button>
              </Grid>

              <Dialog fullScreen
                    open={privacyPolicyModalOpen}
                    onClose={handlePrivacyPolicyModalClose}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="Terms-Conditions">
                      {"Privacy Policy"}
                    </DialogTitle>
                    <DialogContent>
                      <>
                        <BeatLoader color={'#9f5a47'} loading={privacyPolicyLoading}/>
                        {PrivacyPolicyBody}     
                      </>                     
                    </DialogContent>
                    <DialogActions>
                      <Grid container alignItems='center'>
                      <Grid item xs={4} align='left'>
                      <a
                        href={privacyPolicyLink}
                        download='Smart Bales - Terms of Use'
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button style={{color: '#4e4e4e'}}>
                           <FileDownloadIcon />
                             Download Policy
                        </Button>
                      </a>
                      </Grid>

                        <Grid item xs={8} align='right'>
                          <Button autoFocus onClick={()=> { handlePrivacyPolicyModalClose(), setPrivacyPolicyChecked(false)}}>
                            Disagree
                          </Button>
                          <Button onClick={()=> handlePrivacyPolicyAccept()} autoFocus style={{color: '#1c7e76'}}>
                            Agree
                          </Button>
                        </Grid>
                      </Grid>
                    </DialogActions>
                  </Dialog>
                {/* END Privacy Policy Checkbox & Dialog*/}

              {/* Terms & Conditions Checkbox & Dialog*/}
              <Grid item xs={5} textAlign='right'>
                <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 20, marginRight: -2.4 } }} disabled={teCDisabled} checked={teCChecked} onChange={()=> handleTeC()}/> 
                <Button variant="text" onClick={()=> handleTeCModalOpen()}>T&C</Button>
              </Grid>

                <Dialog fullScreen
                    open={teCModalOpen}
                    onClose={handleTeCModalClose}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="Terms-Conditions">
                      {"Terms & Conditions"}
                    </DialogTitle>
                    <DialogContent>
                      <>
                      <BeatLoader color={'#9f5a47'} loading={loading}/>
                      {TeCBody}     
                      </>
                    </DialogContent>
                    <DialogActions>
                    <Grid container alignItems='center'>
                      <Grid item xs={4} align='left'>
                        <a
                          href={tecLink}
                          download='Smart Bales - Terms of Use'
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button style={{color: '#4e4e4e'}}>
                            <FileDownloadIcon />
                              Download T&C
                          </Button>
                        </a>
                        </Grid>
                        <Grid item xs={8} align='right'>
                          <Button autoFocus onClick={()=> {  handleTeCModalClose(), setTeCChecked(false)}}>
                            Disagree
                          </Button>
                          <Button onClick={handleTeCAccept} autoFocus style={{color: '#1c7e76'}}>
                            Agree
                          </Button>
                        </Grid>
                    </Grid>
                    </DialogActions>
                  </Dialog>
                {/* END Terms & Conditions Checkbox & Dialog*/}

                </Grid>
                <InsetDivider />
              </div>

              <div className={classes.btnArea}>
                <Button variant="contained" color="primary" type="submit" disabled={(otp.length < 5 || isNaN(otp) || !teCChecked || !privacyPolicyChecked)} onClick={() => getUser()}>
                  {!getUserLoading && (
                  <>
                    Continue
                    <ArrowForward className={cx(classes.rightIcon, classes.iconSmall)} />
                  </>
                  )}
                  {getUserLoading && (
                  <>
                    <BeatLoader color={'#ffffff'} loading={getUserLoading}/>
                  </>
                  )}
                  </Button>
              </div>

              {!mdUp && (
                <Button size="small" className={classes.buttonLink} onClick={() => showForm(false, true)}>
                   <Icon className={classes.icon}>arrow_forward</Icon> Need help with your OTP ?
                </Button>
              )}

          </section>
        
      </Paper>

      </Fragment>

       )}

    </Fragment>
    
  );
}

export default RegisterForm;
