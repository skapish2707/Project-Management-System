import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SERVER_URL from "../URL";
import axios from "axios";
import qs from "qs";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import Container from "@material-ui/core/Container";
import Image from "./background2.jpg";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

let Data = "";
let data_access = "";
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
    background: "transparent",
    // boxShadow: "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
    borderRadius: "6px",
    float: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
    paddingTop: "40px",
    [theme.breakpoints.down("575")]: {
      paddingTop: "20px"
    }
  },
  leftpaper: {
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    height: "100%"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#1877f2",
    height: "50px",
    width: "50px",
    marginTop: "30px"
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: "10px",
    fontSize: "18px",
    fontWeight: "bolder",
    backgroundColor: "#1877f2",
    marginBottom: "25px"
  },
  fields: {
    backgroundColor: "#fff",
    borderRadius: "3px"
  },
  title: {
    paddingTop: "50px",
    color: "#fff",
    [theme.breakpoints.down("775")]: {
      fontSize: "45px"
    },
    [theme.breakpoints.down("575")]: {
      fontSize: "40px"
    }
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
      msg: "",
      invalidCredentials: false,
      getResponse: false
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
    this.setState({ getResponse: true });

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
          data_access = response.data.access_token;
          localStorage.setItem("access_token", response.data.access_token);
          this.setState({
            user: response.data.type,
            loggedIn: true,
            msg: "set",
            getResponse: false
          });
          console.log(this.state.msg, this.state.user);
                  }.bind(this)
      )

      .catch(err => {
        console.log(err);
        this.setState({ invalidCredentials: true, getResponse: false });
      });
  }

  checkData() {
    axios({
      method: "get",
      url: SERVER_URL + "/getStudents?by=group",
      withCredentials: true,
      headers : {
        Authorization : 'Bearer '+ localStorage.getItem("access_token") 
      }
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
    if (Data === "guide") {
      localStorage.setItem("token", "guide");
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
      localStorage.setItem("token", "hod");
      Data = "";
    }
    if (Data === "student") {
      localStorage.setItem("token", "student");
      localStorage.setItem("access_token",data_access);
    }
    Data = "";
    if (this.state.loggedIn) {
      const token = localStorage.getItem("token");

      if (token === "N1g70xwfa0V6oCXVweqt" + date)
        return <Redirect to="/yami" exact />;
      if (token === "admin") return <Redirect to="/admin" exact />;
      if (token === "student") return <Redirect to="/student" exact />;
      if (token === "faculty") return <Redirect to="/faculty" exact />;
      if (token === "hod") return <Redirect to="/hod" exact />;
      if (token === "guide") return <Redirect to="/guide" exact />;
    }
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ invalidCredentials: false });
    };
    // if (this.state.loggedIn) {
    //   return <Redirect to="/admin" />;
    // }
    if (this.state.getResponse) {
      return <LinearProgress />;
    }
    return (
      <React.Fragment>
        <div className={classes.leftpaper}>
          <Typography variant="h2" className={classes.title}>
            <b>Project Management System</b>
          </Typography>
          <Container component="main" maxWidth="xs" className={classes.paper}>
            <CssBaseline />
            <Avatar variant="circle" className={classes.avatar}>
              <PersonIcon fontSize="large" />
            </Avatar>
            <Typography component="h2" variant="h6">
              <b>User Login</b>
            </Typography>
            <form className={classes.form} onSubmit={this.submitForm}>
              <TextField
                type="email"
                variant="filled"
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
                variant="filled"
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
                Log In
              </Button>
            </form>
            <Snackbar
              open={this.state.invalidCredentials}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="error">
                Invalid Username/Password Please try again
              </Alert>
            </Snackbar>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Login);
// <Grid container>
//   <Hidden xsDown>
//     <Grid item   md={7}   className={classes.leftpaper}>
//     </Grid>
//   </Hidden>
//   <Grid item  component="main" maxWidth="xs" md={5}>
//     <CssBaseline />
//     <div
//       className={classes.paper}
//       style={{
//         boxShadow:
//           "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
//         backgroundColor: "#fff",
//         borderRadius: "6px"
//       }}
//     >
//       <Avatar
//         variant="circle"
//         className={classes.avatar}
//         style={{ marginTop: "30px" }}
//       >
//         <PersonIcon fontSize="large" />
//       </Avatar>
//       <Typography component="h2" variant="h6">
//         User Login
//       </Typography>
//       <form
//         className={classes.form}
//         onSubmit={this.submitForm}
//         noValidate
//       >
//         <TextField
//           type="email"
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           id="username"
//           label="username"
//           value={this.state.username}
//           onChange={this.handleChange("username")}
//           className={classes.fields}
//           autoFocus
//         />
//         <TextField
//           variant="outlined"
//           margin="normal"
//           required
//           fullWidth
//           label="Password"
//           type="password"
//           id="password"
//           value={this.state.password}
//           onChange={this.handleChange("password")}
//           autoComplete="current-password"
//           className={classes.fields}
//         />

//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           color="primary"
//           className={classes.submit}
//           style={{
//             padding: "10px",
//             fontSize: "18px",
//             fontWeight: "bolder",
//             backgroundColor: "#1877f2",
//             marginBottom: "25px"
//           }}
//         >
//           Log In
//         </Button>
//       </form>
//       <Snackbar
//         open={this.state.invalidCredentials}
//         autoHideDuration={6000}
//         onClose={handleClose}
//       >
//         <Alert onClose={handleClose} severity="error">
//           Invalid Username/Password Please try again
//         </Alert>
//       </Snackbar>
//     </div>
//   </Grid>
// </Grid>
