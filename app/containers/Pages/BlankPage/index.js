import React, {useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { styled } from '@mui/system';
import { useHistory } from "react-router-dom";

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationOffIcon from '@mui/icons-material/LocationOff';

import useOnline from 'check-online-offline';
import '@fontsource-variable/eb-garamond';

import arrowDown from './svg/arrowDown.svg';
import arrowUp from './svg/arrowUp.svg';
import opListIcon from './svg/opList.svg';
import vBar from './svg/vBar.svg';
import HBar from './svg/hBar.svg';

import shooter from './shooter.mp3'; 



function BlankPage() {

  let history = useHistory();

  const title = 'Smart Bales';
  const description = 'Smart Bales by LP';

  let sound = new Audio(shooter);

/* ----------------------------- INITIAL STATES -------------------------------*/

  const [assignBalesSelected, setAssignBalesSelected] = useState(false);
  const [acceptBalesSelected, setAcceptBalesSelected] = useState(false);
  const [collectBalesSelected, setCollectBalesSelected] = useState(false);
  const [opListSelected, setOpListSelected] = useState(false);

  const [online, setOnline] = useState(useOnline());

/* -------------------------- END INITIAL STATES ------------------------------*/

  const handleOnline = () => {
    console.log('App is now online.');
    setOnline(true);
  };

  const handleOffline = () => {
    console.log('App is now offline.');
    setOnline(false);
  };

  useOnline({ online: [handleOnline], offline: [handleOffline] });


/* ----------------------------- ASSIGN BALES ---------------------------------*/

  const assignBales = () => {

    setAssignBalesSelected(true); 
    setAcceptBalesSelected(false);
    setCollectBalesSelected(false);
    setOpListSelected(false);

    history.push("/app/pages/assign");

  }

/* ---------------------------- END ASSIGN BALES ------------------------------*/

/* ----------------------------- ACCEPT BALES ---------------------------------*/

const acceptBales = () => {

  setAssignBalesSelected(false); 
  setAcceptBalesSelected(true);
  setCollectBalesSelected(false);
  setOpListSelected(false);

  history.push("/app/pages/accept");

}

/* ---------------------------- END ACCEPT BALES ------------------------------*/

/* ----------------------------- COLLECT BALES --------------------------------*/

const collectBales = () => {

  setAssignBalesSelected(false); 
  setAcceptBalesSelected(false);
  setCollectBalesSelected(true);
  setOpListSelected(false);

  sound.play();
}

/* ---------------------------- END COLLECT BALES ------------------------------*/

/* ---------------------------- OPERATIONS LIST --------------------------------*/

const opList = () => {

  setAssignBalesSelected(false); 
  setAcceptBalesSelected(false);
  setCollectBalesSelected(false);
  setOpListSelected(true);

  history.push("/app/pages/operation-list");

}

/* ----------------------------- SCOPED STYLES ---------------------------------*/

const Tag = styled(Typography)({

  fontFamily:'EB Garamond Variable', 
  fontWeight:'bold', 
  color:'#9f5a47',
  marginBottom: '-0.8rem'
 
});

/* ---------------------------- END SCOPED STYLES ------------------------------*/


/* --------------------------- END OPERATIONS LIST -----------------------------*/

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div>

       {/* Outer Box */}
        
       <Box sx={{ display: 'flex', 
                  flexWrap: 'wrap', 
                  '& > :not(style)': { m: 1.2,
                  width: '100vw',
                  height: '15vh',
                  },
                }}>

          {/* Tile #1: ASSIGN */}
          <Paper variant='outlined' style={{background: "#e5d6d1", borderColor: assignBalesSelected ? '#1c7e76' : '#f6f2e0', borderWidth: '5px', opacity: '.9'}}>
             <Grid container height="90%" alignItems="center">
             <Grid item xs={2} textAlign='center'> 
                <img src={vBar} height='55' style={{opacity: assignBalesSelected ? '1' : '0.5'}}/>
               </Grid>
               <Grid item xs={6}> 
               <Tag fontSize='2rem'>
                   ASSIGN
               </Tag>
               <Typography fontFamily='EB Garamond Variable' fontSize='1.2rem' fontWeight='lighter' color='#9f5a47'>
                   EMPTY BALES
               </Typography>               
               </Grid>
               <Grid item xs={4}>
                  <IconButton onClick={() => assignBales()}>
                      <img src={arrowDown} height='40' style={{opacity: assignBalesSelected ? '1' : '0.5'}}></img>
                  </IconButton>
               </Grid>
             </Grid>
          </Paper>

          {/* Tile #2: ACCEPT */}
          <Paper variant='outlined' style={{background: "#e5d6d1", borderColor: acceptBalesSelected ? '#1c7e76' : '#f6f2e0', borderWidth: '5px', opacity: '.9'}}>
             <Grid container height="90%" alignItems="center">
             <Grid item xs={2} textAlign='center'> 
                <img src={vBar} height='55' style={{opacity: acceptBalesSelected ? '1' : '0.5'}}/>
               </Grid>
               <Grid item xs={6}> 
               <Tag fontSize='2rem'>
                   ACCEPT
               </Tag>
               <Typography fontFamily='EB Garamond Variable' fontSize='1.2rem' fontWeight='lighter' color='#9f5a47'>
                   EMPTY BALES
               </Typography>               
               </Grid>
               <Grid item xs={4}>
                  <IconButton onClick={() => acceptBales()}>
                      <img src={arrowUp} height='40' style={{opacity: acceptBalesSelected ? '1' : '0.5'}}></img>
                  </IconButton>
               </Grid>
             </Grid>
          </Paper> 
          
          {/* Tile #3: COLLECT */}
          <Paper variant='outlined' style={{background: "#e5d6d1", borderColor: collectBalesSelected ? '#1c7e76' : '#f6f2e0', borderWidth: '5px', opacity: '.9'}}>
             <Grid container height="90%" alignItems="center">
             <Grid item xs={2} textAlign='center'> 
                <img src={vBar} height='55' style={{opacity: collectBalesSelected ? '1' : '0.5'}}/>
               </Grid>
               <Grid item xs={6}> 
               <Tag fontSize='1.8rem'>
                   COLLECT
               </Tag>
               <Typography fontFamily='EB Garamond Variable' fontSize='1.2rem' fontWeight='lighter' color='#9f5a47'>
                   FILLED BALES
               </Typography>               
               </Grid>
               <Grid item xs={4}>
                  <IconButton onClick={() => collectBales()}>
                      <img src={arrowUp} height='40' style={{opacity: collectBalesSelected ? '1' : '0.5'}}></img>
                  </IconButton>
               </Grid>
             </Grid>
          </Paper>               

          {/* Tile #4: OP. LIST */}
          <Paper variant='outlined' style={{background: "#e5d6d1", borderColor: opListSelected ? '#1c7e76' : '#f6f2e0', borderWidth: '5px', opacity: '.9'}}>
             <Grid container height="90%" alignItems="center">
             <Grid item xs={2} textAlign='center'> 
                <img src={vBar} height='55' style={{opacity: opListSelected ? '1' : '0.5'}}/>
               </Grid>
               <Grid item xs={6}> 
               <Tag fontSize='1.5rem'>
                   OPERATION
               </Tag>
               <Typography fontFamily='EB Garamond Variable' fontSize='1.2rem' fontWeight='lighter' color='#9f5a47'>
                   LIST
               </Typography>               
               </Grid>
               <Grid item xs={4}>
                  <IconButton onClick={() => opList()}>
                      <img src={opListIcon} height='40' style={{opacity: opListSelected ? '1' : '0.5'}}></img>
                  </IconButton>
               </Grid>
             </Grid>
          </Paper>
        </Box>

        {/* Lower Box */}
        <Box style={{marginTop: 15, opacity: '.9'}} textAlign='center'>

          <img src={HBar} height='10'/>

          <Grid container textAlign='center'>
              <Grid item xs={5.5} textAlign='right'>

                { online && ( // WiFi Status Icon: Online
                  <WifiIcon style={{fontSize: '5vh', color: '#f6f2e0'}}/> 
                )}

                { !online && ( // WiFi Status Icon: Offline
                  <WifiOffIcon style={{fontSize: '5vh', color: '#f6f2e0'}}/> 
                )}

              </Grid>

              <Grid item xs={1} />

              <Grid item xs={5.5} textAlign='left'>
                { online && ( // Geolocalization Status Icon: On
                    <LocationOnIcon style={{fontSize: '5vh', color: '#f6f2e0'}}/> 
                  )}

                  { !online && ( // Geolocalization Status Icon: Off
                    <LocationOffIcon style={{fontSize: '5vh', color: '#f6f2e0'}}/> 
                  )}
              </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default BlankPage;
