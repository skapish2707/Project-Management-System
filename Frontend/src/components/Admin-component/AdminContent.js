import React, { Component, Fragment } from "react";
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
  Snackbar,
  CircularProgress
} from "@material-ui/core";
import Profile from "../Profile";
import ProjectList from "./ProjectList";
import MuiAlert from "@material-ui/lab/Alert";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

function appendLeadingZeroes(n) {
  if (n <= 9) {
    return "0" + n;
  }
  return n;
}

//getting todays date
var tempDate = new Date();
var date =
  tempDate.getFullYear() +
  "-" +
  appendLeadingZeroes(tempDate.getMonth() + 1) +
  "-" +
  appendLeadingZeroes(tempDate.getDate());
console.log(date);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
let userInfo = [];
let Ad = null;
let filled = false;
let Groups = null;
let Guides=null;

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
      adData: null,
      filled,
      openSuccess: false,
      openFailure: false,
      loading: false,
      prefDueDate: date,
      Academicyear: "2020-2021"
    };
  }

  //to change format of the month
  appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }

  handleDateChange = date => {
    let current_datetime = date;
    let formatted_date =
      current_datetime.getFullYear() +
      "-" +
      this.appendLeadingZeroes(current_datetime.getMonth() + 1) +
      "-" +
      this.appendLeadingZeroes(current_datetime.getDate());
    this.setState({ prefDueDate: formatted_date });
    let a = new Date("2020-12-01");
    if (current_datetime < a) {
      console.log("success");
    } else if (current_datetime > a) {
      console.log("failed");
    }
    console.log(a);
  };

  //function to handle Academic Year
  handleAcademicYear = e => {
    this.setState({ Academicyear: e.target.value });
  };

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
    formData.append("student_file", this.state.student_file);
    formData.append("dueDate", this.state.prefDueDate);
    formData.append("acadYear", this.state.Academicyear);
    this.setState({ loading: true });
    axios({
      method: "post",
      url: SERVER_URL + "/admin",
      credentials: "include",
      withCredentials: true,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization : 'Bearer '+ localStorage.getItem("access_token")
      }
    })
      .then(res => {
        this.setState({ openSuccess: true, loading: false });
        window.location.reload(false);
      })
      .catch(err => {
        this.setState({ openFailure: true, loading: false });
        if (err) throw err;
      });
    this.setState({ hod: "", student_file: null, hodName: "" });
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
      withCredentials: true,
      headers : {
        Authorization : 'Bearer '+ localStorage.getItem("access_token") 
      }
    })
      .then(res => {
        Ad = res.data.length;
        // console.log(res.data)
        Groups = res.data;
        this.setState({
          adData: "new",
          filled: true
        });
      })

      .catch(function (err) {
        console.log(err);
      });
  }
  checkGuides(){
    axios({
      method: "get",
      url: SERVER_URL + "/getGuide",
      withCredentials: true,
      headers : {
        Authorization : 'Bearer '+ localStorage.getItem("access_token") 
      }
    })
    .then(res => {
      Guides = res.data;
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  render() {
    console.log(this.state.prefDueDate);
    let academicYear=this.state.Academicyear
    //console.log(academicYear);
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
      this.checkGuides();
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
                backgroundColor: "#fff"
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
                      Upload Student List File:
                    </Typography>
                  </Grid> */}
                  <Grid item xs={12} sm={12} md={6}>
                    <Grid container>
                      <Grid item xs={12} className={classes.gridField}>
                        <Typography className={classes.InputTitle}>
                          Enter Academic Year:
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        {" "}
                        <FormControl
                          variant="outlined"
                          label="Academic Year"
                          style={{ width: "60%", padding: "8px" }}
                        >
                          <Select
                            required
                            value={this.state.Academicyear}
                            onChange={this.handleAcademicYear}
                            name="Academic Year"
                          >
                            <MenuItem value="2020-2021">2020-2021</MenuItem>
                            <MenuItem value="2021-2022">2021-2022</MenuItem>
                            <MenuItem value="2022-2023">2022-2023</MenuItem>
                            <MenuItem value="2023-2024">2023-2024</MenuItem>
                            <MenuItem value="2024-2025">2024-2025</MenuItem>
                            <MenuItem value="2025-2026">2025-2026</MenuItem>
                            <MenuItem value="2026-2027">2026-2027</MenuItem>
                            <MenuItem value="2027-2028">2027-2028</MenuItem>
                            <MenuItem value="2028-2029">2028-2029</MenuItem>
                            <MenuItem value="2029-2030">2029-2030</MenuItem>
                            <MenuItem value="2030-2031">2030-2031</MenuItem>
                            <MenuItem value="2031-2032">2031-2032</MenuItem>
                            <MenuItem value="2032-2033">2032-2033</MenuItem>
                            <MenuItem value="2033-2034">2033-2034</MenuItem>
                            <MenuItem value="2034-2035">2034-2035</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Grid container>
                      <Grid item xs={12} className={classes.gridField}>
                        <Typography className={classes.InputTitle}>
                          Enter Due Date for Proposal Submission:
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            autoOk
                            required
                            variant="inline"
                            inputVariant="outlined"
                            format="yyyy/MM/dd"
                            value={this.state.prefDueDate}
                            InputAdornmentProps={{ position: "start" }}
                            onChange={this.handleDateChange}
                            style={{ width: "60%", padding: "8px" }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Typography className={classes.InputTitle}>
                      Upload Student Group List:
                    </Typography>
                  </Grid>
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
                      style={{
                        width: "60%",
                        padding: "12px"
                      }}
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
            <Profile academicYear={academicYear} userInfo={userInfo} />
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
              <ProjectList Groups={Groups} Guides={Guides} />
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
