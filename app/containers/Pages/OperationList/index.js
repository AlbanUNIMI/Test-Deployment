import React, { useState, useEffect } from "react";
import Dexie from "dexie";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from 'tss-react/mui';
import Paper from '@mui/material/Paper';
import settings from '../../../config/settings';
import '@fontsource-variable/eb-garamond';

import { OpList } from "dan-components";

import op from "./svg/opList.svg";

import toast, { Toaster } from "react-hot-toast";

/*--------------------- Initiate IndexedDB Object Store ---------------------*/
  const OperationList = () => {
/*------------------------- 01. Initiate Op List Table ----------------------*/
  const initiateOpList = async () => {

    // Check Active User

  };
/*------------------------- END Initiate Op List Table ----------------------*/

/*---------------------------- onLoad Logic ---------------------------------*/
  useEffect(() => {

    initiateOpList();
        
    }, []);
/*-------------------------- END onLoad Logic -------------------------------*/

  return (
    <div>
      <Box component="section" sx={{ p: .5 }}>

      <Grid container alignItems="left">
        <Grid xs={12} item textAlign="left">
          <Typography
            mt={-3}
            color="white"
            style={{ fontFamily: "EB Garamond Variable", fontSize: "3vh" }}
          >
            Operations List {"  "}
            <img src={op} height="16" style={{ marginTop: "-0.2rem" }} />
          </Typography>
        </Grid>
        
        <OpList />      

      </Grid>



      </Box>
    </div>
  );
};

export default OperationList;
