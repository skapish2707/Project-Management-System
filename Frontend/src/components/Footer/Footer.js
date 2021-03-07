import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import "./Footer.css";
import somaiya_white from "./Somaiya-white.svg"
import somaiya_trust from "./somaiya_trust.jpg"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#162343",
    color: "#fff",
    padding: "20px 0px 20px 20px",
  },
  rootItemsHeading: {
    padding:"0px 10px",
    color:"#FFFFFF"
  },
  rootTypoItems: {
    padding:"0px 10px",
    fontSize: "12px"
  },
  rootTypoHead: {
    padding:"0px 10px",
    fontSize: "14px"
  },
  rootItems: {
    margin:"5px 0px",
    padding:"0px 10px",
    color:"#ADADAD"
  },
  foot: {
    margin: "auto"
  },
  footEnd: {
    padding: "15px",
    textAlign: "center",
    backgroundColor: "#162343d9",
    margin: "0"
  },
  footer_images: {
    margin:"20px 0px"
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <br />
      <br />
      <br />
      <br />
      <br />
      <footer>
        <Grid container className={classes.root}>
          <Grid item xs={12} md={2}>
            <Grid container>
              <Grid item xs={12} className={classes.footer_images}>
                <a href="/about.html" target="_blank"><img src={somaiya_white} alt="Somaiya White"/></a>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={2}>
            <Grid container>
              <Grid item xs={12} className={classes.rootItemsHeading}>
                <Typography className={classes.rootTypoHead} style={{fontSize: "16px"}}>K J Somaiya Institute Of Engineering And Information Technology</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={2}>
            <Grid container>
              <Grid item xs={12} className={classes.rootItemsHeading}>
                <Typography className={classes.rootTypoHead}>Address</Typography>
              </Grid>
              <Grid item xs={12} className={classes.rootItems}>
                <Typography className={classes.rootTypoItems}>Somaiya Ayurvihar Complex, Eastern Express Highway, Near Everard Nagar, Sion (East), Mumbai – 400 022</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={2}>
            <Grid container>
              <Grid item xs={12} className={classes.rootItemsHeading}>
                <Typography className={classes.rootTypoHead}>Contact</Typography>
              </Grid>
              <Grid item xs={12} className={classes.rootItems}>
                <Typography className={classes.rootTypoItems}>91-22- 24061408 / 24061403</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={2}>
            <Grid container>
              <Grid item xs={12} className={classes.rootItemsHeading}>
                <Typography className={classes.rootTypoHead}>Connect through Mail</Typography>
              </Grid>
              <Grid item xs={12} className={classes.rootItems}>
                <Typography className={classes.rootTypoItems}>info.tech@somaiya.edu</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={2}>
            <Grid container>
              <Grid item xs={12} className={classes.footer_images}>
                <img src={somaiya_trust} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} className={classes.footEnd}>
            <Typography style={{color:"white"}}>
              &copy;{new Date().getFullYear()} KJSIEIT All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </footer>
    </React.Fragment>
  );
};

export default Footer;


