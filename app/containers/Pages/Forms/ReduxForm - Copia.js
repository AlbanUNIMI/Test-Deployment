import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { testService } from "../../../../services/test.service";
import Dexie from 'dexie';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ReportGmailerrorred } from '@mui/icons-material';


function ReduxForm() {

  const title = '';
  const description = '';

  const[response, setResponse] = useState('');

  const onCall = async () => {

    try {
      let res = await testService.test();

      if (res.error) {
        
      console.log("1°ERR");

      await console.log("2° ERR");;

      } else {

        setResponse(res.data);
        console.log(res.data);

        let db = new Dexie("UserDB");

        db.version(1).stores({
            user: "++id, name, eMail, userCod"
        });

      }
    } catch (err) {

      await console.log("3° ERR");;

    }
  };

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
        <Grid container height="50vh" alignItems="center">
             <Grid xs={12} item textAlign='center'> 

               <Button variant="outlined" style={{color: 'white', borderColor: 'white'}} onClick={() => onCall()}>Test API Call</Button>
            
            </Grid>
          </Grid>
       </div>
    </div>
  );
}

export default ReduxForm;
