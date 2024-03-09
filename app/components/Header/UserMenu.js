import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useHistory } from "react-router-dom";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import messageStyles from 'dan-styles/Messages.scss';
import useStyles from './header-jss';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PinDropIcon from '@mui/icons-material/PinDrop';
import QrCodeIcon from '@mui/icons-material/QrCode';

import ButtonGroup from '@mui/material/ButtonGroup';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import hbar from './hBar.svg';

import qr from './qr.png';
import Dexie from 'dexie';
import QRCode from "react-qr-code";


function UserMenu(props) {

  let history = useHistory();

  const { classes, cx } = useStyles();
  const [menuState, setMenuState] = useState({
    anchorEl: null,
    openMenu: null
  });

  const handleMenu = menu => (event) => {
    const { openMenu } = menuState;
    setMenuState({
      openMenu: openMenu === menu ? null : menu,
      anchorEl: event.currentTarget
    });
  };

  const handleClose = () => {
    setMenuState({ anchorEl: null, openMenu: null });
  };

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const [newNotifications, setNewNotifications] = useState(3);

/*-------------------------------------- USER DATA -------------------------------------*/

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [location, setLocation] = useState('Hebei, CN');
const [code, setCode] = useState('000000');
const [languageCode, setLanguageCode] = useState('E');


/*---------------------------------- END USER DATA ----------------------------------*/
  
const db = new Dexie('UserDB')

db.version(1).stores({
  currentUser: '++id, userCode, name, eMail, userProfileCode, tierCode, langCode, active, RFIDActive, AssignmentActive, AcceptanceActive, CollectingActive, GPSActive, logActive, CollaborationActive',
})

/*--------------------------------- Retrieve User Data ---------------------------------*/
  const retrieveUser = async () => {

    try {
    
        const userName = await db.currentUser?.get(1);

          setName(userName?.name);
          setEmail(userName?.email);
          setCode(userName?.userCode);
          setLanguageCode(userName?.langugeCod);

        } catch (err) {

          history.push("/register");
          console.log(err);

      }
    };
/*------------------------------- END Retrieve User Data -------------------------------*/

  const { dark } = props;
  const { anchorEl, openMenu } = menuState;

  const changeLang = () => {

  };

/*----------------------------------- UserMenu Init -----------------------------------*/

  useEffect(() => {

    retrieveUser();

  }, []);
/*---------------------------------- END UserMenu Init ---------------------------------*/  

  return (
    <div>
      <IconButton style={{marginRight: '-5px', visibility: 'hidden'}} disabled
        aria-haspopup="true"
        onClick={handleMenu('notification')}
        color="inherit"
        className={cx(classes.notifIcon, dark ? classes.dark : classes.light)}
        size="large">

        {/* New Assigned / Accepted Bales Notification Badge*/}

        <Badge className={classes.badge} badgeContent={newNotifications} color="secondary">
            <i className="ion-ios-notifications-outline" />
        </Badge>
        
      </IconButton>

      {/* New Assigned / Accepted Bales Notification List*/}

      <Menu
        id="menu-notification"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={classes.notifMenu}
        PaperProps={{
          style: {
            width: 350,
          },
        }}
        open={openMenu === 'notification'}
        onClose={handleClose}
      >

        {/* Web Socket listening to Incoming API Calls when online */}

        <MenuItem onClick={handleClose}>
          <div className={messageStyles.messageSuccess}>
            <ListItemAvatar>
              <CheckBoxIcon style={{fontSize: '5vh', color: '#1c7e76'}}/>               
            </ListItemAvatar>
            <ListItemText primary={'JOB #26262 Accepted'} className={classes.textNotif} secondary={'18/01/2025 : 14:00'} />
          </div>
        </MenuItem>

        <Divider variant="inset" />

        <MenuItem onClick={handleClose}>
          <div className={messageStyles.messageSuccess}>
            <ListItemAvatar>
              <NotificationsActiveIcon style={{fontSize: '5vh', color: '#D0342C'}}/>               
            </ListItemAvatar>
            <ListItemText primary={'You have an incoming assignment!'} className={classes.textNotif} secondary={'18/01/2025 : 14:00'} />
          </div>
        </MenuItem>

        <Divider variant="inset" />

        <MenuItem onClick={handleClose}>
          <div className={messageStyles.messageSuccess}>
            <ListItemAvatar>
              <CheckBoxIcon style={{fontSize: '5vh', color: '#1c7e76'}}/>               
            </ListItemAvatar>
            <ListItemText primary={'JOB #26262 Accepted'} className={classes.textNotif} secondary={'18/01/2025 : 14:00'} />
          </div>
        </MenuItem>

        <Divider variant="inset" />
        
        <MenuItem onClick={handleClose}>
          <div className={messageStyles.messageSuccess}>
            <ListItemAvatar>
              <NotificationsActiveIcon style={{fontSize: '5vh', color: '#D0342C'}}/>               
            </ListItemAvatar>
            <ListItemText primary={'You have an incoming assignment!'} className={classes.textNotif} secondary={'18/01/2025 : 14:00'} />
          </div>
        </MenuItem>

        <Divider variant="inset" />

        <MenuItem onClick={handleClose}>
          <div className={messageStyles.messageSuccess}>
            <ListItemAvatar>
              <CheckBoxIcon style={{fontSize: '5vh', color: '#1c7e76'}}/>               
            </ListItemAvatar>
            <ListItemText primary={'JOB #26262 Accepted'} className={classes.textNotif} secondary={'18/01/2025 : 14:00'} />
          </div>
        </MenuItem>

        {/* END WEB SOCKET */}

      </Menu>

      {/* USER MENU */}
      <Button onClick={handleClickOpen}>
         <ManageAccountsIcon style={{color: '#f6f2e0', fontSize: 28}}/>
      </Button>

      <Dialog style={{opacity: '1'}}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClickClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
           User Profile           
        </DialogTitle>
        <DialogContent>

        <Box style={{ height: '80vh' }}>
          <Grid container textAlign='center'>
            <Grid container height='5vh'/>
            <Grid container alignItems='center' style={{backgroundColor: '#fefdfd'}}>
          
            <Grid container alignItems='center' ml={'20%'} mt={2} mb={2}>
             {/* NAME */}
              <Grid container alignItems='center' marginBottom={1}>
                  <Grid item xs={2} textAlign='center'>
                    <PermContactCalendarIcon style={{fontSize: '6vh', color: '#9f5a47'}}/>
                  </Grid> 
                <Grid item xs={10} textAlign='left'>
                   <Typography color="#9f5a47" fontSize= "3vh" fontFamily='Garamond' fontWeight='bold' marginLeft={2}> {name}</Typography>
                   <Typography color="#9f5a47" fontSize= "2vh" fontFamily='Garamond' marginLeft={2} marginTop={-1}> {email}</Typography>
                </Grid> 
              </Grid>

              <img src={hbar} width='70%'/>

              {/* LOCATION(S) */}
              <Grid container alignItems='center'>
                  <Grid item xs={2} textAlign='center'>
                    <PinDropIcon style={{fontSize: '3vh'}}/>
                  </Grid> 
                <Grid item xs={10} textAlign='left'>
                   <Typography color="#9f5a47" fontSize= "3vh" fontFamily='Garamond' marginLeft={2}> {location}</Typography>
                </Grid> 
              </Grid>

              {/* USER CODE */}
              <Grid container alignItems='center'>
                  <Grid item xs={2} textAlign='center'>
                    <QrCodeIcon style={{fontSize: '3vh'}}/>
                  </Grid> 
                <Grid item xs={10} textAlign='left'>
                   <Typography color="#9f5a47" fontSize= "3vh" fontFamily='Garamond' fontWeight='bold' marginLeft={2}> {code}</Typography>
                </Grid> 
              </Grid>   

            </Grid>

            </Grid>
          
            <Grid container alignItems='center' mt='5vh'>
            <Grid item xs={1} />
                <Grid item xs={10} textAlign='center' border={2} borderColor='#9f5a47'>
                  <Grid item margin={2}>
                      <QRCode value={code} />
                   </Grid>
                </Grid>
                <Grid item xs={1} />
            </Grid>

            <Grid container alignItems='center' mt='10vh'>
            <Grid item xs={12} textAlign='center' justifyContent='center'>
                <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons">
                  <Button style={languageCode === 'E' ? { opacity: '1'} : { opacity: '0.7'}} onClick={()=> setLanguageCode('E')}>English</Button>
                  <Button style={languageCode === 'C' ? { opacity: '1'} : { opacity: '0.7'}} onClick={()=> setLanguageCode('C')}>Chinese</Button>
                  <Button style={languageCode === 'M' ? { opacity: '1'} : { opacity: '0.7'}} onClick={()=> setLanguageCode('M')}>Mongolian</Button>
                </ButtonGroup>
                </Grid>
            </Grid>

           </Grid>
        </Box>

        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClickClose} autoFocus>
            <ExitToAppIcon />
          </Button>
        </DialogActions>
      </Dialog>

      {/* USER PROFILE */}

    </div>
  );
}

UserMenu.propTypes = {

  dark: PropTypes.bool,
};

UserMenu.defaultProps = {
  dark: false
};

export default UserMenu;
