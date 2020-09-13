import React, { Component } from "react";
import LoggedNavbar from "../Navbar/LoggedNavbar";
import SERVER_URL from "../../Pages/URL";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AdminInstructions from "./AdminInstructions";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import {
  LinearProgress,
  TextField,
  withStyles,
  Grid,
  Typography,
  Button,
  Input,
  Snackbar, CircularProgress
} from "@material-ui/core";
import Profile from "../Profile";
import ProjectList from "./ProjectList";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
let userInfo = [];
let Ad = null;
let filled = false;
let Groups = null;

const useStyles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "40vh"
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    marginTop: "auto"
  },
  paper: {
    marginTop: theme.spacing(8),
    width: "70%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "90%"
    },
    margin: "auto",
    alignItems: "center"
  },
  pape: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#fff"
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
    width: "90%",
    border: "1px solid #d1d1d1",
    padding: "4px 5px",
    borderRadius: "4px"
  },
  Inputfield: {
    width: "90%",
    padding: "0px"
  },
  gridField: {
    padding: "8px 0 !important"
  },
  InputTitle: {
    textAlign: "left",
    paddingLeft: "30px",
    fontSize: "16px",
    fontWeight: "600"
  }
});

class AdminContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hod: "",
      hodName: "",
      student_file: null,
      // pic: "",
      // picName: "",
      // ig: "",
      // igName: "",
      adData: null,
      filled,
      openSuccess: false,
      openFailure: false,
      loading: false
    };
  }

  hodHandler = e => {
    this.setState({ hod: e.target.value });
  };
  hodNameHandler = e => {
    this.setState({ hodName: e.target.value });
  };

  // picHandler = e => {
  //   this.setState({ pic: e.target.value });
  // };
  // picNameHandler = e => {
  //   this.setState({ picName: e.target.value });
  // };
  // igHandler = e => {
  //   this.setState({ ig: e.target.value });
  // };
  // igNameHandler = e => {
  //   this.setState({ igName: e.target.value });
  // };
  // studentfileHandler = e => {
  //   this.fileValidation(e);
  // };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      openSuccess: false,
      openFailure: false,
      adData: null
    });
  };

  submitHandler = e => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("hodName", this.state.hodName);
    formData.append("hodEmail", this.state.hod);
    // formData.append("igName", this.state.igName);
    // formData.append("igEmail", this.state.ig);
    // formData.append("picName", this.state.picName);
    // formData.append("picEmail", this.state.pic);
    formData.append("student_file", this.state.student_file);
    this.setState({ loading: true });
    axios({
      method: "post",
      url: SERVER_URL + "/admin",
      credentials: "include",
      withCredentials: true,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(res => {
        this.setState({ openSuccess: true,loading: false });
        window.location.reload(false);
      })
      .catch(err => {
        this.setState({ openFailure: true,loading: false });
        if (err) throw err;
      });
    this.setState({ hod: "", student_file: null, hodName:""});
  };

  fileValidation = e => {
    var fileInput = document.getElementById("file");
    console.log(fileInput);
    console.log(e.target.files[0]);
    var filePath = fileInput.value;
    console.log(filePath);
    // Allowing file type
    var allowedExtensions = /(\.csv|\.xlsx)$/i;

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      return false;
    } else {
      this.setState(
        { student_file: e.target.files[0] },
        console.log(this.state.student_file)
      );
    }
  };

  checkData() {
    axios({
      method: "get",
      url: SERVER_URL + "/getStudents?by=group",
      withCredentials: true
    })
      .then(res => {
        Ad = res.data.length;
        Groups = res.data;
        this.setState({
          adData: "new",
          filled: true
        });
      })
      // .then(() => {
      //   localStorage.setItem("data", "set");
      // })

      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    if (this.state.loading) {
      return (
        <div style={{ margin: "auto" }}>
          <LoggedNavbar />
          <CircularProgress />
        </div>
      );
    }
    if (this.state.adData === null) {
      this.checkData();
    }
    userInfo = this.props.userInfo;

    if (this.state.filled === true) {
      if (Ad === 0) {
        return (
          <div className={classes.root}>
            <LoggedNavbar />
            <Profile userInfo={userInfo} />
            <AdminInstructions />
            <div
              style={{
                width: "90%",
                margin: "50px auto",
                boxShadow:
                  "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
                backgroundColor: "#fff",
                borderRadius: "10px"
              }}
            >
              <form
                style={{
                  backgroundColor: "#fff",
                  marginTop: "30px",
                  padding: "20px 30px"
                }}
                onSubmit={this.submitHandler}
              >
                <Typography variant="h2" style={{ marginBottom: "30px" }}>
                  Create Project List
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} className={classes.gridField}>
                    <Typography className={classes.InputTitle}>
                      Enter Head Of Department Details:
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    className={classes.gridField}
                  >
                    <TextField
                      size="small"
                      variant="outlined"
                      id="hodName"
                      label="Enter Head of Department Name"
                      value={this.state.hodName}
                      onChange={this.hodNameHandler}
                      className={classes.Inputfield}
                      required
                      autoFocus
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    className={classes.gridField}
                  >
                    <TextField
                      size="small"
                      variant="outlined"
                      id="hod"
                      label="Enter Head of Department Email"
                      value={this.state.hod}
                      onChange={this.hodHandler}
                      className={classes.Inputfield}
                      required
                    />
                  </Grid>
                  {/* <Grid item xs={12} className={classes.gridField}>
                    <Typography className={classes.InputTitle}>
                      Enter Project Incharge Details:
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    className={classes.gridField}
                  >
                    <TextField
                      size="small"
                      variant="outlined"
                      id="hodName"
                      label="Enter Project Incharge Name"
                      value={this.state.picName}
                      onChange={this.picNameHandler}
                      className={classes.Inputfield}
                      required
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    className={classes.gridField}
                  >
                    <TextField
                      size="small"
                      variant="outlined"
                      id="pic"
                      label="Enter Project Incharge Email"
                      value={this.state.pic}
                      onChange={this.picHandler}
                      className={classes.Inputfield}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.gridField}>
                    <Typography className={classes.InputTitle}>
                      Enter Internal Guide Details:
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    className={classes.gridField}
                  >
                    <TextField
                      size="small"
                      variant="outlined"
                      id="hodName"
                      label="Enter Internal Guide Name"
                      value={this.state.igName}
                      onChange={this.igNameHandler}
                      className={classes.Inputfield}
                      required
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    className={classes.gridField}
                  >
                    <TextField
                      size="small"
                      variant="outlined"
                      id="ig"
                      label="Enter Internal Guide Email"
                      value={this.state.ig}
                      onChange={this.igHandler}
                      className={classes.Inputfield}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.gridField}>
                    <Typography className={classes.InputTitle}>
                      Upload Student List File:
                    </Typography>
                  </Grid> */}
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    className={classes.gridField}
                  >
                    <Input
                      className={classes.Input}
                      type="file"
                      id="file"
                      name="student_file"
                      onChange={this.fileValidation}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.gridField}>
                    <div style={{ alignItems: "center", margin: "0 30%" }}>
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        className={classes.submit}
                        startIcon={<CloudUploadIcon />}
                        style={{
                          padding: "8px 50px",
                          fontSize: "18px",
                          backgroundColor: "#1877f2",
                          margin: "25px"
                        }}
                      >
                        Submit
                      </Button>
                      <Snackbar
                        open={this.state.openSuccess}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                      >
                        <Alert onClose={this.handleClose} severity="success">
                          Data submitted successfully
                        </Alert>
                      </Snackbar>
                      <Snackbar
                        open={this.state.openFailure}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                      >
                        <Alert onClose={this.handleClose} severity="error">
                          Data not submitted successfully
                        </Alert>
                      </Snackbar>
                    </div>
                  </Grid>
                </Grid>
              </form>
            </div>
            <footer className={classes.footer}>
              <Footer />
            </footer>
          </div>
        );
      }
      if (Ad !== 0) {
        return (
          <React.Fragment>
            <LoggedNavbar />
            <Profile userInfo={userInfo} />
            <div
              style={{
                width: "90%",
                margin: "auto",
                textAlign: "left",
                marginTop: "50px",
                boxShadow:
                  "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)"
              }}
              className={classes.root}
            >
              <ProjectList Groups={Groups} />
            </div>
            <footer className={classes.footer}>
              <Footer />
            </footer>
          </React.Fragment>
        );
      }
    } else return <LinearProgress />;
  }
}

export default withStyles(useStyles)(AdminContent);
