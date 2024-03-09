import React, {useState, useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useHistory } from "react-router-dom";

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
import FilterListIcon from '@mui/icons-material/FilterList';

import Tooltip from '@mui/material/Tooltip';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import BorderColorIcon from '@mui/icons-material/BorderColor'; 
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'; 
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from "@mui/material/Grid";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import toast, { Toaster } from "react-hot-toast";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import SyncIcon from '@mui/icons-material/Sync';
import GradingIcon from '@mui/icons-material/Grading';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import QrCodeIcon from '@mui/icons-material/QrCode';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SaveIcon from '@mui/icons-material/Save';
import PausePresentationIcon from '@mui/icons-material/PausePresentation';
import HBar from './hBar.svg';

import Autocomplete from '@mui/material/Autocomplete';
import CardHeader from '@mui/material/CardHeader';


import Html5QrcodePlugin from './Html5QrcodePlugin.js';
import settings from '../../config/settings';
import indexedDB from '../../config/indexedDB';

import BeatLoader from "react-spinners/BeatLoader";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import { getComparator, stableSort, useStyles, EnhancedTableHead} from "./AcceptTableFunctions"


export default function OpList() {

  let history = useHistory();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [openManual, setOpenManual] = useState(false); 
  const [manuallyAddedBaleNumber, setManuallyAddedBaleNumber] = useState(''); 
  const [selectedPhysicalStatus, setSelectedPhysicalStatus] = useState(1);  
  const [correctionsOpen, setCorrectionsOpen] = useState(false);

/*--------------------- Initiate IndexedDB Object Store ---------------------*/
  const userDB = indexedDB.userDB;
  const logDB = indexedDB.logDB;
  const recordsDB = indexedDB.recordsDB;
  const transactionalDB = indexedDB.transactionalDB;
  const notificationsDB = indexedDB.notificationsDB;
/*--------------------- Initiate IndexedDB Object Store ---------------------*/
  
  const [userName, setUserName] = useState("");

  const [dense, setDense] = useState(true);

  const { classes } = useStyles();

/*---------------------- Operations List Table Handler ----------------------*/
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
/*-------------------- END Operations List Table Handler --------------------*/

/*------------------------------------ 00.TABS ---------------------------------------*/
  const [value, setValue] = useState(0);

  const [dashboard, setDashboard] = useState(true);
  const [assignment, setAssignment] = useState(false);
  const [acceptance, setAcceptance] = useState(false);
  const [collecting, setCollecting] = useState(false);

  const [currentJob, setCurrentJob] = useState('');

  
  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 0){

        setDashboard(true);
        setAssignment(false);
        setAcceptance(false);
        setCollecting(false);

      } else if (newValue === 1) {

        setDashboard(false);
        setAssignment(true);
        setAcceptance(false);
        setCollecting(false);

    } else if (newValue === 2) {
     
        setDashboard(false);
        setAssignment(false);
        setAcceptance(true);
        setCollecting(false);

    } else {

        setDashboard(false);
        setAssignment(false);
        setAcceptance(false);
        setCollecting(true);

    }
  }
/*------------------------------------- END TABS -------------------------------------*/

/*--------------------------------- Retrieve User Data ---------------------------------*/
const retrieveUser = async () => {

    try {
    
        const userName = await userDB.currentUser?.get(1);

          console.log(userName?.name)

        } catch (err) {

      }
    };
/*------------------------------- END Retrieve User Data -------------------------------*/

/*----------------------------- 01. New / Resume job logic --------------------------*/
  const assignmentListInit = async () => {
    try {

      const assignedBales = await transactionalDB?.assignBales?.toArray() || '';

      let assignedBalesList = [];

      for (let i=0; i< assignedBales.length; i++){

        assignedBalesList[i] = {

          id: i+1,
          tierCode: assignedBales[i].tierCode,
          date: (i+1)+'/2/2024',
          statusCode: assignedBales[i].transactionStatusCode

        }

      }

      setRows(assignedBalesList);
      // serverToDate();
     
    } catch (err) {
      console.log(err); // LogDB
    }
};
/*----------------------------- END New / Resume job logic --------------------------*/

