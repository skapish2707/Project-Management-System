import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';

const useStyles = theme => ({
  
});

class forgetPassword extends Component { 
  render() {
    const { classes } = this.props;
    return (
      <div>
      <Typography variant="h1">FORGET PASSWORD</Typography>
      </div>
    )
  }
}


export default withStyles(useStyles)(forgetPassword);