import React, {useState, useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from "react-router-dom";

import Dexie from "dexie";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


// import useSound from 'use-sound';

import Tooltip from '@mui/material/Tooltip';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import BorderColorIcon from '@mui/icons-material/BorderColor'; 
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'; 
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from "@mui/material/Grid";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import toast, { Toaster } from "react-hot-toast";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import QrCodeIcon from '@mui/icons-material/QrCode';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SaveIcon from '@mui/icons-material/Save';
import PausePresentationIcon from '@mui/icons-material/PausePresentation';
import HBar from './hBar.svg';

// import Autocomplete from '@mui/material/Autocomplete';

import CustomSelect from 'react-select';

import Html5QrcodePlugin from './Html5QrcodePlugin.js';
import indexedDB from '../../config/indexedDB';
import settings from '../../config/settings';
import BeatLoader from "react-spinners/BeatLoader";
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import FlashOnIcon from '@mui/icons-material/FlashOn';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { getComparator, stableSort, useStyles, EnhancedTableHead} from "./AdvTableFunctions"
import { userService } from "../../../services/user.service";

import { WidthFull } from '@mui/icons-material';


export default function AdvTable() {

  let history = useHistory();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

/*--------------------- Initiate IndexedDB Object Store ---------------------*/
  const userDB = indexedDB.userDB;
  const logDB = indexedDB.logDB;
  const recordsDB = indexedDB.recordsDB;
  const transactionalDB = indexedDB.transactionalDB;
  const notificationsDB = indexedDB.notificationsDB;
/*------------------- END Initiate IndexedDB Object Store --------------------*/


/*-------------------- Current User --------------------*/
  const [activeUsername, setActiveUsername] = useState('');  
  const [activeUserCode, setActiveUserCode] = useState('');  
  const [activeUserLanguage, setActiveUserLanguage] = useState('');
  const [activeUserTier, setActiveUserTier] = useState('');  

  const retrieveUser = async () => {

    try {
    
         const userName = await userDB?.currentUser?.get(1);

          setActiveUsername(userName?.name);
          setActiveUserCode(userName?.userCode);
          setActiveUserLanguage(userName?.langugeCod);
          setActiveUserTier(userName?.tierCod)

        } catch (err) {

         // history.push("/register");
          console.log(err);
      }
    };

/*------------------ END Current User ------------------*/


/*---------------- Current Input Values ----------------*/
  const [currentJob, setCurrentJob] = useState('');
  const [currentJobNote, setCurrentJobNote] = useState('');
  const [currentTier, setCurrentTier] = useState(null);
  const [currentSite, setCurrentSite] = useState(null);
  const [manuallyAddedBaleNumber, setManuallyAddedBaleNumber] = useState(''); 
  const [qrScannedBaleNumber, setQrScannedBaleNumber] = useState(''); // ?
  const [rfidScannedBaleList, setRfidScannedBaleList] = useState('');
  const [rfidCounter, setRfidCounter] = useState(0);
  const [selectedPhysicalStatus, setSelectedPhysicalStatus] = useState(1);  
  const [baleNote, setBaleNote] = useState('');  
  const [rfidScanning, setRfidScanning] = useState(false);  

  const [correctionNote, setCorrectionNote] = useState('');  
  const [correctionId, setCorrectionId] = useState('');  
  const [correctionBale, setCorrectionBale] = useState('');  
  const [correctionPhysicalStatus, setCorrectionPhysicalStatus] = useState('');  
/*-------------- END Current Input Values ---------------*/

/*------------- New Tier Creation Variables -------------*/
  const [newTierNameOriginal, setNewTierNameOriginal] = useState('');  
  const [newTierNameReference, setNewTierNameReference] = useState('');  
  const [newTierLevelCode, setNewTierLevelCode] = useState('');  
  const [newTierZip, setNewTierZip] = useState('');  
  const [newTierAdressOriginal, setNewTierAdressOriginal] = useState('');  
  const [newTierAdressReference, setNewTierAdressReference] = useState('');  
  const [newTierLocationOriginal, setNewTierLocationOriginal] = useState('');  
  const [newTierLocationReference, setNewTierLocationReference] = useState('');  

  const [newTierLoading, setNewTierLoading] = useState(false);

/*----------- END New Tier Creation Variables -----------*/


  const [baleConfirmation, setBaleConfirmation] = useState();
  const [baleLoader, setBaleLoader] = useState(true);
  const [qrRetrievedBaleNumber, setQrRetrievedBaleNumber] = useState('');
  const [qrRetrievedDuplicate, setQrRetrievedDuplicate] = useState(false);

/*---------------- View / Render Handlers ---------------*/
  const [userRelatedTier, setUserRelatedTier] = useState([]);
  const [userRelatedSite, setUserRelatedSite] = useState([]);

  const [openManual, setOpenManual] = useState(false); 
  const [openAddTier, setOpenAddTier] = useState(false); 
  const [correctionsOpen, setCorrectionsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [openQR, setOpenQR] = useState(false);
  const [openRFID, setOpenRFID] = useState(false);

  const handleClickOpenRFID = () => {
    setOpenRFID(true);
  };

  const handleClickRFIDClose = () => {
    setOpenRFID(false);
    setRfidScannedBaleList('');
  };

  const handleClickOpenManual = () => {
    setOpenManual(true);
  };

  const handleClickClose = () => {
    setOpenManual(false);
  };

  const handleClickOpenQR = () => {
    setOpenQR(true);
    setQrScanning(true);
  };

  const handleClickQRClose = () => {
    setOpenQR(false);
    setQrScannedBaleNumber('');
  };
/*-------------- END View / Render Handlers --------------*/


/*------------------- Process Handlers -------------------*/
function handleManualInputField(e) {

    const reg = /^[0-9\b]+$/;

    if (e.target.value === '' || reg.test(e.target.value)) {
      setManuallyAddedBaleNumber(e.target.value);
    }
  }

  function handleQRInputField(e) {
    setQrScannedBaleNumber(e.target.value);
  } 

  const [decodedResults, setDecodedResults] = useState();
  const [rfidStart, setRfidStart] = useState(false);
  const [rfidStop, setRfidStop] = useState(false);

  let saved = [];
  let key = 'KeyE';
  
  localStorage.setItem('rfid', JSON.stringify(saved));
  localStorage.setItem('counter', JSON.stringify(0));
    
  const handlerfidScannedBaleList = () => {

      setRfidScanning(true);

      document.addEventListener('keydown', function() {
         
         onkeydown = (e) => {
          key = e.code;

          if (key === 'KeyZ'){ 
            setRfidStop(true);
         }
         
        } 
      })

      transactionalDB.rfid.add({number: key}); 
      
      if (key === 'Enter'){ 

          setRfidCounter(rfidCounter+1);

      }
  }

  const handleRfidScanStop = () => {

    setRfidStop(true);    

  }

/*------------------ END Process Handlers -----------------*/


/*--------------------------------- QR Code Capture Sound ------------------------------*/
  /*
  function playSound(url) {
    const audio = new Audio(url);
    audio.play();
  }

  const [playSound] = useSound('capture.mp3');

  const mySound = require("./capture.mp3");

  const audioPlayer = useRef(null);

  function playAudio() {
    audioPlayer.current.play();
  }
*/
/*------------------------------ END QR Code Capture Sound -----------------------------*/

/*------------------------------- QR Code Event Management -----------------------------*/
  const [qrScanning, setQrScanning] = useState(false);
  const [qrPermission, setQrPermission] = useState(false);

/*--------------------------- QR Scanner Manager --------------------------*/
  const qrScanResult = (decodedText, decodedResult) => {
    console.log("App [result]", decodedResult);
    setQrRetrievedBaleNumber(decodedText); 

    addBales(decodedText, selectedPhysicalStatus, baleNote);
    setBaleLoader(false);

    setTimeout(() => {
      setBaleLoader(true);
    }, 3000);
 };
/*------------------------ END QR Scanner Manager -------------------------*/

/*-------------------------------- Test Click -----------------------------*/

  const initQRScan = () => {

    let cameraPermission = JSON.parse(localStorage.getItem('HTML5_QRCODE_DATA'));
    
    if (cameraPermission?.hasPermission){

      setQrScanning(false);
      setQrPermission(true);
      setBaleLoader(true);
      
    } else {

      setQrScanning(false);
      setQrPermission(false);
      setBaleLoader(false);

    }

  /*
    setQrScanning(false);
    setBaleLoader(false);
  */

  };

  const startQRScan = () => {

    let start = document.getElementById('html5-qrcode-button-camera-start').click();
    setQrScanning(true);
    setBaleLoader(true);
  };

  const stopQRScan = () => {

    let stop = document.getElementById('html5-qrcode-button-camera-stop').click();
    setQrScanning(false);
    setBaleLoader(false);
  };

  const requestQRCameraPermission = () => {

    let request = document.getElementById('html5-qrcode-button-camera-permission').click();
    setQrScanning(false);
    setQrPermission(true);
  };
/*------------------------------ END Test Click ---------------------------*/

/*----------------------------- END QR Code Event Management ---------------------------*/

  const [dense, setDense] = useState(true);

  const { classes } = useStyles();

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const [rows, setRows] = useState([]);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

/*--------------------------------- Save Current JOB ---------------------------------*/
  const handleJobNote = async (note) => {

    try {
        await transactionalDB.assignBales
        .where("transactionID")
        .equals(currentJob)
        .modify({ headerNote: note });

      } catch (err) {
        console.log(err);
      }
    };
/*------------------------------- END Save Current JOB -------------------------------*/

/*--------------------------------- Save Current JOB ---------------------------------*/
  const handleSaveJob = async () => {

    try {
      
        await transactionalDB.assignBales
        .where("transactionID")
        .equals(currentJob)
        .modify({ transactionStatusCode: "1" });

      } catch (err) {
        console.log(err);
      }
      
      toast.success("Job # "+currentJob+" successfully saved!", {duration: 3000});

      setTimeout(() => {

        history.push("/app");

      }, 3000);
    };
/*------------------------------- END Save Current JOB -------------------------------*/

/*--------------------------------- Delete Current JOB -------------------------------*/
  const handleDeleteJob = async () => {

    try {

    const deleteJob = await transactionalDB.assignBales.where('transactionID').equals(currentJob).delete();

      if (deleteJob){

        toast.success("Job # "+currentJob +" successfully deleted!", {duration: 3000});

        setTimeout(() => {
    
          history.push("/app");
    
        }, 3000);

      } else {

        toast.error("Impossible to delete job, please retry!", {duration: 3000});

      }
      
    } catch (err) {
      console.log(err);
    }
  };
/*--------------------------------- Delete Current JOB -------------------------------*/


/*------------------------------------ 00.TABS ---------------------------------------*/
  const [value, setValue] = useState(0);

  const [baleList, setBaleList] = useState(true);
  const [headerNote, setHeaderNote] = useState(false);
  const [actions, setActions] = useState(false);

  
  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 0){

        setBaleList(true);
        setHeaderNote(false);
        setActions(false);

      } else if (newValue === 1) {

        setBaleList(false);
        setHeaderNote(true);
        setActions(false);

    } else {

      setBaleList(false);
      setHeaderNote(false);
      setActions(true);

    }
  }
/*------------------------------------- END TABS -------------------------------------*/


/*----------------------------- 01. New / Resume job logic --------------------------*/
  const currentJOB = async () => {
    try {

      const currentJob = await transactionalDB.assignBales?.get({transactionStatusCode: "0"}) || '';
      const currentJobID = currentJob?.transactionID || '';

      if(currentJobID)
      
      {

      setCurrentJob(currentJobID);
      currentView(currentJobID);

      } else {

        // TEMP

      }
      
    } catch (err) {
      console.log(err);
    }
};
/*----------------------------- END New / Resume job logic --------------------------*/

/*-------------------------- 02. Retrieve current table view ------------------------*/
  const currentView = async (currentJob) => {
    try {
      let updatedStatus = await transactionalDB.assignBales?.get(currentJob); // Populate Bales List with resumed job data

      let updatedBales = updatedStatus?.balesList || [];
      setRows(updatedBales);
      
    } catch (err) {
      console.log("3° ERR");
    }
  };
/*-------------------------- END Retrieve current table view ------------------------*/

  const handleManualInputFieldSaving = () => {

    addBales(manuallyAddedBaleNumber, selectedPhysicalStatus, baleNote);
    
    handleClickClose();
    setManuallyAddedBaleNumber('');
    setSelectedPhysicalStatus(1);
    
  }

/*------------------------- Bales Assignment Table : Action Buttons -------------------------*/
  const handleCorrections = async (id, baleNumber, status, note) => {
          
    setCorrectionId(id);
    setCorrectionBale(baleNumber);
    setCorrectionPhysicalStatus(status);
    setCorrectionNote(note);

    setCorrectionsOpen(!correctionsOpen);

  }

  const applyCorrections = async () => { 

    /*

    try {

    const res = transactionalDB.assignBales
    .where("transactionID")
    .equals(currentJob)
    .and("balesList.id" === 1).toArray()
    .modify({ "balesList.baleNote" : note });

    
    await transactionalDB.assignBales
    .where("props.shoeSize").aboveOrEqual(47)
    .modify({"props.bigfoot": "yes"});

    */

    let id = correctionId;
    let bale = correctionBale;
    let status = correctionPhysicalStatus;
    let note = correctionNote;

    try {

      const currentJOB = await transactionalDB.assignBales?.get(currentJob);

      const currentBales = currentJOB?.balesList;
  
      const length = currentBales.length;
  
/*------ Distinct Bales Validation ------*/

    for (let i=0; i<length; i++){

      if (currentBales[i].id === id){

        currentBales[i].physicalStatus = status;
        currentBales[i].baleNote = note;

      }
    }

    await transactionalDB.assignBales
      .where("transactionID")
      .equals(currentJob)
      .modify({ balesList: currentBales }); 

    handleChange('', 0); // Activate "Bales List" Tab

    updateView();

    setCorrectionsOpen(false);

  } catch (err) {
    console.log(err); // LogDB
   }

  }
/*----------------------- END Bales Assignment Table : Action Buttons -----------------------*/

/*------------------------- Bales Assignment Table : Action Buttons -------------------------*/
  const handleDelete = async (id, baleNumber, status, note) => {

    setCorrectionId(id);
    setCorrectionBale(baleNumber);
    setCorrectionPhysicalStatus(status);
    setCorrectionNote(note);

    setDeleteOpen(!deleteOpen);
  }

  const applyDelete = async () => { 

    let id = correctionId;
    let bale = correctionBale;
    let status = correctionPhysicalStatus;
    let note = correctionNote;

    try {

    const currentJOB = await transactionalDB.assignBales?.get(currentJob);

    const currentBales = currentJOB?.balesList;

    const length = currentBales.length;

  /*------ Distinct Bales Validation ------*/

    let newBales = [];
    
    for (let i=0; i<length; i++){

      if (currentBales[i].id !== id){

          newBales = [...newBales, currentBales[i]];

      }
    }

    for (let j=0; j<newBales.length; j++){

      newBales[j].id = j+1

    }

    await transactionalDB.assignBales
      .where("transactionID")
      .equals(currentJob)
      .modify({ balesList: newBales}); 

    handleChange('', 0); // Activate "Bales List" Tab

    updateView();

    setDeleteOpen(false);

  } catch (err) {
    console.log(err); // LogDB
  }

  }
/*----------------------- END Bales Assignment Table : Action Buttons -----------------------*/


/*----------------------------- User-related Tiers Init -----------------------------*/
  const userRelatedTierInit = async () => {
    
    try {

      const urTiers = await userDB?.userRelatedTier?.toArray() || '';

      let urTiersPopulated = [];

      for (let i=0; i< urTiers.length; i++){

        urTiersPopulated[i] = {

          value: urTiers[i].userCode, 
          label: urTiers[i].nameReference // ?

        }

      }

      setUserRelatedTier(urTiersPopulated);
    
    } catch (err) {
      console.log(err); // LogDB
    }
  };
/*--------------------------- END User-related Tiers Init ---------------------------*/

/*----------------------------- User-related Sites Init -----------------------------*/
  const userRelatedSitesInit = async () => {
    
    try {

      const urSites = await userDB?.userRelatedSite?.toArray() || '';

      let urSitesPopulated = [];

      for (let i=0; i< urSites.length; i++){

        urSitesPopulated[i] = {

          value: urSites[i].locationCode, 
          label: urSites[i].locationCode 

        }

      }

      setUserRelatedSite(urSitesPopulated);
    
    } catch (err) {
      console.log(err); // LogDB
    }
  };
/*--------------------------- END User-related Sites Init ---------------------------*/


/*----------------------------- 03. Select Recipient Tier ---------------------------*/
  const selectTier = async (selectedTierCode) => {

    setCurrentTier(selectedTierCode);

    await transactionalDB.assignBales
      .where("transactionID")
      .equals(currentJob)
      .modify({ tierCode: selectedTierCode.value });
      
  };
/*----------------------------- END Select Recipient Tier ---------------------------*/

/*----------------------------- 03. Select Recipient Tier ---------------------------*/
  const selectSite = async (selectedSiteCode) => {

    setCurrentSite(selectedSiteCode);

    await transactionalDB.assignBales
      .where("transactionID")
      .equals(currentJob)
      .modify({ siteCode: selectedSiteCode.value });
      
  };
/*----------------------------- END Select Recipient Tier ---------------------------*/

/*-------------------------- 04. User Created Tier + Site ---------------------------*/
  const createTier = async (activeUserCode, newTierNameOriginal, newTierNameReference, newTierLevelCode, newTierZip, newTierAdressOriginal, newTierAdressReference, newTierLocationOriginal, newTierLocationReference) => {

    setNewTierLoading(true);

    try {

      let res = await userService.createTier(activeUserCode, newTierNameOriginal, newTierNameReference, newTierLevelCode, newTierZip, newTierAdressOriginal, newTierAdressReference, newTierLocationOriginal, newTierLocationReference);
    
    /*---------- Request Error ----------*/
      if (res.error) {
        
          console.log(res.error); // LogDB
    /*---------- END Request Error ----------*/

      } else if (res.data){

        resyncTier(activeUserCode);

      } else {
      /*---------- Endpoint Response Error ----------*/

        toast.error("Impossible to create Tier!", {duration: 3000}); // LogDB

      /*-------- END Endpoint Response Error --------*/
      } 

    } catch (err) {
    /*---------- NodeJS Server Request Error ----------*/

      console.log(err); // LogDB

    /*-------- END NodeJS Server Request Error --------*/
  }
    
};
/*-------------------------- END User Created Tier + Site ---------------------------*/

/*---------------------------------- Resync User Tier -------------------------------*/
  const resyncTier = async (activeUserCode) => {

    try {

      let res = await userService.userRelatedTier(activeUserCode);
    
    /*---------- Request Error ----------*/
      if (res.error) {
        
          console.log(res.error); // LogDB
    /*---------- END Request Error ----------*/

      } else if (res.data){

      try {

        let clear = await userDB.userRelatedTier.clear();
        getTier(activeUserCode);

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
/*-------------------------------- END Resync User Tier -----------------------------*/

/*---------------------------------- Resync User Tier -------------------------------*/
  const resyncSite = async (activeUserCode) => {

    try {

      let res = await userService.userRelatedSite(activeUserCode);
    
    /*---------- Request Error ----------*/
      if (res.error) {
        
          console.log(res.error); // LogDB
    /*---------- END Request Error ----------*/

      } else if (res.data){

      try {

        let clear = await userDB.userRelatedSite.clear();
        getSite(activeUserCode);

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
/*-------------------------------- END Resync User Sites ----------------------------*/

/*-------------------- 02. GET User Related Tier Sructure Creation ------------------*/
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

            userRelatedTierInit();

            resyncSite();
          
          /*---------- IndexedDB Writing Error ----------*/
          }).catch (function (err) { // LogDB
          
            console.log(err);
          /*-------- END IndexedDB Writing Error --------*/
        });

        // getSite(code);

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
/*-------------------- END GET User Related Tier Sructure Creation ------------------*/

/*-------------------- 02. GET User Related Tier Sructure Creation ------------------*/
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

            userRelatedSitesInit();

            setNewTierLoading(false);

            setOpenAddTier(false);

            toast.success("New Tier Successfully Created", 3000);

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
/*-------------------- END GET User Related Tier Sructure Creation ------------------*/

/*------------------- 03. Manually Add New Bales current table view -----------------*/
  const addBales = async (manuallyAddedBaleNumber, selectedPhysicalStatus, baleNote) => {
      const currentStatus = await transactionalDB.assignBales?.get(currentJob);

      const currentBales = currentStatus?.balesList;

      const length = currentBales.length;

      let duplicates = false; 


      /*------ Distinct Bales Validation ------*/

      for (let i=0; i<length; i++){

        if (currentBales[i].baleNumber === manuallyAddedBaleNumber){ duplicates = true };

      }

        if (duplicates){

          setQrRetrievedDuplicate(true);

        } else {

          let currentCount = currentBales[currentBales?.length-1]?.id || 0;

          currentBales.push({ id: currentCount+1, baleNumber: manuallyAddedBaleNumber, baleNote: baleNote, physicalStatus: selectedPhysicalStatus });
      
          await transactionalDB.assignBales
            .where("transactionID")
            .equals(currentJob)
            .modify({ balesList: currentBales }); 
      
          handleChange('', 0); // Activate "Bales List" Tab

          setQrRetrievedDuplicate(false);
      
          updateView();
      }

      /*---- END Distinct Bales Validation ----*/
        
    };
/*------------------- END Manually Add New Bales current table view -----------------*/

/*------------------------ XY. Update table view with new bales ---------------------*/
  const updateView = async () => {
    try {
      let updatedStatus = await transactionalDB.assignBales?.get(currentJob);

      let updatedBales = updatedStatus?.balesList || [];
      setRows(updatedBales);

    } catch (err) {
      console.log("3° ERR");
    }
  };
/*------------------------ END Update table view with new bales ---------------------*/

  const customStyles = {
    option: (defaultStyles, state) => ({

      ...defaultStyles,
      color: state.isSelected ? "#1c7e76" : "#9f5a47",
   // backgroundColor: state.isSelected ? "#ffffff" : "#ffffff",
      backgroundColor: state.onHover ? "#ffffff" : "#ffffff",
      textColor: state.isSelected ? "#1c7e76" : "#9f5a47",
      borderColor: '#9f5a47',
      boxShadow: "none"
    }),

    control: (defaultStyles, state) => ({
      ...defaultStyles,
      backgroundColor: '#ffffff',
      color: '#9f5a47',
      padding: "",
      boxShadow: "none",
      borderColor: state.isFocused ? '#9f5a47' : '#9f5a47',
      textColor: '#9f5a47',
      borderBottomLeftRadius: '0',
      borderTopLeftRadius: '0'
    }),
  
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "" }),
  };

/*---------------------------------- XY. onLoad Logic -------------------------------*/
  useEffect(() => {

    retrieveUser();
    currentJOB();
    userRelatedTierInit();
    userRelatedSitesInit();
    initQRScan();

  }, []);

/*---------------------------------- END onLoad Logic -------------------------------*/


  return (
    
    <div className={classes.root}>
    <Toaster position="top-center" reverseOrder="false"/>
     <Grid name="Accordion" xs={12} item textAlign="left" mt={2}>
      <Accordion style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}} defaultExpanded={true} disableGutters > 
          <AccordionSummary className={classes.accordionSummary} 
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
          <Grid container alignItems='center'>
              <Grid xs={2} item textAlign="left" marginLeft={-2.5}>
                  <Button variant="text" onClick={()=> setOpenAddTier(true)}>
                    <GroupAddIcon />
                  </Button>
              </Grid>

              <Dialog id= "new-tier"
                  fullScreen={fullScreen}
                  open={openAddTier}
                  onClose={()=> setOpenAddTier(false)}
                  aria-labelledby="responsive-dialog-title"
                >
                <DialogTitle id="responsive-dialog-title">
                  <GroupAddIcon /> Add Tier          
                </DialogTitle>

                <DialogContent>
                <Box>
                    <Grid container alignItems='center'>
                      <Grid item xs={12} mt={2} mb={2}>
                        <TextField required id="name" label="Name" value={newTierNameOriginal} onChange={(e)=> setNewTierNameOriginal(e.target.value)} fullWidth/>
                      </Grid>
                      <Grid item xs={12} mt={2} mb={2}>
                        <TextField id="name-reference" label="Reference" value={newTierNameReference} onChange={(e)=> setNewTierNameReference(e.target.value)} fullWidth/>
                      </Grid>
                      <Grid container alignItems='center' mt={2} mb={2}>
                        <Grid item xs={12} textAlign='center' mb={1}>
                            <Typography color="primary">Tier Level</Typography>
                          </Grid>
                          <Select value={newTierLevelCode} textAlign='center' placeholder='...' fullWidth>
                            <MenuItem value={0} onClick={()=> setNewTierLevelCode(0)}>LORO PIANA</MenuItem>
                            <MenuItem value={1} onClick={()=> setNewTierLevelCode(1)}>{activeUserLanguage === 'E'? 'TRUSTER TRADER' : 'ИТГЭЛТЭЙ ХУДАЛДААЧ'}</MenuItem>
                            <MenuItem value={2} onClick={()=> setNewTierLevelCode(2)}>{activeUserLanguage === 'E'? 'HERDER COOPERATIVE' : 'МАЛЧИН ХОГОЛДОЛ'}</MenuItem>
                            <MenuItem value={3} onClick={()=> setNewTierLevelCode(3)}>{activeUserLanguage === 'E'? 'HERDER FAMILY' : 'МАЛЧИН ГЭР БҮЛ'}</MenuItem>
                          </Select>
                        </Grid> 
                    </Grid>

                    <Grid container alignItems='center' mt={2} mb={2}>
                       <img src={HBar} width='100%'/>
                    </Grid>

                    <Grid container alignItems='center'>
                      <Grid item xs={12} mt={2} mb={2}>
                        <TextField required id="zip-code" label="Zip Code" value={newTierZip} onChange={(e)=> setNewTierZip(e.target.value)} fullWidth/>
                      </Grid>
                      <Grid item xs={12} mt={2} mb={2}>
                        <TextField required id="address" label="Address" value={newTierAdressOriginal} onChange={(e)=> setNewTierAdressOriginal(e.target.value)} fullWidth/>
                      </Grid>
                      <Grid item xs={12} mt={2} mb={2}>
                        <TextField id="address-reference" label="Address Reference" value={newTierAdressReference} onChange={(e)=> setNewTierAdressReference(e.target.value)} fullWidth/>
                      </Grid>
                      <Grid item xs={12} mt={2} mb={2}>
                        <TextField required id="location" label="Location" value={newTierLocationOriginal} onChange={(e)=> setNewTierLocationOriginal(e.target.value)} fullWidth/>
                      </Grid>
                      <Grid item xs={12} mt={2} mb={2}>
                        <TextField required id="location-reference" label="Location Reference" value={newTierLocationReference} onChange={(e)=> setNewTierLocationReference(e.target.value)} fullWidth/>
                      </Grid>
                    </Grid>

                  </Box>
                </DialogContent>

                <DialogActions>
                      <Button autoFocus onClick={()=> setOpenAddTier(false)}>
                        Close
                      </Button>
                      <Button onClick={()=> createTier(activeUserCode, newTierNameOriginal, newTierNameReference, newTierLevelCode, newTierZip, newTierAdressOriginal, newTierAdressReference, newTierLocationOriginal, newTierLocationReference)}>
                        <BeatLoader color={'#9f5a47'} loading={newTierLoading}/>
                         { !newTierLoading && ( 
                          <Typography> Add Tier </Typography>
                          )}
                      </Button>
                </DialogActions>
              </Dialog>

              <Grid xs={10} item textAlign="center">
                <Typography>Tier Data</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>

            <Grid container alignItems='center'>
             {/*
              <Grid item xs={12} mt={2} mb={1} textAlign='left'>
       
              <Autocomplete
                onChange={(e)=> setCurrentTier(e.target.value)}
                disablePortal
                size="small"
                id=""
                options={TT}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} >
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => <TextField {...params} label="Tier" value='T2-1' />}
              />             
              </Grid> 

              <Grid item xs={12} mt={1} mb={1} textAlign='left'>
              <Autocomplete
                onSelect={(e)=> setCurrentSite(e.target.value)}
                disablePortal
                size="small"
                id=""
                options={TS}
                // sx={{''}}
                renderInput={(params) => <TextField {...params} label="Site" />}
              />             
              </Grid>

              */}

                {/* TIER SELECTOR */}
                  <Grid container alignItems='center'>
                    <Grid item xs={1} mt={1} textAlign='center' height='4.5vh' sx={{backgroundColor: '#9f5a47', borderBottomLeftRadius: 5, borderTopLeftRadius: 5}}>
                      <PersonIcon sx={{ color: 'white', mt: 1, fontSize: 'small'}} />
                    </Grid>
                    <Grid item xs={11} mt={1}>
                      <CustomSelect label='smt'
                          defaultValue={currentTier}
                          onChange={(e)=>selectTier(e)}
                          options={userRelatedTier}
                          isSearchable
                          styles={customStyles}
                          alwaysDisplayPlaceholder='Tier'
                        />
                      </Grid>
                  </Grid>

                  {/* SITE SELECTOR */}
                  <Grid container alignItems='center'>
                    <Grid item xs={1} mt={2} textAlign='center' height='4.5vh' sx={{backgroundColor: '#9f5a47', borderBottomLeftRadius: 5, borderTopLeftRadius: 5}}>
                      <LocationOnIcon sx={{ color: 'white', mt: 1, fontSize: 'small'}} />
                    </Grid>
                    <Grid item xs={11} mt={2}>
                      <CustomSelect label='smt'
                          defaultValue={currentSite}
                          onChange={(e)=>selectSite(e)}
                          options={userRelatedSite}
                          isSearchable
                          styles={customStyles}
                          alwaysDisplayPlaceholder='Tier'
                        />
                      </Grid>
                  </Grid>

            </Grid>

          </AccordionDetails>
        </Accordion>
      </Grid>

     <Grid name="Table" xs={12} item textAlign="left" mt={2} mb='16vh'>
        <Paper className={classes.root}>
        <Tabs className={classes.tabs}
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
          <Tab label="BALE LIST"/>
              <Tab label="HEADER NOTE" style={{marginLeft: '1rem', marginRight: '1rem'}}/>
              <Tab label= {<PausePresentationIcon />} />
          </Tabs>  

          { baleList && ( // ASSIGNMENT TABLE
          <>
          <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={dense? 'small' : 'medium'}
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {  stableSort(rows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            tabIndex={-1}
                            key={row.id}
                          >

                            <TableCell component="th" id={labelId} scope="row" padding="none" align='center' size='small' color='primary' style={{fontSize: '16px'}}>
                              {row.id}
                            </TableCell>
                            <TableCell align="left" size='small' style={{fontSize: '16px'}}>{row.baleNumber}</TableCell>
                            <TableCell align="center" size='small' style={{fontSize: '16px'}}><BorderColorIcon onClick={()=> handleCorrections(row.id, row.baleNumber, row.physicalStatus, row.baleNote)} style={{color: '#494a4c', marginRight: '.7rem'}}/> <DeleteIcon style={{color: '#494a4c', marginLeft: '.5rem'}} onClick={()=> handleDelete(row.id, row.baleNumber, row.physicalStatus, row.baleNote)} /> </TableCell>

                            <Dialog id="corrections-dialog"
                                sx={{ '& .MuiDialog-paper': { width: '90%', height: '70%' } }}
                                maxWidth="xs"
                                open={correctionsOpen}
                                >
                                <DialogTitle><BorderColorIcon /> Corrections</DialogTitle>

                                <DialogContent dividers id="correction">

                                <Box style={{ width: '100%'}}>
                                                    
                                    <Grid container alignItems='center' mt={2} mb={2}>
                                    <Grid item xs={12} textAlign='left' mb={1}>
                                        <Typography color="primary">Bale Number</Typography>
                                    </Grid>
                                    {/* 1 */}
                                      <Grid item xs={12} marginBottom={1}>
                                        <TextField variant="outlined" type="number" value={correctionBale} fullWidth disabled/>
                                      </Grid> 
                                    </Grid> 

                                    {/* Physical Status (Manually Add) */}

                                    <Grid container alignItems='center' mt={2} mb={2}>
                                      {/* 2 */}
                                      <Grid container alignItems='center' marginBottom={1}>
                                      <Grid item xs={12} textAlign='left' mb={1}>
                                            <Typography color="primary">Physical Status</Typography>
                                        </Grid>
                                        <Select value={correctionPhysicalStatus} fullWidth>
                                          <MenuItem value={1} onClick={()=> setCorrectionPhysicalStatus(1)}>OK</MenuItem>
                                          <MenuItem value={2} onClick={()=> setCorrectionPhysicalStatus(2)}>Broken</MenuItem>
                                          <MenuItem value={3} onClick={()=> setCorrectionPhysicalStatus(3)}>QR Code not visible</MenuItem>
                                          <MenuItem value={4} onClick={()=> setCorrectionPhysicalStatus(4)}>RFID Broken</MenuItem>
                                        </Select>
                                        </Grid> 
                                    </Grid> 

                                    <Grid container alignItems='center' mt={2} mb={2}>
                                      {/* 3 */}
                                      <Grid container alignItems='center' mb={1}>
                                        <Grid item xs={12} textAlign='left' mb={1}>
                                            <Typography color="primary">Bale Notes</Typography>
                                        </Grid>
                                        <TextField fullWidth multiline rows={2} id="bale-note" value={correctionNote} onChange={(e)=> setCorrectionNote(e.target.value)}/>
                                      </Grid> 
                                    </Grid> 

                                </Box>
                              </DialogContent>

                                <DialogActions>
                                      <Button autoFocus onClick={()=>setCorrectionsOpen(!correctionsOpen)}>
                                        Close
                                      </Button>
                                      <Button onClick={() => applyCorrections(correctionId, correctionNote)}>
                                        Apply
                                      </Button>
                                </DialogActions>
                            </Dialog>

                            <Dialog id="delete-dialog"
                                sx={{ '& .MuiDialog-paper': { width: '90%', height: '30%' } }} open={deleteOpen} >

                                <DialogContent dividers id="correction">
                                <Box style={{ width: '100%'}}>
                                    <Grid container alignItems='center' mt={8}>
                                      <Grid item xs={2} textAlign='center'>
                                          <ErrorOutlineIcon sx={{fontSize: '6vh', color: '#494a4c'}} />
                                      </Grid>

                                      <Grid item xs={10} textAlign='center'>
                                          <Typography color="primary" fontSize='2vh'>
                                              Are you sure you want to remove bale # <strong>{correctionBale}</strong> ?
                                          </Typography>
                                      </Grid>

                                    </Grid> 
                                </Box>
                              </DialogContent>

                                <DialogActions>
                                      <Button autoFocus onClick={()=>setDeleteOpen(false)}>
                                        Close
                                      </Button>
                                      <Button onClick={() => applyDelete()}>
                                        Delete
                                      </Button>
                                </DialogActions>
                            </Dialog>


                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: (dense ? 27 : 53) * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination sx={{mt: '-1rem'}}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
          </>
          )}

         { headerNote && ( // ASSIGNMENT TABLE
          <>

          <Paper>
            <Grid container alignItems='center'>
              <Grid item xs={12} textAlign='center' m={5}>
                 <TextField multiline rows={6} id="header-note" fullWidth value={currentJobNote} onChange={(e)=>{ setCurrentJobNote(e.target.value); handleJobNote(e.target.value); }}/>
               </Grid>
            </Grid>
          </Paper>

          </>
          )}

          { actions && ( // ASSIGNMENT TABLE
          <>
          <Paper>
            <Grid container alignItems='top'>
              <Grid item xs={4} textAlign='center' mt={3}>
                <Button variant='text' onClick={()=> handleSaveJob()}>
                    <SaveIcon sx={{fontSize: '10vh', color: '#9f5a47'}}/>   
                </Button>              
               </Grid>

               <Grid item xs={8} textAlign='left' mt={4} ml={-1}>
                 <Typography variant='h4'color='#9f5a47' fontFamily='EB Garamond Variable'>SAVE JOB</Typography> 
                  <img src={HBar} width='30%' style={{marginTop: '-1rem'}}/>
                 <Typography color='#494a4c' fontFamily='EB Garamond Variable' style={{marginTop: '-1rem'}}>Once saved it can not be modified!</Typography>                               
               </Grid>
              </Grid>

               <Grid item xs={12} textAlign='center' sx={{margin: 1}}>
                 <img src={HBar} width='90%'/>
               </Grid>

               <Grid container sx={{alignItems: 'top'}}>
                <Grid item xs={4} textAlign='center' mt={-1} mb={3}>
                  <Button variant='text' onClick={()=> handleDeleteJob()}>
                    <DeleteIcon sx={{fontSize: '10vh', color: '#494a4c'}}/>  
                  </Button>               
                </Grid>
                <Grid item xs={8} textAlign='left' ml={-1} mb={2}>
                  <Typography variant='h4'color='#494a4c' fontFamily='EB Garamond Variable'>DELETE JOB</Typography> 
                    <img src={HBar} width='30%' style={{marginTop: '-1rem'}}/>
                  <Typography color='#494a4c' fontFamily='EB Garamond Variable' style={{marginTop: '-1rem'}}>Permanently delete current job!</Typography>                               
                </Grid>
            </Grid>
          </Paper>
          </>
          )}

        </Paper>
      </Grid>
  

{ /*------------------------------------- ACTION BUTTONS -------------------------------------*/ }
        <Toolbar style={{position: "fixed", bottom: 50,  width: '100%', height: '12vh', backgroundColor: '#9f5a47', borderRadius: 0}}>
          <Grid container spacing={2}>

            {/* ACTION BUTTON 1 */}
            <Grid item xs={4} style={{alignItems: 'left', marginLeft: '-1.8vh'}}>
              {/* MANUALLY ADD BALES */}
                <Button className={classes.actionButtons} onClick={handleClickOpenManual} style={{backgroundColor: '#f5f5f5'}}>
                  <Grid container style={{alignItems: 'center'}}>
                      <Grid item xs={12} textAlign='center'>
                        <PlaylistAddIcon sx={{fontSize: '5vh'}} />
                      </Grid>
                  </Grid>
                </Button>

                <Dialog
                  fullScreen={fullScreen}
                  open={openManual}
                  onClose={handleClickClose}
                  aria-labelledby="responsive-dialog-title"
                        >
                <DialogTitle id="responsive-dialog-title">
                   <PlaylistAddIcon /> Manually Add Bales          
                </DialogTitle>

                <DialogContent>
                  <Box style={{ height: '80%', width: '100%'}}>
                                      
                      <Grid container alignItems='center' mt={2} mb={2}>
                      <Grid item xs={12} textAlign='left' mb={1}>
                          <Typography color="primary">Bale Number</Typography>
                      </Grid>
                      {/* 1 */}
                        <Grid item xs={12} marginBottom={1}>
                           <TextField variant="outlined" inputProps={{ maxLength: 7}} value={manuallyAddedBaleNumber} onChange={(e) => handleManualInputField(e)} fullWidth />
                        </Grid> 
                      </Grid> 

                      {/* Physical Status (Manually Add) */}

                      <Grid container alignItems='center' mt={2} mb={2}>
                        {/* 2 */}
                        <Grid container alignItems='center' marginBottom={1}>
                        <Grid item xs={12} textAlign='left' mb={1}>
                              <Typography color="primary">Physical Status</Typography>
                          </Grid>
                          <Select value={selectedPhysicalStatus} fullWidth>
                            <MenuItem value={1} onClick={()=> setSelectedPhysicalStatus(1)}>OK</MenuItem>
                            <MenuItem value={2} onClick={()=> setSelectedPhysicalStatus(2)}>Broken</MenuItem>
                            <MenuItem value={3} onClick={()=> setSelectedPhysicalStatus(3)}>QR Code not visible</MenuItem>
                            <MenuItem value={4} onClick={()=> setSelectedPhysicalStatus(4)}>RFID Broken</MenuItem>
                          </Select>
                          </Grid> 
                      </Grid> 

                      <Grid container alignItems='center' mt={2} mb={2}>
                        {/* 3 */}
                        <Grid container alignItems='center' mb={1}>
                          <Grid item xs={12} textAlign='left' mb={1}>
                              <Typography color="primary">Bale Notes</Typography>
                          </Grid>
                           <TextField fullWidth multiline rows={4} id="bale-note" value={baleNote} onChange={(e)=> setBaleNote(e.target.value)}/>
                        </Grid> 
                      </Grid> 

                      <Grid container alignItems='left' marginBottom={1}>
                        <Button variant="outlined" fullWidth onClick={() => handleManualInputFieldSaving()} disabled={(manuallyAddedBaleNumber.length != 7 || isNaN(manuallyAddedBaleNumber))}> 
                           <SaveIcon />
                        </Button>
                      </Grid> 

                  </Box>
                </DialogContent>

                <DialogActions>
                  <Button variant="outlined" onClick={handleClickClose} autoFocus>
                    <ExitToAppIcon />
                  </Button>
                </DialogActions>
              </Dialog>

              {/* END MANUALLY ADD BALES */}
            </Grid>

            {/* ACTION BUTTON 2 */}
            <Grid item xs={4} style={{alignItems: 'center', marginLeft: '0.4vh'}}>
                <Button className={classes.actionButtons} onClick={handleClickOpenQR} style={{backgroundColor: '#f5f5f5'}}>
                  <Grid container style={{alignItems: 'center'}}>
                      <Grid item xs={12} textAlign='center'>
                        <QrCodeIcon sx={{fontSize: '5vh'}} />
                      </Grid>
                  </Grid>
                </Button>

                {/* QR SCANNER */}

                <Dialog
                  fullScreen={fullScreen}
                  open={openQR}
                  onClose={handleClickQRClose}
                  aria-labelledby="qr-dialog"
                        >
                <DialogTitle id="qr-dialog">
                   <QrCodeIcon /> QR Code Scanner          
                </DialogTitle>

                <DialogContent>
                  <Box>
                    <Grid container alignItems='center' mb={2}>
                    {/* QR Scanner Component */}
                      <Grid item xs={12} textAlign='center'>
                          <Html5QrcodePlugin fps={1} aspectRatio={0.75} disableFlip={false} qrCodeSuccessCallback={qrScanResult}/>
                      </Grid> 
                    </Grid>  

                      {/* Camera Buttons */}
                      <Grid container alignItems='left' mt={1} mb={1}>
                        <Grid item xs={2} textAlign='left'>
                          { !qrPermission && (
                           <Button variant="contained" style={{backgroundColor: '#9f5a47', borderRadius: 5}} onClick={() => requestQRCameraPermission()} disableElevation>
                              <MobileFriendlyIcon style={{fontSize: 25, color: '#ffffff'}}/> 
                           </Button>
                          )}

                          { qrPermission && (
                           <Button variant="contained" style={{backgroundColor: '#f4f4f4', borderRadius: 5}} disableElevation>
                              <MobileFriendlyIcon style={{fontSize: 25, color: '#9f5a47'}}/> 
                           </Button>
                          )}
                        </Grid>

                        <Grid item xs={8} textAlign='center'>

                        <>

                        { qrScanning && (
                           <Button variant="contained" style={{backgroundColor: '#494a4c', borderRadius: 5, width: '90%'}} onClick={() => stopQRScan()} disabled={!qrPermission} disableElevation >Stop</Button>
                        )}
                          
                        { !qrScanning && (
                           <Button variant="contained" style={{backgroundColor: '#9f5a47', borderRadius: 5, width: '90%'}} onClick={() => startQRScan()} disabled={!qrPermission} disableElevation>Start</Button>
                        )}   

                        </>                
                      
                        </Grid>

                        <Grid item xs={2} textAlign='right'>
                           <Button variant="contained" style={{backgroundColor: '#f4f4f4', borderRadius: 5}} disableElevation>
                              <FlashOnIcon style={{fontSize: 25, color: '#9f5a47'}} />
                           </Button>
                        </Grid>
                      </Grid>

                      <Grid container alignItems='center' mt={2} mb={2}>
                      {/* 2: Scanned Bale Confirmation */}
                        <Grid item xs={12} textAlign='center'>
                          <img src={HBar} />
                          <BeatLoader color={'#9f5a47'} loading={baleLoader}/>
                          {(!baleLoader && qrScanning && qrPermission) && (
                          <>
                            <Typography fontSize='18px' mb={1} display={!qrRetrievedDuplicate ? 'block' : 'none'}> Bale #<strong>{qrRetrievedBaleNumber}</strong> Scanned!</Typography>
                            <Typography fontSize='18px' mb={1} display={qrRetrievedDuplicate ? 'block' : 'none'}> Bale #<strong>{qrRetrievedBaleNumber}</strong> already exists!</Typography>
                          </>
                          )}

                          {(!baleLoader && !qrScanning && qrPermission) && (
                          <>
                            <Typography fontSize='18px' color='primary' mb={1}>Ready to scan!</Typography>
                          </>
                          )}

                          {(!qrPermission) && (
                          <>
                            <Typography fontSize='18px' color='primary' mb={1}>Please accept camera permission request!</Typography>
                          </>
                          )}

                          <img src={HBar}/>
                        </Grid> 
                      </Grid>  

                       <Grid container alignItems='center' mt={2} mb={2}>
                        {/* 2 */}
                        <Grid container alignItems='center' marginBottom={1}>
                        <Grid item xs={12} textAlign='left' mb={1}>
                              <Typography color="primary">Physical Status</Typography>
                          </Grid>
                          <Select value={selectedPhysicalStatus} fullWidth>
                            <MenuItem value={1} onClick={()=> setSelectedPhysicalStatus(1)}>OK</MenuItem>
                            <MenuItem value={2} onClick={()=> setSelectedPhysicalStatus(2)}>Broken</MenuItem>
                            <MenuItem value={3} onClick={()=> setSelectedPhysicalStatus(3)}>QR Code not visible</MenuItem>
                            <MenuItem value={4} onClick={()=> setSelectedPhysicalStatus(4)}>RFID Broken</MenuItem>
                          </Select>
                          </Grid> 
                      </Grid>     

                      <Grid container alignItems='center' mt={2} mb={2}>
                        <Grid container alignItems='center' mb={1}>
                          <Grid item xs={12} textAlign='left' mb={1}>
                              <Typography color="primary">Bale Notes</Typography>
                          </Grid>
                          <TextField fullWidth multiline rows={2} id="bale-note" value={baleNote} onChange={(e)=> setBaleNote(e.target.value)}/>
                        </Grid>                
                      </Grid>     
                  </Box>
                </DialogContent>

                <DialogActions>
                  <Button variant="outlined" onClick={handleClickQRClose} autoFocus>
                    <ExitToAppIcon />
                  </Button>
                </DialogActions>
              </Dialog>

              {/* QR SCANNER */}

            </Grid>

            {/* ACTION BUTTON 3*/}
            <Grid item xs={4} style={{alignItems: 'right', marginLeft: '0.4vh'}}>
               <Button className={classes.actionButtons} onClick={handleClickOpenRFID} style={{backgroundColor: '#f5f5f5'}}>
                  <Grid container style={{alignItems: 'right'}}>
                      <Grid item xs={12} textAlign='center'>
                        <PodcastsIcon sx={{fontSize: '5vh'}} />
                      </Grid>
                  </Grid>
               </Button>

                {/* RFID SCANNER */}

                <Dialog id="rfid-dialog"
                  fullScreen={fullScreen}
                  open={openRFID}
                  onClose={handleClickRFIDClose}
                  aria-labelledby="responsive-dialog-title"
                        >
                <DialogTitle id="responsive-dialog-title">
                  RFID Scanner          
                </DialogTitle>

                <DialogContent>

                { !rfidStop && (

                  <Box>
                    <Grid container alignItems='center' mt={2} mb={3}>
                      {/* 0 */}
                      <Grid item xs={12} sx={{backgroundColor: ' #f6f2e0', borderTopLeftRadius: 5, borderTopRightRadius: 5}} textAlign='center'> 
                         <ReadMoreIcon style= {{color: '#9f5a47'}} />
                          </Grid>
                        <Grid item xs={12} sx={{height: '20vh', backgroundColor: '#9f5a47', borderBottomLeftRadius: 5, borderBottomRightRadius: 5}} textAlign='center'> 
                            <Typography color='white' fontSize='12vh' mt={1.4} sx={{opacity: .4}}><strong> {rfidCounter}</strong></Typography>
                          </Grid>
                      </Grid>  
                  
                      <Grid container alignItems='center' mt={2} mb={2}>
                      {/* 1 */}
                        <Grid container alignItems='center' marginBottom={1}>
                             <TextField multiline rows={2} id="rfid" label="Bale List" variant="outlined" onChange={handlerfidScannedBaleList} fullWidth/> {/*value={rfidScannedBaleList} onChange={(e) => handlerfidScannedBaleList(e.target.code)} */}
                        </Grid> 
                      </Grid>  
                      

                       <Grid container alignItems='center' mt={2} mb={2}>
                          {/* 2 */}
                          <Grid container alignItems='center' marginBottom={1}>
                          <Grid item xs={12} textAlign='left' mb={1}>
                                <Typography color="primary">Physical Status</Typography>
                            </Grid>
                            <Select value={1} fullWidth>
                              <MenuItem value={1} onClick={()=> setSelectedPhysicalStatus(1)}>OK</MenuItem>
                              <MenuItem value={2} onClick={()=> setSelectedPhysicalStatus(2)}>Broken</MenuItem>
                              <MenuItem value={3} onClick={()=> setSelectedPhysicalStatus(3)}>QR Code not visible</MenuItem>
                              <MenuItem value={4} onClick={()=> setSelectedPhysicalStatus(4)}>RFID Broken</MenuItem>
                            </Select>
                            </Grid> 
                        </Grid>  
 
                      <Grid container align='center' mt={5}>
                        {/*
                         <Grid item xs={12} sx={{height: '3rem', backgroundColor: '#f6f2e0', borderRadius: 1}} textAlign='center'>
                           <Grid item xs={12} style={{marginTop: '1rem'}}> 
                        */}
                         <Grid item xs={12}> 
                             <BeatLoader color={'#9f5a47'} loading={rfidScanning} style={{mt: '1rem'}}/>
                             { !rfidScanning && (
                               <Typography color='#9f5a47'><strong>Ready to scan!</strong></Typography>  
                             )}
                          </Grid>  
                      </Grid>
                  </Box>

                )}

                { rfidStop && (
                  
                  <Box>
                    <Grid container alignItems='center' mt={2} mb={3}>
                      {/* 0 */}
                      <Grid item xs={12} sx={{backgroundColor: ' #f6f2e0', borderTopLeftRadius: 5, borderTopRightRadius: 5}} textAlign='center'> 
                         <ReadMoreIcon style= {{color: '#9f5a47'}} />
                          </Grid>

                        <Grid item xs={12} sx={{height: '20vh', backgroundColor: '#9f5a47', border: 'none'}} textAlign='center'> 
                            <Typography color='white' fontSize='12vh' mt={1.4} sx={{opacity: .4}}><strong> {rfidCounter}</strong></Typography>
                          </Grid>
                      </Grid>  
                  
                      <Grid container alignItems='center' mt={2} mb={2}>
                          {/* 1 */}
                          <Grid container alignItems='center' marginBottom={1}>
                          <Grid item xs={12} textAlign='left' mb={1}>
                            <Typography color="primary">Bale List</Typography>
                          </Grid>
                          <Paper variant='outlined' sx={{width: '100%'}}>
                              <Grid item xs={12} textAlign='left' borderColor='#494a4c' style={{maxHeight: '20vh', overflow: 'auto'}}>
                              <List>
                                  <ListItem disablePadding>
                                    <ListItemButton>
                                      <ListItemIcon>
                                         <ReadMoreIcon />
                                      </ListItemIcon>
                                      <ListItemText>
                                        216736816387
                                      </ListItemText>
                                    </ListItemButton>
                                  </ListItem>

                                  <ListItem disablePadding>
                                    <ListItemButton>
                                      <ListItemIcon>
                                         <ReadMoreIcon />
                                      </ListItemIcon>
                                      <ListItemText>
                                        216736816447
                                      </ListItemText>
                                    </ListItemButton>
                                  </ListItem>

                                  <ListItem disablePadding>
                                    <ListItemButton>
                                      <ListItemIcon>
                                         <ReadMoreIcon />
                                      </ListItemIcon>
                                      <ListItemText>
                                        216736816387
                                      </ListItemText>
                                    </ListItemButton>
                                  </ListItem>

                                  <ListItem disablePadding>
                                    <ListItemButton>
                                      <ListItemIcon>
                                         <ReadMoreIcon />
                                      </ListItemIcon>
                                      <ListItemText>
                                        216736816447
                                      </ListItemText>
                                    </ListItemButton>
                                  </ListItem>

                                  <ListItem disablePadding>
                                    <ListItemButton>
                                      <ListItemIcon>
                                         <ReadMoreIcon />
                                      </ListItemIcon>
                                      <ListItemText>
                                        216736816387
                                      </ListItemText>
                                    </ListItemButton>
                                  </ListItem>

                                  <ListItem disablePadding>
                                    <ListItemButton>
                                      <ListItemIcon>
                                         <ReadMoreIcon />
                                      </ListItemIcon>
                                      <ListItemText>
                                        216736816447
                                      </ListItemText>
                                    </ListItemButton>
                                  </ListItem>

                                  <ListItem disablePadding>
                                    <ListItemButton>
                                      <ListItemIcon>
                                         <ReadMoreIcon />
                                      </ListItemIcon>
                                      <ListItemText>
                                        216736816387
                                      </ListItemText>
                                    </ListItemButton>
                                  </ListItem>

                                  <ListItem disablePadding>
                                    <ListItemButton>
                                      <ListItemIcon>
                                         <ReadMoreIcon />
                                      </ListItemIcon>
                                      <ListItemText>
                                        216736816447
                                      </ListItemText>
                                    </ListItemButton>
                                  </ListItem>

                                  <ListItem disablePadding>
                                    <ListItemButton>
                                      <ListItemIcon>
                                         <ReadMoreIcon />
                                      </ListItemIcon>
                                      <ListItemText>
                                        216736816387
                                      </ListItemText>
                                    </ListItemButton>
                                  </ListItem>

                                  <ListItem disablePadding>
                                    <ListItemButton>
                                      <ListItemIcon>
                                         <ReadMoreIcon />
                                      </ListItemIcon>
                                      <ListItemText>
                                        216736816447
                                      </ListItemText>
                                    </ListItemButton>
                                  </ListItem>

                                  <ListItem disablePadding>
                                    <ListItemButton>
                                      <ListItemIcon>
                                         <ReadMoreIcon />
                                      </ListItemIcon>
                                      <ListItemText>
                                        216736816387
                                      </ListItemText>
                                    </ListItemButton>
                                  </ListItem>

                                  <ListItem disablePadding>
                                    <ListItemButton>
                                      <ListItemIcon>
                                         <ReadMoreIcon />
                                      </ListItemIcon>
                                      <ListItemText>
                                        216736816447
                                      </ListItemText>
                                    </ListItemButton>
                                  </ListItem>

                                  

                              </List>


                              </Grid> 
                              </Paper>
                            </Grid> 
                        </Grid>  
                      

                       <Grid container alignItems='center' mt={2} mb={2}>
                          {/* 2 */}
                          <Grid container alignItems='center' marginBottom={1}>
                          <Grid item xs={12} textAlign='left' mb={1}>
                                <Typography color="primary">Physical Status</Typography>
                            </Grid>
                            <Select value={1} fullWidth>
                              <MenuItem value={1} onClick={()=> setSelectedPhysicalStatus(1)}>OK</MenuItem>
                              <MenuItem value={2} onClick={()=> setSelectedPhysicalStatus(2)}>Broken</MenuItem>
                              <MenuItem value={3} onClick={()=> setSelectedPhysicalStatus(3)}>QR Code not visible</MenuItem>
                              <MenuItem value={4} onClick={()=> setSelectedPhysicalStatus(4)}>RFID Broken</MenuItem>
                            </Select>
                            </Grid> 
                        </Grid>  

                      {/*
 
                      <Grid container align='center' mt={2} mb={2}>
                         <Grid item xs={12} textAlign='center'>

                        </Grid>  
                      </Grid>

                      */}

                  </Box>

                )}



                </DialogContent>

                <DialogActions>

                  { rfidStop && (

                    <>
                      <Button variant="contained" sx={{mr: 2}} onClick={handleClickRFIDClose}>
                        <DeleteIcon />
                      </Button>
                        
                      <Button variant="contained" sx={{backgroundColor: '#1c7e76'}} onClick={handleClickRFIDClose}>
                        <SaveIcon />
                      </Button>
                    </>

                    )}

                    { !rfidStop && (

                    <>
                      <Button variant="outlined" onClick={handleClickRFIDClose} autoFocus>
                          <ExitToAppIcon />
                      </Button>
                    </>

                    )}

                </DialogActions>
              </Dialog>

              {/* RFID SCANNER */}

            </Grid>

          </Grid>
        </Toolbar>
{ /*----------------------------------- END ACTION BUTTONS -----------------------------------*/ }

    </div>
  );
}
