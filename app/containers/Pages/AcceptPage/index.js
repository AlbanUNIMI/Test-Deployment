import React, { useState, useEffect } from "react";
import Dexie from "dexie";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from 'tss-react/mui';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import settings from '../../../config/settings';
import '@fontsource-variable/eb-garamond';

import { AcceptTable } from "dan-components";

import toast, { Toaster } from "react-hot-toast";
import au from "./arrow_up.svg";

/*--------------------- Initiate IndexedDB Object Store ---------------------*/
const version = settings.indexedDBVersion;

const transactionalDBScheme = settings.TransactionalDB;


const db = new Dexie('TransactionalDB')

db.version(version).stores({
  assignBales: transactionalDBScheme.assignBales,
})

const { assignBales } = db;
/*------------------- END Initiate IndexedDB Object Store -------------------*/

const AcceptBales = () => {

  const [currentJob, setCurrentJob] = useState(false);
  const [newJob, setNewJob] = useState(true); 
  const [transactionID, setTransactionID] = useState();

  const currentDate = new Date().getTime();

  /*------------------------- 01. New / Resume job logic -----------------------*/
  const checkPendingJOB = async () => {
    try {

      const pendingJob = await db.assignBales?.get({transactionStatusCode: "0"}) || '';

      console.log(pendingJob);

      if (!pendingJob) {

        setNewJob(true);
        setCurrentJob(false);

      } else {
        setNewJob(false);
        setCurrentJob(true);
      }
      
    } catch (err) {
      console.log(err);
    }
  };
/*----------------------- END New / Resume job logic ------------------------*/

/*----------------------- 02. Start New Assignment Job ----------------------*/

/*------------- Update Views -------------*/
  const handleJob = () => {

    setNewJob(false);
    setCurrentJob(true);

    setTransactionID('AS'+currentDate);
    newAssignmentJob('AS'+currentDate);
  };
/*----------- END Update Views -----------*/

/*------- Create New TransactionID -------*/
  const newAssignmentJob = async (transID) => {
    try {
      
      let transactionID = transID;
      let transactionTypeCode = "0";
      let transactionStatusCode = "0";
      let acceptanceStatusCode = "";
      let tierCode = "";
      let siteCode = "";
      let date = "";
      let GPSLongitude = "";
      let GPSLatitude = "";
      let headerNote = "";
  
      add(transactionID, transactionTypeCode, transactionStatusCode, acceptanceStatusCode, tierCode, siteCode, date, GPSLongitude, GPSLatitude, headerNote);
    } catch (err) {
      console.log("3° ERR");
    }
  };
/*----- END Create New TransactionID -----*/

/*---------- Populate IndexedDB ----------*/
  const add = async (transactionID, transactionTypeCode, transactionStatusCode, acceptanceStatusCode, tierCode, siteCode, date, GPSLongitude, GPSLatitude, headerNote) => {
    await assignBales.add({
      transactionID: transactionID,
      transactionTypeCode: transactionTypeCode, 
      transactionStatusCode: transactionStatusCode,
      acceptanceStatusCode: acceptanceStatusCode,
      tierCode: tierCode,
      siteCode: siteCode,
      date: date, 
      GPSLongitude: GPSLongitude, 
      GPSLatitude: GPSLatitude, 
      headerNote: headerNote,
      balesList: [],
    });
  
     // toast.success("Transaction Successfull", { duration: 5000 });
    };
/*---------- END Populate IndexedDB ----------*/

/*-------------------- END Start new assignment job -------------------------*/

/*---------------------------- onLoad Logic ---------------------------------*/
useEffect(() => {

    checkPendingJOB();
      
  }, []);
/*-------------------------- END onLoad Logic -------------------------------*/

  return (
    <div>
      <Box component="section" sx={{ p: .5 }}>
      
      {newJob && ( // Start a new JOB

      <Grid container height='70vh' alignItems="center">
         <Grid xs={12} item textAlign="center">
         </Grid>
      </Grid>

      )}

     {currentJob && ( // Work / Resume current JOB

      <Grid container alignItems="left">
        <Grid xs={12} item textAlign="left">
          <Typography
            mt={-3}
            color="white"
            style={{ fontFamily: "EB Garamond Variable", fontSize: "3vh" }}
          >
            Empty Sack Acceptance {" "}
            <img src={au} height="15" style={{ marginTop: "-0.2rem" }} />
          </Typography>
        </Grid>
        
        <AcceptTable />      

      </Grid>

      )}

      </Box>
    </div>
  );
};

export default AcceptBales;
