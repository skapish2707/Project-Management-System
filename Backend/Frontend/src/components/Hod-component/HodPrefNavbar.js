import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    textAlign: "left",
    margin: theme.spacing(2)
  },
  backButton: {},
  buttonContainer: {
    padding: "auto",
    textAlign: "center"
  }
}));

const HodPrefNavbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#000" }}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Project Management System
          </Typography>

          <Link
            to="/hod"
            className={classes.navMenu}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <Button color="inherit" variant="contained">
              Go Back
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HodPrefNavbar;
