import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid, colors } from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import "./Footer.css";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#333",
    color: "#fff",
    paddingTop: "20px"
  },
  rootItems: {
    padding: "8px"
  },
  foot: {
    margin: "auto"
  },
  footEnd: {
    padding: "15px",
    textAlign: "center",
    backgroundColor: "#222",
    margin: "0"
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <footer>
        <Grid container className={classes.root}>
          <Grid item xs={12} sm={4}>
            <Grid container>
              <Grid item xs={12} className={classes.rootItems}>
                <Typography>Privacy</Typography>
              </Grid>
              <Grid item xs={12} className={classes.rootItems}>
                <Typography>Terms And Conditions</Typography>
              </Grid>
              <Grid item xs={12} className={classes.rootItems}>
                <Typography>Terms of Use</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid container>
              <Grid item xs={12} className={classes.rootItems}>
                <BusinessIcon fontSize="large" />
              </Grid>
              <Grid item xs={12} className={classes.rootItems}>
                <Typography>
                  K.J.Somaiya Institute Of Engineering And Information
                  Technology
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.rootItems}>
                <Typography> Sion,Mumbai</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid container>
              <Grid item xs={12} className={classes.rootItems}>
                <ContactMailIcon fontSize="large" />
              </Grid>
              <Grid item xs={12} className={classes.rootItems}>
                <Typography>abcd@gmail.com</Typography>
              </Grid>
              <Grid item xs={12} className={classes.rootItems}>
                <Typography>36326623966996</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.footEnd}>
            <Typography>
              &copy;{new Date().getFullYear()} KJSIEIT,Inc. All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
