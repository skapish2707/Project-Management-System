import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Image from "./sample.PNG";
import {Grid} from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "left",
    width: "87%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px",
    "borderLeftColor": "blue",
    "border-left-style": "solid",
    "border-left-width": "10px",

    [theme.breakpoints.down("sm")]: {}
  },
  title: {
    fontSize: "20px",
    letterSpacing: "1px",
    marginBottom:"3px"
  },
  image:{
    [theme.breakpoints.up("md")]:{
      marginLeft:"20%"
    },
    [theme.breakpoints.down("sm")]:{
      width:"95%"
    }
  },
  pos: {
    marginBottom: 12
  }
}));

export default function Profile(props) {
  const classes = useStyles();
  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{
        boxShadow: "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
        backgroundColor: "#fff",
        borderRadius: "0px"
      }}
    >
      <CardContent>
        <Typography variant="h4" style={{ fontWeight: "600",fontFamily:"sans-serif",marginBottom:"10px" }}>
          Instructions -
        </Typography>

        
        <Typography className={classes.title}>
          1. Please fill the below form to create project list of your department          
        </Typography>
        <Typography className={classes.title}>
          2. Project list file should be of <b>.csv</b>  or <b>.xlsx</b> format          
        </Typography>
        <Typography className={classes.title}>
          3. The first row of the file should be <b>name,rollno,email,group_name </b>
             actual values should start from second row 
        </Typography><br/>
        <img src={Image} className ={classes.image}/><br/>
        <Typography className={classes.title}>
          4. On submitting the form you will create a list mentioned in the file
          and will give authorities to emails mentioned by you
        </Typography>
      </CardContent>
    </Card>
  );
}
