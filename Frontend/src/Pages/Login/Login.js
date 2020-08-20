import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SERVER_URL from "../URL";
import axios from "axios";
import qs from "qs";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Navbar from "../../components/Navbar/Navbar";

let Data = "";
let Ad = [];
var today = new Date(),
  date =
    today.getDate() +
    "a" +
    today.getMonth() +
    "V" +
    today.getFullYear() +
    "fUcKyoU" +
    50 +
    "Z" +
    today.getDate();

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  fields: {
    backgroundColor: "#fff"
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = true;

    if (token == null) {
      loggedIn = false;

      console.log("token is null");
    }
    this.state = {
      username: "",
      password: "",
      loggedIn,
      user: "",
      msg: ""
    };
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChange = name => ({ target: { value } }) => {
    this.setState({ [name]: value });
  };

  submitForm(e) {
    e.preventDefault();
    const { username, password } = this.state;
    //Login Logic

    axios({
      method: "post",
      url: SERVER_URL + "/login",
      credentials: "include",
      withCredentials: true,
      data: qs.stringify({
        email: username,
        password: password
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    })
      .then(
        function (response) {
          console.log(response.data);
          Data = response.data.type;

          this.setState({
            user: response.data.type,
            loggedIn: true,
            msg: "set"
          });
          console.log(this.state.msg, this.state.user);
          // localStorage.setItem("token", response.data.type);
        }.bind(this)
      )

      .catch(function (err) {
        console.log(err);
      });
  }

  checkData() {
    axios({
      method: "get",
      url: SERVER_URL + "/getStudents?by=group",
      withCredentials: true
    })
      .then(function (res) {
        Ad = res.data;
        console.log(Ad);
      })
      // .then(() => {
      //   localStorage.setItem("data", "set");
      // })

      .catch(function (err) {
        console.log(err);
      });
  }

  getToken() {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.setState({
        loggedIn: false
      });
      console.log(this.state.loggedIn);
    }
  }

  render() {
    const { classes } = this.props;

    if (Data === "admin") {
      this.checkData();
    }
    if (Data === "yami") {
      localStorage.setItem("token", "N1g70xwfa0V6oCXVweqt" + date);
    }
    if (Data === "admin") {
      localStorage.setItem("token", "admin");
      Data = "";
    }

    if (Data === "ig") {
      localStorage.setItem("token", "faculty");
      Data = "";
    }
    if (Data === "pic") {
      localStorage.setItem("token", "faculty");
      Data = "";
    }
    if (Data === "hod") {
      localStorage.setItem("token", "faculty");
      Data = "";
    }
    if (Data === "student") localStorage.setItem("token", "student");
    Data = "";
    if (this.state.loggedIn) {
      const token = localStorage.getItem("token");

      if (token === "N1g70xwfa0V6oCXVweqt" + date)
        return <Redirect to="/yami" exact />;
      if (token === "admin") return <Redirect to="/admin" exact />;
      if (token === "student") return <Redirect to="/student" exact />;
      if (token === "faculty") return <Redirect to="/faculty" exact />;
    }

    // if (this.state.loggedIn) {
    //   return <Redirect to="/admin" />;
    // }
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Login
            </Typography>
            <form
              className={classes.form}
              onSubmit={this.submitForm}
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                value={this.state.username}
                onChange={this.handleChange("username")}
                className={classes.fields}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange("password")}
                autoComplete="current-password"
                className={classes.fields}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

export default withStyles(useStyles)(Login);
