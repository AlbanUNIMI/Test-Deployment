import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";


import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import UserMenu from './UserMenu';
import useStyles from './header-jss';

import logo from './Logo.svg';


function Header(props) {
  const { classes, cx } = useStyles();
  const [open] = useState(false);
  const [turnDarker, setTurnDarker] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  let history = useHistory();

  // Initial header style
  let flagDarker = false;

  let flagTitle = false;

  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagDarker = (scroll > 30);
    const newFlagTitle = (scroll > 40);
    if (flagDarker !== newFlagDarker) {
      setTurnDarker(newFlagDarker);
      flagDarker = newFlagDarker;
    }
    if (flagTitle !== newFlagTitle) {
      setShowTitle(newFlagTitle);
      flagTitle = newFlagTitle;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const {
    toggleDrawerOpen,
    margin,
    position,
    gradient,
    openGuide,
  } = props;

  const setMargin = (sidebarPosition) => {
    if (sidebarPosition === 'right-sidebar') {
      return classes.right;
    }
    if (sidebarPosition === 'left-sidebar-big') {
      return classes.leftBig;
    }
    return classes.left;
  };

  function homepage() {
    history.push("/app");
  }
  

  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'));

  return (
    <AppBar
      className={
        cx(
          classes.appBar,
          classes.floatingBar,
          margin && classes.appBarShift,
          setMargin(position),
          turnDarker && classes.darker,
          gradient ? classes.gradientBg : classes.solidBg
        )
      }
    >
      <Toolbar disableGutters={!open}>

      {/* Widescreen menu icon */}

      {!mdDown && (
        <Fab
          size="small"
          className={classes.menuButton}
          aria-label="Menu"
          onClick={toggleDrawerOpen}
        >
        <MenuIcon />
        </Fab>
       )}

       {/* Mobile menu icon */}

       {mdDown && (
        <MenuIcon className={classes.button} style={{marginLeft: '10px', color: '#f6f2e0', fontSize: 25}} onClick={toggleDrawerOpen} /> 
        )}

        {/* Widescreen top-left corner icons */}

        {!mdDown && (
          <div className={classes.headerProperties}>
            <div className={cx(classes.headerAction, showTitle && classes.fadeOut)}>

              <Tooltip title="Smart Bales :: User Guide" placement="bottom">
                <IconButton className={classes.button} onClick={openGuide} size="large">
                  <i className="ion-ios-help-circle-outline" />
                </IconButton>
              </Tooltip>
            </div>
            <Typography component="h4" className={cx(classes.headerTitle, showTitle && classes.show)}>
              Smart Bales v1.0
            </Typography>
          </div>
        )}
        <div className={classes.searchWrapper}>
          <div className={cx(classes.wrapper, classes.light)}>

            {/* Third icon on the right */}

          </div>
        </div>
        {!smDown && (
          <span className={classes.separatorV} />
        )}
        {smDown && ( // Central Logo for Mobile Devices
          <img src={logo} style={{position: "absolute", marginLeft: "30%", height: "60%", fill: "#fcf9f9" }} onClick={() => homepage()} />
        )}
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {

  toggleDrawerOpen: PropTypes.func.isRequired,
  margin: PropTypes.bool.isRequired,
  gradient: PropTypes.bool.isRequired,
  position: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
  openGuide: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default Header;
