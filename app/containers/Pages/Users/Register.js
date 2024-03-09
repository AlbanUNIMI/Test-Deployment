import React, { useState } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { RegisterForm } from "dan-components";
import useStyles from "dan-components/Forms/user-jss";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import { InsetDivider } from '../../../components/Divider';

// OTP | RESET

function Register() {
  const [valueForm, setValueForm] = useState(null);
  const { classes } = useStyles();

  const title = brand.name + " - Register";
  const description = brand.desc;

  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const [english, setEnglish] = useState("#f6f2e0");
  const [cinese, setCinese] = useState("#542015");
  const [mongolian, setMongolian] = useState("#542015");

  const [language, setLanguage] = useState("en");

  const changeLang = (lang) => {
    if (lang === "en") {
      setLanguage("en");
      setEnglish("#f6f2e0");
      setCinese("#542015");
      setMongolian("#542015");
x    } else if (lang === "cn") {
      setLanguage("cn");
      setEnglish("#542015");
      setCinese("#f6f2e0");
      setMongolian("#542015");
    } else {
      setLanguage("mo");
      setEnglish("#542015");
      setCinese("#542015");
      setMongolian("#f6f2e0");
    }
  };


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
          <RegisterForm lang={language}/>

          <InsetDivider />

          <Grid
            container
            spacing={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item>
              <Tooltip title="Set language to English">
                <Typography
                  color={english}
                  onClick={() => changeLang("en")}
                  style={{ onMouseHover: "" }}
                >
                  English{" "}
                </Typography>
              </Tooltip>
            </Grid>

            <Grid item>
              <Typography> / </Typography>
            </Grid>

            <Grid item>
              <Tooltip title="Set language to Mongolian">
                <Typography color={mongolian} onClick={() => changeLang("mn")}>
                  {" "}
                  монгол{" "}
                </Typography>
              </Tooltip>
            </Grid>

            <Grid item>
              <Typography> / </Typography>
            </Grid>

            <Grid item>
              <Tooltip title="Set language to Cinese-Simplified">
                <Typography color={cinese} onClick={() => changeLang("cn")}>
                  简体中文{" "}
                </Typography>
              </Tooltip>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Register;