/*----------------------------- 01. New / Resume job logic --------------------------*/
  const serverToDate = (server) => {
      /*

      let [Y, M, D, H, m, s] = '2021-01-20T17:40:35'.split(/\D/);
      // Treat as UTC
      let date = new Date(Date.UTC(Y, M-1, D, H, m, s));
      console.log(date);

      let time = '2021-01-20T17:40:35';

      let time2 = time.split('-').join('');

      let time3 = time2.split('T').join('');

      */

      // let time = '2021-01-20T17:40:35'.split('T')[0].join("");

      let time = '20/01/2023';

      return time;

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


/*------------------- 03. Manually Add New Bales current table view -----------------*/
const addBales = async (manuallyAddedBaleNumber, selectedPhysicalStatus) => {
    const currentStatus = await transactionalDB.assignBales?.get(currentJob);
    const currentBales = currentStatus?.balesList;
    let currentCount = currentBales[currentBales?.length-1]?.id || 0;

    currentBales.push({ id: currentCount+1, baleNumber: manuallyAddedBaleNumber, baleNote: "Something", physicalStatus: selectedPhysicalStatus });

    await transactionalDB.assignBales
      .where("transactionID")
      .equals(currentJob)
      .modify({ balesList: currentBales });

    handleChange('', 0); // Activate "Bales List" Tab

    toast.success("Transaction Successfull", { duration: 5000 }); // TEMP

    updateView();
       
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

/*--------------------------- Acceptances List Header Text --------------------------*/
  let tabHead = <React.Fragment> 
                <Grid container alignContent='center'>
                    <Typography fontSize='16px' color='#9f5a47'>
                      <GradingIcon /><strong> Acceptances List</strong>
                    </Typography>
                  </Grid>
                </React.Fragment>;
/*------------------------- END Acceptances List Header Text ------------------------*/

/*------------------------ END Update table view with new bales ---------------------*/

/*---------------------------------- XY. onLoad Logic -------------------------------*/
  useEffect(() => {

    assignmentListInit();
      
  }, []);
/*---------------------------------- END onLoad Logic -------------------------------*/

  return (
    
    <div className={classes.root}>
     <Grid name="Accordion" xs={12} item textAlign="left" mt={2}>
    {/*---------- DATA FILTERS ----------*/}
    <Accordion style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}} defaultExpanded={false} disableGutters > 
            <AccordionSummary sx={{ '&.Mui-expanded': { mb: '' } }} className={classes.accordionSummary} expandIcon={<ArrowDownwardIcon />} aria-controls="panel1-content" id="panel1-header"> 
                <FilterListIcon />
            </AccordionSummary>
        <AccordionDetails>

        {/* 1° Input Filter : Herder Community*/}
            <Grid container alignItems='center'>
              <Grid item xs={12} mt={2} mb={1} textAlign='left'>
            
              </Grid> 

        {/* 2° Input  Filter: Location*/}
              <Grid item xs={12} mt={1} mb={1} textAlign='left'>
            
              </Grid>

        {/* 3° Input  Filter: Bale Number*/}
              <Grid item xs={12} mt={1} mb={1} textAlign='left'>
                <TextField variant="outlined" label="Bale Number" inputProps={{ maxLength: 7}} value={manuallyAddedBaleNumber} onChange={(e) => handleManualInputField(e)} fullWidth />
              </Grid>

        {/* 4° Input  Filter: Date FROM*/}
               <Grid item xs={5.7} mt={1} mb={1} textAlign='left'>
                 <TextField variant="outlined" label="Date From"/>
                </Grid>

                <Grid item xs={0.6} />

        {/* 5° Input  Filter: Date TO*/}
               <Grid item xs={5.7} mt={1} mb={1} textAlign='left'>
                  <TextField variant="outlined" label="Date From"/>
                </Grid>
            </Grid>

          </AccordionDetails>
        </Accordion>
      </Grid>

     <Grid name="Table" xs={12} item textAlign="left" mt={2} mb={2}>
        <Paper className={classes.root}>
         <CardHeader title={tabHead} sx={{backgroundColor: '#f5f5f5'}}/>
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
                            <TableCell align="left" size='small' style={{fontSize: '16px'}}>...</TableCell>
                            <TableCell align="left" size='small' style={{fontSize: '16px'}}>...</TableCell>
                            <TableCell align="center" size='small' style={{fontSize: '16px'}}>
                                <FindInPageIcon style={{color: '#494a4c', marginRight: '1rem'}}/> 
                                <LibraryAddCheckIcon style={{color: '#494a4c'}}/>
                            </TableCell>

                            <Dialog
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
                                        <TextField variant="outlined" type="number" value='1234567' fullWidth disabled/>
                                      </Grid> 
                                    </Grid> 

                                    {/* Physical Status (Manually Add) */}

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

                                    <Grid container alignItems='center' mt={2} mb={2}>
                                      {/* 3 */}
                                      <Grid container alignItems='center' mb={1}>
                                        <Grid item xs={12} textAlign='left' mb={1}>
                                            <Typography color="primary">Bale Notes</Typography>
                                        </Grid>
                                        <TextField fullWidth multiline rows={4} id="bale-note" value='Something...'/>
                                      </Grid> 
                                    </Grid> 

                                </Box>
                              </DialogContent>

                                <DialogActions>
                                      <Button autoFocus onClick={()=>setCorrectionsOpen(!correctionsOpen)}>
                                        Close
                                      </Button>
                                      <Button>
                                        Apply
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

        </Paper>
      </Grid>
  
    </div>
  );
}
