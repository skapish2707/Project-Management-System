import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";

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



const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#162343" }}>
        <Toolbar>
          {/* <Link
            to="/"
            className={classes.navMenu}
            style={{ textDecoration: "none", color: "#000" }}
          > */}
            <Button style={{color:"#000"}} onClick={()=>{window.history.back()}}  variant="contained">
              <ArrowBackRoundedIcon />
            </Button>
          {/* </Link> */}
          <Typography variant="h5" className={classes.title}>
            Project Management System
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
