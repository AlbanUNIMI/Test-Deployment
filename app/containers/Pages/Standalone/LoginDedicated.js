import React, { useState, useEffect } from "react";
import Dexie from 'dexie'
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Outer from "../../Templates/Outer";
import useStyles from "dan-components/Forms/user-jss";
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';

import settings from '../../../config/settings';
import indexedDB from '../../../config/indexedDB';


import { motion } from "framer-motion";
import smartBales from "./sb.svg";


function LoginDedicated() {
  let history = useHistory();

  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'));


/*--------------------- Initiate IndexedDB Object Store ---------------------*/
  const userDB = indexedDB.userDB;
  const logDB = indexedDB.logDB;
/*--------------------- Initiate IndexedDB Object Store ---------------------*/

  const backend = process.env.AZURE_BACKEND;

/*---------------------- END LogDB Structure ----------------------*/

  const { classes } = useStyles();

  const menuVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 5,
        delay: 5,
      },
      ease: "easeInOut",
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
  };

  const createUserLogDB = async () => {

    /*---------- Create UserDB ---------*/
      userDB.open().then(function () {
  
        console.log('UserDB Successfully Created');
                 
      }).catch (function (err) {
      
          console.log(err);
          
      });
    /*------- END Create UserDB --------*/
  
    /*---------- Create LogDB ----------*/
      logDB.open().then(function () {

        console.log('LogDB Successfully Created');
                 
      }).catch (function (err) {
      
          console.log(err);
          
      });
    /*-------- END Create LogDB --------*/

    checkAuthentication();

  }

  const checkAuthentication = async () => {

  /*------- Check Existing User ------*/
    const userName = await userDB.currentUser?.get(1);

    if (userName?.userCode) {

        history.push("/app")

      } else {

        history.push("/register");

    }       
  /*----- END Check Existing User ----*/  
  }

  useEffect(() => {

    console.log(backend);
    
    setTimeout(() => {

      createUserLogDB();  

    }, 9000);
  }, []);

  return (
    <Outer>
      <div>
        <Helmet>
          <title>Smart Bales</title>
        </Helmet>
        <div>

           <Toolbar style={{position: "fixed", marginLeft: '-20vh', bottom: 0, width: '100%', borderRadius: 0}}>

{/* 

{!mdDown && (
  
    <Typography component="h2" className={cx(classes.headerTitle, showTitle && classes.show)}>
      Smart Bales v1.0
    </Typography>

)}

*/}

    <motion.svg
                style={{ width: "90%", textAlign: "right" }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  stroke="#f6f2e0"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 1,
                  }}
                  strokeWidth={3}
                  strokeDasharray="0 1"
                  fill="none"
                  d="M51.9,35.2c-5.6,3.9-11.3,7.7-17.1,11.2c-2.3,1.4-4.6,2.8-7,4.1c-1.1,0.6-2.2,1.2-3.4,1.7
                 c-1,0.9-1.4,0.6-1.4-0.7c0.5-0.4,1.1-0.9,1.6-1.3c1.1-0.7,2-1.6,3-2.5c1.7-1.5,3.3-3.1,5-4.6c1.9-1.8,3.8-3.6,5.7-5.3
                 c1.1-1,2.5-2.7,4-3c-0.5-0.2-0.9-0.3-1.4-0.5c-1.3,1.1-3.4,1.7-4.9,2.4c-3.5,1.6-6.8,3.6-10.2,5.5c-3.7,2.1-7.5,4.2-11.3,6.1
                 c-1.6,0.8-3.2,1.6-4.9,2.3c-3.4-0.2-3.8-0.8-1.2-1.9c4.8-2.9,9.3-6.3,14-9.4c3.2-2.1,6.3-4.2,9.6-6.1c1.9-1.1,3.8-2.3,6-2.7
                 c-0.4-0.1-0.9-0.3-1.3-0.4c0.4,0.2,0.9,0.4,1.3,0.6c-0.4-0.3-0.8-0.6-1.2-0.9c-0.6,1-1.3,2-1.9,3c-0.6,0.5-1.1,1-1.7,1.5
                 c-1.4,1.2-2.9,2.4-4.4,3.5c-3.9,3-7.9,5.9-11.8,8.9c-2.4,1.8-4.9,3.6-7,5.8c-0.7,0.8-1.8,3.9-2,4.1c-0.2,0.1-0.7,0.3-0.6,0.7
                 c0.4,1.1,0.4,2.7,1.8,2.9c0.6,0,1.3-0.1,1.9-0.2c0.5,0,1.1,0,1.6-0.1c1.5-0.4,3-1.7,4.3-2.5c5-3.3,9.7-7.2,14.2-11.1
                 c3.5-3,7.4-6.1,10.2-9.9c0.6-0.8,1.4-2,0.2-2.7c-1.5-1-3.8,1.2-4.7,2c-4.7,4.4-7.6,10.8-10.5,16.4c-0.9,1.8-1.9,3.7-2.8,5.6
                 c-0.3,0.7-0.7,1.1-0.6,1.8c0.2-0.3,0.4-0.6,0.6-0.8c-2.9,2.5-6.9,3.7-9.7,6.3c-0.1,0.1-0.1,0.3,0.1,0.4c1.6,0.1,3-0.5,4.4-1
                 c5.5-2.2,10.7-5.2,15.8-8.3c7.7-4.6,15-9.7,22.4-14.8c-0.5-0.2-1-0.4-1.5-0.7c0,0.3-1.5,1.1-1.8,1.3c-1.8,1.2-3.6,2.4-5.4,3.7
                 c-3.5,2.5-7,4.9-10.6,7.2c-2.3,1.5-4.7,3-7.1,4.5c-0.8,0.5-2.3,1-2.3,2c0,0.1,0.1,0.2,0.2,0.2c2.4-0.2,4.8-1.1,7.1-1.9
                 c3.6-1.3,7-3.1,10.4-4.8c2.3-1.2,4.6-2.3,6.9-3.6c0.9-0.5,2.6-2,3.6-1.9c-0.5-0.3-1-0.5-1.5-0.8c0.1,0.2,0,0.4,0,0.6
                 c0,0.3,0.1,0.5,0.3,0.7c0.1,0.2,0.5,1.1,0.8,1.1c1.3-0.1,2.1-1,2.9-1.8c-0.5-0.3-1-0.6-1.5-0.9c0,0.2-1.5,1.2-1.8,1.4
                 c-1.1,1-2.1,1.9-3.3,2.8c-0.8,0.6-1.6,1.2-2.5,1.7c-0.2,0.2-0.6,0.3-0.7,0.5c-0.8,1.3,1.5,2.3,2.4,2.5
                 c-0.1-0.5-0.2-1.1-0.2-1.6c-1-0.1-1.7,0-2.6,0.5c-0.2,0.1-0.4,0.3-0.3,0.5c0.7,0.9,1.7,0.5,2.8,0.2c1.4-0.3,3.4-0.6,4.2-1.9
                 c0-0.1,0-0.2,0-0.2c-0.5-0.9-1.2-1.1-2.2-1.4c0,0.1,0.1,0.3,0.1,0.4c0.1,0,1,0.1,1,0.2c0.5,0,0.9,0,1.4,0
                 c1.5,0,3.1-0.2,4.6-0.3c0.8-0.1,1.9-0.1,2.6-0.4c0.2-0.1,0.4-0.3,0.6-0.3c0.5-0.2,0.5-0.1,0.9-0.1c0.8,0,1.7,0.2,2.5,0.2
                 c0.8,0,2.1-0.2,2.9,0.1c-0.5-0.4-1-0.9-1.5-1.3c0,0,0,0,0-0.1c0.3,0.5,0.7,0.9,1,1.4c1.4,0.2,2.9,0,4.4-0.1
                 c0.8-0.1,1.7,0,2.5-0.4c0-0.1,0-0.2-0.1-0.3c-0.5-0.8-0.9-1.2-1.7-1.7c-0.2-0.1-0.6,0.1-0.4,0.3c0.5,0.5,1.2,0.8,1.9,0.9
                 c1.6,0.3,3.4,0.3,5,0.5c0.7,0.1,1.7,0,2.4,0.3c-0.4-0.5-0.8-1-1.2-1.5c-0.1,0.1-0.1,0.2,0,0.3c0.1,0.3,0.9,1.4,1.3,1.5
                 c1.1,0.1,2.3,0,3.4,0.1c1.7,0,3.6-0.3,5.3,0.3c-0.3-0.3-0.6-0.5-0.9-0.8c-1.2-1.3,0.2,0.4,0.4,0.7c0.2,0.2,0.3,0.4,0.6,0.5
                 c0.4,0.1,4.6-0.8,3.7-0.7c0.9-0.2,1.7-0.3,2.4-0.8c0,0,0-0.1,0-0.1c-0.2-1.7-2.1-1.7-3.3-2.3c-0.1-0.1-0.5,0.1-0.3,0.2
                 c0.6,0.4,0.9,0.5,1.5,0.7c2.2,0.5,4.6,0.5,6.8,0.6c1.5,0,3,0.1,4.4,0.1c0.4,0,0.7,0,1.1-0.2c0-0.1,0-0.2,0-0.3
                 c-0.3-0.5-0.6-1-0.9-1.5c-0.2,0.1-0.5,0.1-0.7,0.2c0.6,0.5,1.5,0.7,2.2,0.9c2.2,0.6,4.5,0.6,6.8,0.8c1.7,0.1,3.3,0.2,5,0.4
                 c0.3,0,0.6,0.1,0.9-0.1c0,0,0-0.1,0-0.1c-0.1-0.3-0.2-0.5-0.3-0.8c-0.2,0-0.3,0.1-0.5,0.1c0.7,0.4,1.3,0.5,2,0.6
                 c3.2,0.4,6.5,0.3,9.7,0.4c1,0,2,0.1,3,0c0.2,0,0.3-0.1,0.4-0.2c0.5-0.1,1.2,0.1,1.8,0.1c4.2,0.2,8.5-0.1,12.7,0.4
                 c0.9,0.1,1.8,0.1,2.6,0.2c1.8,0.1,3.9-0.2,5.7,0.1c0.4,0.1-0.2-0.7-0.1-0.6c-0.2-0.2-0.8-1.2-1.2-1.2c-0.5,0-1.3-0.3-1.6-0.5
                 c-0.2-0.2-0.1,0.3,0,0.4c0.9,1.2,3.4,1.1,4.7,1.3c2.4,0.3,4.8,0.4,7.2,0.6c0.9,0.1,2.8-0.1,3.5,0.5c-0.4-0.6-0.8-1.1-1.2-1.7
                 c-0.2,0.1-0.7-0.1-0.8-0.1c-0.2,0-0.3,0.4-0.2,0.5c1.7,1.5,5.3,1.1,7.3,1.2c2.5,0.1,5,0.1,7.6,0.2c1.1,0,2.5-0.1,3.6,0.2
                 c0.4,0.1-0.2-0.7-0.1-0.6c-0.2-0.3-0.8-1.1-1.2-1.2c-0.2,0-0.3-0.1-0.5-0.1c-0.2-0.1-0.4,0-0.4,0.3c0.1,0.6,0.2,0.7,0.8,0.9
                 c0.9,0.4,2.2,0.4,3.2,0.4c2.4,0.1,4.8,0.2,7.2,0.2c2.4,0,4.8,0,7.1-0.1c0.8,0,1.9,0.1,2.6-0.1c1-0.4,0.4-1,0-1.9
                 c-0.4,0-0.7,0-1.1,0c2.3,1.2,4.7,1.2,7.3,1.4c3.1,0.2,6.2,0.3,9.3,0.5c1.2,0.1,2.8-0.1,3.9,0.4c-0.5-0.6-1-1.2-1.4-1.8
                 c-0.2,0.1-0.7-0.1-0.9-0.2c-0.1,0-0.3,0.2-0.2,0.3c0.7,0.8,1.7,0.9,2.7,1c3.5,0.4,7.2,0.3,10.8,0.4c3,0,6,0.1,9,0
                 c0.7,0,1.7,0.1,2.3-0.2c0.1-0.1,0-0.2-0.1-0.3c-0.5-1-1.1-1.4-2.1-2.1c0,0.1-0.1,0.3-0.1,0.4c0.2,0.3,0.5,0.4,0.8,0.5
                 c1.6,0.6,3.4,0.7,5.1,0.9c3.6,0.3,7.2,0.4,10.8,0.5c1.3,0,2.6,0,3.9,0.2c-0.5-0.5-1-1-1.5-1.6c0.1-0.6-8.9-1.5-9.7-1.6
                 c-1.6-0.1-3.3-0.2-4.9-0.3c-0.6,0-1.5-0.3-1.9,0.3c-0.1,0.1,0,0.3,0.1,0.3c3.2,1.5,7,2.1,10.4,2.3c9.4,0.7,18.9,0.6,28.4,0.7
                 c10.5,0.1,20.9,0.1,31.4,0.1c2.6,0,5.2,0.1,7.8-0.1c0.5-0.1,0.7-0.3,1.1-0.4c0.4-0.1,1.2,0.1,1.6,0.1c1.3,0,2.6,0.1,4,0.1
                 c19.7,0.2,39.4,0.2,59.1,0.3c14.7,0.1,29.5,0.3,44.2,0.2c21.1,0,42.2,0,63.4,0c0.4,0-1-1.8-1.5-1.8c-19.4,0-38.8,0-58.2,0
                 c-14.8,0-29.6,0-44.4-0.2c-19.8-0.3-39.6-0.3-59.4-0.3c-3.6,0-7.3-0.3-10.9,0.2c-1.9,0.3-4,0.1-6,0.1
                 c-7.1,0.1-14.1,0.1-21.2,0.1c-11.1,0.1-22.2,0.1-33.2,0c-3,0-6.1-0.1-9.1-0.3c-2.2-0.1-5.1-0.3-7-1.4c0,0.1,0.1,0.2,0.1,0.3
                 c0.2-0.4,2.4,0,2.6,0c1.7,0.1,3.4,0.2,5.1,0.3c1.7,0.1,3.5,0.2,5.1,0.5c1.6,0.3,3.1,1.2,4.4,2.1c0.1,0.1,0.2,0.1,0.3,0.1
                 c0-0.1,0.1-0.1,0.1-0.2c0.2-0.4-1.2-1.7-1.5-1.7c-3.1-0.1-6.2,0-9.3-0.1c-2.3-0.1-4.5,0-6.8-0.1c-1.1,0-2.1,0-3-0.5
                 c-0.3-0.1-0.2,0.2-0.1,0.3c0.3,0.5,0.7,0.5-0.1,0.5c-2.3,0.1-4.7,0.1-7,0.2c-3.8,0-7.5,0-11.3,0.1c-1.2,0-2.7,0.3-3.9-0.1
                 c-0.1,0.1-0.2,0.2-0.3,0.4c0.8,0.7,1.4,1.3,2.5,1.6c0.4,0.1-0.2-0.7-0.1-0.6c-0.3-0.4-0.7-1-1.2-1.2c-0.4-0.1-0.8-0.1-1.2-0.1
                 c-2.1-0.1-4.3-0.1-6.4-0.2c-3.6-0.1-7.4,0.1-11-0.3c0.4,0.2,0.7,0.3,1.1,0.5c-0.2-0.1-0.4-0.3-0.5-0.4
                 c-0.1-0.1-1.1-0.4-1.1-0.1c0,0.6-1,0.5-1.5,0.5c-2.3,0.1-4.6,0.2-6.9,0.3c-2.7,0.1-5.4-0.1-8.2,0c-0.9,0-1.9,0.1-2.9-0.1
                 c0.1,0.1,0.1,0.2,0.2,0.3c0-0.1,0-0.2-0.1-0.3c-0.1,0.1-0.2,0.2-0.4,0.3c0.6,0.5,1.2,1,1.9,1.4c0.4,0.3,0.2-0.2,0.2-0.4
                 c-0.2-0.4-0.9-1.2-1.3-1.3c-0.3-0.1-0.7,0-1,0c-2,0-4,0.1-5.9,0.1c-2.2,0.1-4.4-0.1-6.7-0.1c-1,0-2.3,0.2-3.3-0.2
                 c-0.1,0.1-0.2,0.3-0.3,0.4c0.8,0.6,1.3,1.3,2.3,1.4c0.4,0-0.8-1.6-1.2-1.8c-1.7-0.5-3.9-0.2-5.6-0.3c-1.9,0-3.7-0.2-5.6-0.3
                 c-1,0-2.2,0.2-3.1-0.5c0,0.1,0,0.3,0,0.4c1,0.4,1.8,1.4,2.8,1.9c-0.4-0.6-0.8-1.2-1.2-1.8c-2.9-0.3-6-0.2-8.9-0.3
                 c-3.3-0.2-6.6-0.2-9.9-0.2c-1.5,0-2.9-0.1-4.4,0c-4.4,0.3-9,0.1-13.4,0c-0.6,0-0.8,0.1-1.4,0.1c-1.6,0.1-3.2-0.1-4.8-0.1
                 c-1.2,0-2.3-0.1-3.5-0.1c-1.3,0.2-2.5,0-3.7-0.5c-0.1-0.1-0.6-0.1-0.7,0.1c0-0.1-0.1,0.5,0,0.4c-0.5,0.5-2.1,0.3-2.8,0.4
                 c-2,0.1-3.9,0-5.9,0c-1.1,0-2.1,0.1-3.1-0.4c-0.1,0.1-0.2,0.1-0.3,0.2c0.6,0.3,1.1,0.6,1.5,1c-0.5,0.1-0.9,0.2-1.4,0.3
                 c-0.6,0.2-1.2,0.2-1.8,0.1c-0.7,0.1-1.4,0.2-2.1,0.2c0.4,0.7,0.9,1.3,1.3,2c0-0.1,0.1-0.1,0.1-0.2c0.2-0.4-1.2-1.8-1.5-1.9
                 c-1.8-0.5-3.7,0-5.5-0.3c-1-0.2-2.1-0.1-3.1-0.1c0.5,0.6,0.9,1.1,1.4,1.7c0-0.1,0-0.2,0.1-0.3c0.1-0.3-1.1-1.4-1.4-1.5
                 c-0.8-0.1-1.6-0.1-2.3-0.1c-1.1,0-2.3-0.1-3.4,0c-0.8,0.3-1.5,0.2-2-0.3c-0.1,0.1-0.2,0.2-0.4,0.3c0.4,0.2,0.3,0.3-0.1,0.2
                 c-0.7,0.1-1.5,0.2-2.2,0.2c-0.8,0.1-1.7,0.2-2.5,0.2c-0.2,0-0.5,0-0.7,0.1c0.2,0.4,0.4,0.8,0.5,1.2c0.3,0.1,0.5,0.2,0.8,0.3
                 c0.1,0.1,0.2,0.1,0.3,0c0-0.1,0-0.1,0.1-0.2c0.2-0.4-1.4-1.5-1.7-1.5c-1.8,0-3.6,0-5.4,0.1c-0.4,0-0.6,0-1,0.2
                 c-1.2,0.5-2.3,0.8-3.6,1.1c-1.4,0.2-2.9,0.6-4.4,0.4c-0.5-0.1-0.6-0.3-1-0.1c-0.2,0.1-0.2,0.3,0,0.4c1,0.6,1.1,0.2-0.8,1.3
                 c-0.4,0.3-2.6,1.9-3.4,1.1c-0.1,0.2-0.3,0.4-0.4,0.6c1.3-0.5,1.8,0.4,3,0.5c0.3,0-0.1-1.5-0.4-1.6c-2.5-0.5-0.5-1.4,0.3-1.9
                 c2.4-1.5,4.2-4,7.1-4.3c0.1,0,0.1-0.1,0.1-0.2c0-0.1,0-0.2,0-0.2c0-0.3-1.2-1.1-1.5-0.9c-0.7,0.5-1.4,1.1-2.3,1.2
                 c0.3,0.5,0.7,1,1,1.5c0-0.8,0.7-1,0.6-1.8C56,46.5,54.7,46,54.4,46c-0.8,0.2-1.6,0.8-2.3,1.3c-1.7,1-3.4,2-5.1,3
                 c-3.7,2-7.3,4.2-11.2,5.8c-0.6,0.2-6.4,3-6.7,2.5c-0.2-0.4,7.9-5.3,8.5-5.7c2.3-1.5,4.5-3,6.7-4.5c1.6-1.1,3.2-2.2,4.8-3.3
                 c2.1-2.1,4.5-3.3,7.2-3.7c0,0,0.1,0,0.1-0.1c0-0.1,0-0.2,0.1-0.3c0.1-0.4-1.3-0.8-1.5-0.7c-5.5,3.5-10.8,7.5-16.3,11.1
                 c-5,3.3-10,6.5-15.3,9.4c-2.7,1.5-5.7,3.9-9,3.9c0.1,0.1,0.1,0.2,0.2,0.4c2.4-2.3,5.7-3.8,8.5-5.6c0.2-0.1,0.8-0.7,0.8-1
                 c0.1-0.5,0.3-0.9,0.5-1.4c0.5-1.1,1-2.2,1.6-3.3c1.6-3.2,3.2-6.5,5-9.6c1.3-2.2,2.6-4.9,4.4-6.7c5-4.1,6.2-4.5,3.7-1.2
                 c-1,1.1-2,2.1-3,3.1c-5.1,4.9-10.6,9.5-16.3,13.7c0,0-9.6,7.6-11,4.9c-0.2-0.5-0.3-1.1-0.4-1.6c-0.3,0.2-0.6,0.5-0.8,0.7
                 c0.5-0.1,1-0.5,1.4-0.9c0.5-0.5,0.8-1.1,1.2-1.7c0.3-0.9,0.7-1.8,1.3-2.6c0.7-0.7,1.5-1.3,2.2-1.9c4.5-3.7,9.2-7.3,14-10.7
                 c2.3-1.7,4.6-3.4,6.8-5.1c1.5-1.1,3.2-2,4.3-3.5c0.2-0.3-1.5-1-1.7-1c-2.4,0.2-4.3,1.6-6.3,2.8c-4.5,2.7-8.7,5.9-13,9
                 c-3.7,2.7-7.4,5.2-11.1,7.9c-1,0.7-1.9,1.2-2.4,2.3c0,0.1-0.1,0.2,0,0.3c1.2,0.5,1.9,0.3,3.3,0c3.7-1.1,7.2-3.1,10.5-4.9
                 c4.6-2.5,9.1-5.1,13.7-7.6c2.1-1.2,4.4-2.6,6.7-3.5c1.3-0.5,2.7-0.8,4.1-1.2c0.6-0.2-1-0.7-1.4-0.5c-1.5,0.7-2.7,2.1-3.9,3.2
                 c-2.1,2-4.2,4.2-6.3,6.3c-2.1,2.1-4.1,4.2-6.4,6C22.9,51,21.1,52,20,53.6c-0.1,0.2,0.1,0.3,0.2,0.3c2.5,0.4,5.2-1.6,7.2-2.6
                 c8.8-4.7,17.1-10.2,25.3-15.9C53.1,35.2,52.1,35,51.9,35.2z"
                />
    </motion.svg>
</Toolbar>


        </div>
      </div>
    </Outer>
  );
}

export default LoginDedicated;