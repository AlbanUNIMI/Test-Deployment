import React, { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LayersIcon from '@mui/icons-material/Layers';
import Settings from '../../config/settings';

import illustration from './footer.svg';
import illustrationWide from './footer-wide.svg';

function Footer() {

  const [version, setVersion] = useState(Settings.version);

  useEffect(() => {

    /* */

  }, []);

  const setMargin = () => {
    /* */
  };

  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'));

  return (

      <Toolbar style={{position: "fixed", bottom: 0, width: '100%', backgroundColor: '#9f5a47', borderRadius: 0}}>

        {/* 

        {!mdDown && (
          
            <Typography component="h2" className={cx(classes.headerTitle, showTitle && classes.show)}>
              Smart Bales v1.0
            </Typography>
        
        )}

        */}

        {!smDown && (
          <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end">
            <Grid item style={{width: '80%', marginRight: '-20px'}}>
               <img src={illustrationWide} style={{width: '100%'}} />
            </Grid>
          </Grid>
        )}
        
        { smDown && (
          <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end">
            <Grid item justifyContent="flex-end" style={{marginRight: '10'}}>
              <Typography color="#f6f2e0" style={{opacity: ".9"}}>
                <LayersIcon /> {version}
              </Typography>
            </Grid>
            <Grid item style={{width: '110%', marginRight: '-20px'}}>
              <img src={illustration} style={{width: '100%', marginTop: '-20px'}} />
            </Grid>
          </Grid>
        )}      

      </Toolbar>
  );
}

export default Footer;
