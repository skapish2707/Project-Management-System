import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';

const useStyles = theme => ({
  
});

class resetPassword extends Component { 
  render() {
    const { classes } = this.props;
    return (
      <div>
      <Typography variant="h1">RESET PASSWORD</Typography>
      </div>
    )
  }
}


export default withStyles(useStyles)(resetPassword);