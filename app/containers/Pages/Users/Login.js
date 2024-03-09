import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { LoginForm } from 'dan-components';
import useStyles from 'dan-components/Forms/user-jss';

function Login() {
  const { classes } = useStyles();


  const title = 'Smart Bales';
  const description = 'Smart Bales by Loro Piana';

  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
                     
        </div>
      </div>
    </div>
  );
}

export default Login;
