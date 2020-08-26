import React, { Component } from "react";
import LoggedNavbar from "../Navbar/LoggedNavbar";
import SERVER_URL from "../../Pages/URL";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";
import {
  LinearProgress,
  TextField,
  withStyles,
  Container,
  Grid,
  Typography,
  Button,
  Input
} from "@material-ui/core";

let Ad = null;
let filled = false;
let Groups = null;

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      width: "70%"
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
  }
});

class AdminContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hod: "",
      hodName: "",
      student_file: null,
      pic: "",
      picName: "",
      ig: "",
      igName: "",
      adData: null,
      filled
    };
  }

  hodHandler = e => {
    this.setState({ hod: e.target.value });
  };
  hodNameHandler = e => {
    this.setState({ hodName: e.target.value });
  };

  picHandler = e => {
    this.setState({ pic: e.target.value });
  };
  picNameHandler = e => {
    this.setState({ picName: e.target.value });
  };
  igHandler = e => {
    this.setState({ ig: e.target.value });
  };
  igNameHandler = e => {
    this.setState({ igName: e.target.value });
  };
  // studentfileHandler = e => {
  //   this.fileValidation(e);
  // };

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    var formData = new FormData();
    formData.append("hodName", this.state.hodName);
    formData.append("hodEmail", this.state.hod);
    formData.append("igName", this.state.igName);
    formData.append("igEmail", this.state.ig);
    formData.append("picName", this.state.picName);
    formData.append("picEmail", this.state.pic);
    formData.append("student_file", this.state.student_file);
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
      .then(function (res) {})
      .catch(function (err) {
        if (err) throw err;
      });
    this.setState({ hod: "", student_file: null, pic: "", ig: "" });
  };

  fileValidation = e => {
    var fileInput = document.getElementById("file");

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.csv)$/i;

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
        console.log(Ad);
        console.log("Groups:", Groups);

        this.setState(
          {
            adData: "new",
            filled: true
          },
          console.log(this.state.adData, this.state.filled)
        );
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
    if (this.state.adData === null) {
      this.checkData();
    }

    if (this.state.filled === true) {
      if (Ad == 0) {
        return (
          <div>
            <LoggedNavbar />
            <Container component="main" maxWidth="lg">
              <div
                className={classes.paper}
                style={{
                  boxShadow:
                    "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
                  backgroundColor: "#fff",
                  borderRadius: "6px"
                }}
              >
                <Typography variant="h2" style={{ margin: "25px 0" }}>
                  Create Project List
                </Typography>
                <form className={classes.form} onSubmit={this.submitHandler}>
                  <TextField
                    size="small"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="hodName"
                    label="Enter Head of Department Name"
                    value={this.state.hodName}
                    onChange={this.hodNameHandler}
                    required
                    autoFocus
                  />
                  <TextField
                    size="small"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="hod"
                    label="Enter Head of Department Email"
                    value={this.state.hod}
                    onChange={this.hodHandler}
                    required
                  />
                  <TextField
                    size="small"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="hodName"
                    label="Enter Project Incharge Name"
                    value={this.state.picName}
                    onChange={this.picNameHandler}
                    required
                  />
                  <TextField
                    size="small"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="pic"
                    label="Enter Project Incharge Email"
                    value={this.state.pic}
                    onChange={this.picHandler}
                    required
                  />
                  <TextField
                    size="small"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="hodName"
                    label="Enter Internal Guide Name"
                    value={this.state.igName}
                    onChange={this.igNameHandler}
                    required
                  />
                  <TextField
                    size="small"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="ig"
                    label="Enter Internal Guide Email"
                    value={this.state.ig}
                    onChange={this.igHandler}
                    required
                  />
                  <Typography
                    style={{
                      width: "45%",
                      float: "left",
                      marginTop: "25px",
                      marginBottom: "25px",
                      color: "#606060"
                    }}
                  >
                    Upload Student File:
                  </Typography>
                  <Input
                    className={classes.Input}
                    type="file"
                    id="file"
                    name="student_file"
                    onChange={this.fileValidation}
                    required
                  />
                  <div style={{ alignItems: "center", margin: "0 30%" }}>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      className={classes.submit}
                      startIcon={<CloudUploadIcon />}
                      style={{
                        padding: "8pxpx",
                        fontSize: "18px",
                        backgroundColor: "#1877f2",
                        margin: "25px"
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </Container>
          </div>
        );
      }
      if (Ad != 0) {
        return (
          <React.Fragment>
            <LoggedNavbar />
            <div>
              {Groups.map(group => {
                let members = group.members;
                return (
                  <div className="group-container" key={group.name}>
                    <h1>{group.name}</h1>
                    <hr className="hor" />
                    {/* <div>
                      <h1 className="member-title">Members</h1>
                      {members.map(member => {
                        return (
                          <h1 className="membertag" key={member}>
                            {member}
                          </h1>
                        );
                      })}
                    </div> */}
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        );
      }
    } else return <LinearProgress />;
  }
}

export default withStyles(useStyles)(AdminContent);
