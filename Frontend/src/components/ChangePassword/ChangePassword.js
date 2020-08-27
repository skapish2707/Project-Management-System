import React, { Component } from "react";
import axios from "axios";
import "./ChangePassword.css";
import SERVER_URL from "../../Pages/URL";
import qs from "qs";
import { LinearProgress } from "@material-ui/core";
import {Redirect} from "react-router-dom";
import LoggedNavbar from "../Navbar/LoggedNavbar";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      width: "100%"
    },
    margin: "auto",
    alignItems: "center"
  },

  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },

  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  fields: {
    backgroundColor: "#fff"
  },
  Input: {
    border: "1px solid #d1d1d1",
    padding: "4px 5px",
    width: "55%",
    marginBottom: "20px",
    marginTop: "15px",
    float: "right",
    borderRadius: "4px"
  },
  deptLabel : {
    marginTop: "25px",
    marginBottom: "15px",
    float : "left",
  }
});
class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user : "",
      newPassword: "",
      confirmPassword: "",
      openSuccess : "",
    };
  }

  getStat = () => {
    axios({
      method: "get",
      url: SERVER_URL + "/user",
      withCredentials: true
    }).then(res => {
        this.setState({user: res.data,});
      }).catch(err => {
        this.setState({user:'no user'})
        localStorage.removeItem("token");
      });
  };

  pushPassword = () => {
    axios({
      method: "post",
      url: SERVER_URL + "/changePassword",
      credentials: "include",
      withCredentials: true,
      data: qs.stringify({
        newPassword: this.state.newPassword,
        confirmPassword: this.state.confirmPassword
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    }).then(res => {
        this.setState({openSuccess:true});
      }).catch(function (err) {
        console.log(err);
      });
  };

  newpasswordHandler = e => {this.setState({ newPassword: e.target.value });};
  confirmpasswordHandler = e => {this.setState({ confirmPassword: e.target.value });};

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.newPassword !== this.state.confirmPassword || this.state.newPassword.length < 8) {
      this.setState({
        newPassword : "",
        confirmPassword : "",
      });
      console.log(this.state)
    }
    else {
      this.pushPassword();
    }
  };

  render() {
    const { classes } = this.props;
    const handleClose = (event, reason) => {
      this.setState({openSuccess:false,user:'no user'})
      localStorage.removeItem("token");
    };
    if(this.state.user === ""){
      this.getStat();
      return <LinearProgress />;
    }else if(this.state.user === 'no user'){
      return <Redirect to="/" />;
    }else {
        if (this.state.newPassword !== this.state.confirmPassword){
          var helptext = "Two fields Doesn't match"
        }
        else if (this.state.newPassword === this.state.confirmPassword) {
          var helptext ="";
          if (this.state.newPassword && this.state.newPassword.length < 8 ){
            var helptext = "Please Enter a Password with length greater than 8";
          }
        }
      return (
        <div>
          <LoggedNavbar />
          <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div
            className={classes.paper}
            style={{
              boxShadow:
                "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
              backgroundColor: "#fff",
              borderRadius: "6px"
            }}
          >
           <Snackbar open={this.state.openSuccess}  onClose={handleClose} >
              <Alert onClose={handleClose} severity="success">
                Your Password was changed successfully Please click anywhere to login again
              </Alert>
            </Snackbar>
            <form
              className={classes.form}
              onSubmit={this.handleSubmit}
              noValidate
            >
              <Typography variant="h4" style={{ marginTop:'15px',marginBottom:'15px'}}>
                Change Password
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                type="password"
                required
                fullWidth
                label="New Password"
                value={this.state.newPassword}
                onChange={this.newpasswordHandler}
                autoFocus/>
              <TextField
                variant="outlined"
                type="password"
                margin="normal"
                required
                fullWidth
                label="Confirm Password"
                value={this.state.confirmPassword}
                onChange={this.confirmpasswordHandler}
                />
                <Typography variant="subtitle" color="error">
                  {helptext}
                </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{
                  padding: "10px",
                  fontSize: "18px",
                  fontWeight: "bolder",
                  backgroundColor: "#1877f2",
                  marginBottom: "25px"
                }}
              >
                Change Password
              </Button>
            </form>
          </div>
        </Container>
      </div>        
      );
    }
  }
}

export default withStyles(useStyles)(ChangePassword);