import React, { Component } from "react";
import PropTypes from "prop-types";
import SERVER_URL from "../../Pages/URL";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import {Typography, TextField, Grid, Button, withStyles, CircularProgress, Tabs, Tab, Box, AppBar, createMuiTheme, ThemeProvider, responsiveFontSizes, Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
let stuData = null;
let Stu = null;
let filled = false;
let Proposals = null;
let pref1=[];
let pref2=[];
let pref3=[];

const useStyles = theme => ({
  formControl: {
    float: "left",
    minWidth: 120,
  },
  buttonprop: {
    padding: "10px",
    fontSize: "18px",
    color: "#fff",
    fontWeight: "bolder",
    backgroundColor: "#1877f2",
    marginBottom: "25px"
  },
  TextField: {
    width: "100%"
  },
  typography:{
    fontSize:"16px",
    display:"flex",
    textAlign:"left"
  },
  typographyFilled:{
    fontWeight:"700",
    fontSize:"20px",
    display:"flex",
    textAlign:"left"
  },
  tabPanel:{
    borderTop:"1px solid #000",
    width:"100%"
  },
  largeWinTabs:{
    [theme.breakpoints.down('700')]: {
      display:"none"
    },
  },
  smallWinTabs:{
    [theme.breakpoints.up('700')]: {
      display:"none"
    },
  },
});


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

class StudentContent extends Component {


  constructor(props) {
    super(props);
    this.state = {
      preferences: [
        {
          filled: false,
          prefno: 1,
          Top: "",
          Dos: "",
          Dsop: "",
          Agency: "",
          Mtap: "",
          Red: "",
          Shr: "",
          Type: "",
          Cat: "",
          selectedFile: null
        },
        {
          filled: false,
          prefno: 2,
          Top: "",
          Dos: "",
          Dsop: "",
          Agency: "",
          Mtap: "",
          Red: "",
          Shr: "",
          Type: "",
          Cat: "",
          selectedFile: null
        },
        {
          filled: false,
          prefno: 3,
          Top: "",
          Dos: "",
          Dsop: "",
          Agency: "",
          Mtap: "",
          Red: "",
          Shr: "",
          Type: "",
          Cat: "",
          selectedFile: null
        }
      ],
      currentStep: 1,
      stuData: null,
      tabValue: 0,
      filled,
      openSuccess: false,
      openFailure: false,
      formFilled: false,
      loading: false,
      open:false
    };
  }

  handleClickOpen = () => {
    this.setState({open:true})
  };

  handleAgreeClickClose = () => {
    Stu=0;
    this.setState({open:false})
  }
  handleCancelClickClose = () => {
    this.setState({open:false})
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      openSuccess: false,
      openFailure: false,
      stuData: null
    });
  };

  handleChange = (event, newValue) => {
    this.setState({
      tabValue: newValue
    });
  };

  handleTopChange = (e, pn) => {
    let prefs = [...this.state.preferences];
    for (var i = 0; i < 3; i++) {
      //let prefno = prefs[i].prefno;
      if (i === pn - 1) {
        //let pref=[...prefs[i]];
        prefs[i].Top = e.target.value;
        //prefs[i]=pref;
        this.setState({ preferences: prefs });
      }
    }
  };

  handleDosChange = (e, pn) => {
    let prefs = [...this.state.preferences];
    for (var i = 0; i < 3; i++) {
      if (i === pn - 1) {
        //let pref=[...prefs[i]];
        prefs[i].Dos = e.target.value;
        // prefs[i]=pref;
        this.setState({ preferences: prefs });
      }
    }
  };

  handleDsopChange = (e, cs) => {
    let prefs = [...this.state.preferences];
    for (var i = 0; i < 3; i++) {
      if (i === cs - 1) {
        //let pref=[...prefs[i]];
        prefs[i].Dsop = e.target.value;
        // prefs[i]=pref;
        this.setState({ preferences: prefs });
      }
    }
  };

  handleAgencyChange = (e, cs) => {
    let prefs = [...this.state.preferences];
    for (var i = 0; i < 3; i++) {
      if (i === cs - 1) {
        //let pref=[...prefs[i]];
        prefs[i].Agency = e.target.value;
        // prefs[i]=pref;
        this.setState({ preferences: prefs });
      }
    }
  };

  handleMtapChange = (e, cs) => {
    let prefs = [...this.state.preferences];
    for (var i = 0; i < 3; i++) {
      if (i === cs - 1) {
        //let pref=[...prefs[i]];
        prefs[i].Mtap = e.target.value;
        // prefs[i]=pref;
        this.setState({ preferences: prefs });
      }
    }
  };

  handleRedChange = (e, cs) => {
    let prefs = [...this.state.preferences];
    for (var i = 0; i < 3; i++) {
      if (i === cs - 1) {
        //let pref=[...prefs[i]];
        prefs[i].Red = e.target.value;
        // prefs[i]=pref;
        this.setState({ preferences: prefs });
      }
    }
  };

  handleShrChange = (e, cs) => {
    let prefs = [...this.state.preferences];
    for (var i = 0; i < 3; i++) {
      if (i === cs - 1) {
        //let pref=[...prefs[i]];
        prefs[i].Shr = e.target.value;
        // prefs[i]=pref;
        this.setState({ preferences: prefs });
      }
    }
  };

  handleTypeOPChange = (e, cs) => {
    let prefs = [...this.state.preferences];
    for (var i = 0; i < 3; i++) {
      if (i === cs - 1) {
        //let pref=[...prefs[i]];
        prefs[i].Type = e.target.value;
        // prefs[i]=pref;
        this.setState({ preferences: prefs });
      }
    }
  };

  handleCatChange = (e, cs) => {
    let prefs = [...this.state.preferences];
    for (var i = 0; i < 3; i++) {
      if (i === cs - 1) {
        //let pref=[...prefs[i]];
        prefs[i].Cat = e.target.value;
        // prefs[i]=pref;
        this.setState({ preferences: prefs });
      }
    }
  };

  handleFileChange = (e, cs) => {
    let prefs = [...this.state.preferences];
    for (var i = 0; i < 3; i++) {
      if (i === cs - 1) {
        prefs[i].selectedFile = e.target.files[0];
        this.setState({ preferences: prefs });
      }
    }
  };

  handleClick = (e, pn) => {
    e.preventDefault();
    if (this.state.currentStep === 3) {
      let prefs = [...this.state.preferences];
      for (var i = 0; i < 3; i++) {
        if (i === pn - 1) {
          //let pref=[...prefs[i]];
          prefs[i].filled = true;
          // prefs[i]=pref;
          this.setState({ preferences: prefs });
          this.handleSubmit(e);
        }
      }
    } else {
      let prefs = [...this.state.preferences];
      for (i = 0; i < 3; i++) {
        if (i === pn - 1) {
          //let pref=[...prefs[i]];
          prefs[i].filled = true;
          // prefs[i]=pref;
          this.setState({ preferences: prefs });
        }
      }
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    let pref1 = this.state.preferences[0];
    let pref2 = this.state.preferences[1];
    let pref3 = this.state.preferences[2];
    let proposals = [
      {
        title: pref1.Top,
        specialization: pref1.Dos,
        details: pref1.Dsop,
        agency: pref1.Agency,
        method: pref1.Mtap,
        result: pref1.Red,
        requirements: pref1.Shr,
        category: pref1.Cat,
        typeOfProject: pref1.Type
      },
      {
        title: pref2.Top,
        specialization: pref2.Dos,
        details: pref2.Dsop,
        agency: pref2.Agency,
        method: pref2.Mtap,
        result: pref2.Red,
        requirements: pref2.Shr,
        category: pref2.Cat,
        typeOfProject: pref2.Type
      },
      {
        title: pref3.Top,
        specialization: pref3.Dos,
        details: pref3.Dsop,
        agency: pref3.Agency,
        method: pref3.Mtap,
        result: pref3.Red,
        requirements: pref3.Shr,
        category: pref3.Cat,
        typeOfProject: pref3.Type
      }
    ];
    var formData = new FormData();
    formData.append("proposals", JSON.stringify(proposals));
    formData.append("file1", this.state.preferences[0].selectedFile);
    formData.append("file2", this.state.preferences[1].selectedFile);
    formData.append("file3", this.state.preferences[2].selectedFile);
    this.setState({ loading: true });
    axios({
      method: "post",
      url: SERVER_URL + "/student",
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
  };

  checkData = () => {
    axios({
      method: "get",
      url: SERVER_URL + "/group",
      withCredentials: true,
      headers : {
                Authorization : 'Bearer '+localStorage.getItem("access_token"),
            }
    })
      .then(res => {
        Stu = res.data.proposals.length;
        Proposals = res.data.proposals;
        pref1 = Proposals[0]
        pref2 = Proposals[1]
        pref3 = Proposals[2]
        this.setState({
          stuData: "new",
          filled: true
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  _next = e => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });
    this.handleClick(e, currentStep - 1);
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  };

  handleNext = e => {
    e.preventDefault();
    let currentStep = this.state.currentStep;
    let {
      Top,
      Dos,
      Dsop,
      Agency,
      Mtap,
      Red,
      Shr,
      Type,
      Cat,
      selectedFile
    } = this.state.preferences[currentStep - 1];
    if (
      Top === "" ||
      Dos === "" ||
      Dsop === "" ||
      Agency === "" ||
      Mtap === "" ||
      Red === "" ||
      Shr === "" ||
      Type === "" ||
      Cat === "" ||
      selectedFile === null
    ) {
      alert("Please enter all the details of the preference");
    } else {
      console.log(this.state.preferences[currentStep-1])
      this.setState({ open: true });
      this._next(e);
    }
  };

  render() {
    const { classes } = this.props;
    stuData = this.state.stuData;
    filled = this.state.filled;
    if (this.state.loading) {
      return (
        <div style={{ margin: "auto" }}>
          <CircularProgress />
        </div>
      );
    }
    if (stuData === null) {
      this.checkData();
    }
    if (filled === true) {
      if (Stu === 0) {
        return (
          <React.Fragment>
            <form>
              <Step1
                classes={classes}
                currentStep={this.state.currentStep}
                preferences={this.state.preferences}
                handleTopChange={this.handleTopChange}
                handleDosChange={this.handleDosChange}
                handleDsopChange={this.handleDsopChange}
                handleAgencyChange={this.handleAgencyChange}
                handleClick={this.handleClick}
                handleNext={this.handleNext}
                handleMtapChange={this.handleMtapChange}
                handleRedChange={this.handleRedChange}
                handleShrChange={this.handleShrChange}
                handleTypeOPChange={this.handleTypeOPChange}
                handleCatChange={this.handleCatChange}
                handleClose={this.handleClose}
                handleFileChange={this.handleFileChange}
              />
              <Step2
                classes={classes}
                currentStep={this.state.currentStep}
                preferences={this.state.preferences}
                handleTopChange={this.handleTopChange}
                handleDosChange={this.handleDosChange}
                handleDsopChange={this.handleDsopChange}
                handleAgencyChange={this.handleAgencyChange}
                handleClick={this.handleClick}
                handleNext={this.handleNext}
                handleMtapChange={this.handleMtapChange}
                handleRedChange={this.handleRedChange}
                handleShrChange={this.handleShrChange}
                handleTypeOPChange={this.handleTypeOPChange}
                handleCatChange={this.handleCatChange}
                handleFileChange={this.handleFileChange}
                previousButton={this.previousButton}
                handleClose={this.handleClose}
                _prev={this._prev}
              />
              <Step3
                classes={classes}
                openSuccess={this.state.openSuccess}
                openFailure={this.state.openFailure}
                handleClose={this.handleClose}
                currentStep={this.state.currentStep}
                preferences={this.state.preferences}
                handleTopChange={this.handleTopChange}
                handleDosChange={this.handleDosChange}
                handleDsopChange={this.handleDsopChange}
                handleAgencyChange={this.handleAgencyChange}
                handleClick={this.handleClick}
                handleSubmit={this.handleSubmit}
                handleMtapChange={this.handleMtapChange}
                handleRedChange={this.handleRedChange}
                handleShrChange={this.handleShrChange}
                handleTypeOPChange={this.handleTypeOPChange}
                handleCatChange={this.handleCatChange}
                handleFileChange={this.handleFileChange}
                previousButton={this.previousButton}
                _prev={this._prev}
              />
              {/* {this.previousButton()} */}
            </form>
          </React.Fragment>
        );
      }
      if (Stu !== 0) {
        let value=this.state.tabValue;
          return (
            <React.Fragment>
              {!(pref1.approval.admin||pref2.approval.admin||pref3.approval.admin)?(
                <React.Fragment>
                  <Button onClick={this.handleClickOpen} style={{float:"right",margin:"5px 0"}} variant="contained" color="secondary">
                    Re-enter Proposals
                  </Button>
                  <Dialog
                    open={this.state.open}
                    onClose={this.handleClickClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{"Re-enter the proposals?"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        If you click ok then you have to re-enter the proposals completely. If you refresh the page or close the tabs then all your changes will be lost. 
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleCancelClickClose} color="primary" autoFocus>
                        Cancel
                      </Button>
                      <Button onClick={this.handleAgreeClickClose} color="primary" autoFocus>
                        Agree
                      </Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
              ):(null)}
              <div className={classes.largeWinTabs}>
                <AppBar position="static" color="primary">
                  <Tabs value={value} onChange={this.handleChange} aria-label="simple tabs example" indicatorColor="secondary" textColor="secondary" centered>
                    <Tab style={{color:"white"}} label="Preference 1" {...a11yProps(0)} />
                    <Tab style={{color:"white"}} label="Preference 2" {...a11yProps(1)} />
                    <Tab style={{color:"white"}} label="Preference 3" {...a11yProps(2)} />
                  </Tabs>
                </AppBar>
                <TabPanel className={classes.tabPanel} value={value} index={0}>
                  <Grid container spacing={3}>
                    <Grid className={classes.typographyFilled} item xs={12} sm={6}>
                      <Typography><b>Title of Preference : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12} sm={6}>
                      <Typography>{pref1.title}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12} sm={6}>
                      <Typography><b>Domain/Area of Specialization : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref1.specialization}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Detailed Statement of Problem : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref1.details}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Internal agency/external agency/CTL/Mastek/or any other : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref1.agency}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Method/Technique/Algorithm proposed : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref1.method}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Results Expected : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref1.result}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Software and Hardware requirements : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref1.requirements}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Type of Project : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref1.typeOfProject}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Category of Project : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref1.category}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>IEEE / ACM / Springer Journal Paper : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        window.open(
                          `${SERVER_URL}/${pref1.attachPrints}`
                        );
                      }}
                    >
                      Uploaded Document
                    </Button>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel className={classes.tabPanel} value={value} index={1}>
                  <Grid container spacing={3}>
                    <Grid className={classes.typographyFilled} item xs={12} sm={6}>
                      <Typography><b>Title of Preference : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref2.title}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Domain/Area of Specialization : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref2.specialization}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Detailed Statement of Problem : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref2.details}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Internal agency/external agency/CTL/Mastek/or any other : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref2.agency}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Method/Technique/Algorithm proposed : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref2.method}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Results Expected : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref2.result}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Software and Hardware requirements : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref2.requirements}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Type of Project : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref2.typeOfProject}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Category of Project : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref2.category}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>IEEE / ACM / Springer Journal Paper : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        window.open(
                          `${SERVER_URL}/${pref2.attachPrints}`
                        );
                      }}
                    >
                      Uploaded Document
                    </Button>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel className={classes.tabPanel} value={value} index={2}>
                  <Grid container spacing={3}>
                    <Grid className={classes.typographyFilled} item xs={12} sm={6}>
                      <Typography><b>Title of Preference : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref3.title}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Domain/Area of Specialization : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref3.specialization}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Detailed Statement of Problem : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref3.details}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Internal agency/external agency/CTL/Mastek/or any other : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref3.agency}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Method/Technique/Algorithm proposed : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref3.method}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Results Expected : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref3.result}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Software and Hardware requirements : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref3.requirements}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Type of Project : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref3.typeOfProject}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Category of Project : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref3.category}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>IEEE / ACM / Springer Journal Paper : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        window.open(
                          `${SERVER_URL}/${pref3.attachPrints}`
                        );
                      }}
                    >
                      Uploaded Document
                    </Button>
                    </Grid>
                  </Grid>
                </TabPanel>
              </div>
              <div className={classes.smallWinTabs}>
                <AppBar position="static" color="primary">
                  <Tabs variant="scrollable" scrollButtons="on" value={value} onChange={this.handleChange} aria-label="simple tabs example" indicatorColor="secondary" textColor="secondary">
                    <Tab style={{color:"white"}} label="Preference 1" {...a11yProps(0)} />
                    <Tab style={{color:"white"}} label="Preference 2" {...a11yProps(1)} />
                    <Tab style={{color:"white"}} label="Preference 3" {...a11yProps(2)} />
                  </Tabs>
                </AppBar>
                <TabPanel className={classes.tabPanel} value={value} index={0}>
                  <Grid container spacing={3}>
                    <Grid className={classes.typographyFilled} item xs={12} sm={6}>
                      <Typography><b>Title of Preference : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref1.title}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Domain/Area of Specialization : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref1.specialization}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Detailed Statement of Problem : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref1.details}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Internal agency/external agency/CTL/Mastek/or any other : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref1.agency}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Method/Technique/Algorithm proposed : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref1.method}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Results Expected : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref1.result}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Software and Hardware requirements : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref1.requirements}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Type of Project : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref1.typeOfProject}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Category of Project : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref1.category}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>IEEE / ACM / Springer Journal Paper : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        window.open(
                          `${SERVER_URL}/${pref1.attachPrints}`
                        );
                      }}
                    >
                      Uploaded Document
                    </Button>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel className={classes.tabPanel} value={value} index={1}>
                  <Grid container spacing={2}>
                    <Grid className={classes.typographyFilled} item xs={12} sm={6}>
                      <Typography><b>Title of Preference : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref2.title}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Domain/Area of Specialization : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref2.specialization}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Detailed Statement of Problem : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref2.details}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Internal agency/external agency/CTL/Mastek/or any other : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref2.agency}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Method/Technique/Algorithm proposed : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref2.method}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Results Expected : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref2.result}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Software and Hardware requirements : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref2.requirements}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Type of Project : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref2.typeOfProject}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Category of Project : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref2.category}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>IEEE / ACM / Springer Journal Paper : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        window.open(
                          `${SERVER_URL}/${pref2.attachPrints}`
                        );
                      }}
                    >
                      Uploaded Document
                    </Button>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel className={classes.tabPanel} value={value} index={2}>
                  <Grid container spacing={2}>
                    <Grid className={classes.typographyFilled} item xs={12} sm={6}>
                      <Typography><b>Title of Preference : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref3.title}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Domain/Area of Specialization : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref3.specialization}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Detailed Statement of Problem : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref3.details}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Internal agency/external agency/CTL/Mastek/or any other : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref3.agency}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Method/Technique/Algorithm proposed : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref3.method}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Results Expected : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref3.result}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Software and Hardware requirements : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref3.requirements}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Type of Project : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref3.typeOfProject}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>Category of Project : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography>{pref3.category}</Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                      <Typography><b>IEEE / ACM / Springer Journal Paper : </b></Typography>
                    </Grid>
                    <Grid className={classes.typographyFilled} item xs={12}sm={6}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        window.open(
                          `${SERVER_URL}/${pref3.attachPrints}`
                        );
                      }}
                    >
                      Uploaded Document
                    </Button>
                    </Grid>
                  </Grid>
                </TabPanel>
            </div>
          </React.Fragment>
        );
      }
    }
    return (
      <React.Fragment>
        <CircularProgress />
      </React.Fragment>
    );
  }
}

function Step1(props) {
  const classes = props.classes;
  if (props.currentStep !== 1) {
    return null;
  } else {
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <Grid component={"span"} item xs={12}>
            <Typography component={"span"} variant="h3">
              Preference 1
            </Typography>
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>Title of Preference : </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="standard"
              component={"span"}
              id="Top"
              name="Top"
              type="text"
              value={props.preferences[0].Top}
              onChange={e => {
                props.handleTopChange(e, props.preferences[0].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Domain of Specialization :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="outlined"
              component={"span"}
              multiline
              inputProps={{style: {fontSize: 14}}}
              rows={3}
              id="Dos"
              name="Dos"
              type="text"
              value={props.preferences[0].Dos}
              onChange={e => {
                props.handleDosChange(e, props.preferences[0].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Detailed Statement of Problem :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="outlined"
              component={"span"}
              multiline
              inputProps={{style: {fontSize: 14}}}
              rows={3}
              id="Dsop"
              name="Dsop"
              type="text"
              value={props.preferences[0].Dsop}
              onChange={e => {
                props.handleDsopChange(e, props.preferences[0].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Internal agency / external agency / CTL / Mastek/or any other :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="outlined"
              component={"span"}
              multiline
              inputProps={{style: {fontSize: 14}}}
              rows={3}
              id="agency"
              name="agency"
              type="text"
              value={props.preferences[0].Agency}
              onChange={e => {
                props.handleAgencyChange(e, props.preferences[0].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Method/Technique/Algorithm proposed :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="outlined"
              component={"span"}
              multiline
              inputProps={{style: {fontSize: 14}}}
              rows={3}
              id="Mtap"
              name="Mtap"
              type="text"
              value={props.preferences[0].Mtap}
              onChange={e => {
                props.handleMtapChange(e, props.preferences[0].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>Results Expected : </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="outlined"
              multiline
              inputProps={{style: {fontSize: 14}}}
              rows={3}
              component={"span"}
              id="Red"
              name="Red"
              type="text"
              value={props.preferences[0].Red}
              onChange={e => {
                props.handleRedChange(e, props.preferences[0].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Software and Hardware requirements :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="outlined"
              multiline
              inputProps={{style: {fontSize: 14}}}
              rows={3}
              component={"span"}
              id="Shr"
              name="Shr"
              type="text"
              value={props.preferences[0].Shr}
              onChange={e => {
                props.handleShrChange(e, props.preferences[0].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Type of Project :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="Type1-simple-select-label">Type</InputLabel>
              <Select value={props.preferences[0].Type} id="Type" name="Type" onChange={e => {props.handleTypeOPChange(e, props.preferences[0].prefno);}}
              >
                <MenuItem value="Inhouse">Inhouse</MenuItem>
                <MenuItem value="Outhouse">Outhouse</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Category of Project :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="cat1-simple-select-label">Category</InputLabel>
            <Select
              id="Cat"
              name="Cat"
              value={props.preferences[0].Cat}
              onChange={e => {
                props.handleCatChange(e, props.preferences[0].prefno);
              }}
            >
              <MenuItem value="Innovative">Innovative</MenuItem>
              <MenuItem value="Research Oriented">Research Oriented</MenuItem>
              <MenuItem value="NGO Based">NGO Based</MenuItem>
              <MenuItem value="Social Need">Social Need</MenuItem>
              <MenuItem value="Education Based">Education Based</MenuItem>
              <MenuItem value="Real Time">Real Time</MenuItem>
            </Select>
          </FormControl>
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              IEEE / ACM / Springer Journal Paper :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="standard"
              component={"span"}
              id="file"
              name="file"
              type="file"
              onChange={e => {
                props.handleFileChange(e, props.preferences[0].prefno);
              }}
              required
            />
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Button
              className={classes.buttonprop}
              variant="contained"
              component={"span"}
              onClick={props.handleNext}
            >
              Next
            </Button>
          </Grid>
          <Grid item xs={4} />
        </Grid>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

function Step2(props) {
  const classes = props.classes;
  if (props.currentStep !== 2) {
    return null;
  } else {
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <Grid component={"span"} item xs={12}>
            <Typography component={"span"} variant="h3">
              Preference 2
            </Typography>
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>Title of Preference : </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="standard"
              component={"span"}
              id="Top"
              name="Top"
              type="text"
              value={props.preferences[1].Top}
              onChange={e => {
                props.handleTopChange(e, props.preferences[1].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Domain of Specialization :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="outlined"
              multiline
              inputProps={{style: {fontSize: 14}}}
              rows={3}
              component={"span"}
              id="Dos"
              name="Dos"
              type="text"
              value={props.preferences[1].Dos}
              onChange={e => {
                props.handleDosChange(e, props.preferences[1].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Detailed Statement of Problem :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="outlined"
              multiline
              inputProps={{style: {fontSize: 14}}}
              rows={3}
              component={"span"}
              id="Dsop"
              name="Dsop"
              type="text"
              value={props.preferences[1].Dsop}
              onChange={e => {
                props.handleDsopChange(e, props.preferences[1].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Internal agency / external agency / CTL / Mastek/or any other :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="outlined"
              multiline
              inputProps={{style: {fontSize: 14}}}
              rows={3}
              component={"span"}
              id="agency"
              name="agency"
              type="text"
              value={props.preferences[1].Agency}
              onChange={e => {
                props.handleAgencyChange(e, props.preferences[1].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Method/Technique/Algorithm proposed :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="outlined"
              multiline
              inputProps={{style: {fontSize: 14}}}
              rows={3}
              component={"span"}
              id="Mtap"
              name="Mtap"
              type="text"
              value={props.preferences[1].Mtap}
              onChange={e => {
                props.handleMtapChange(e, props.preferences[1].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>Results Expected : </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="outlined"
              multiline
              inputProps={{style: {fontSize: 14}}}
              rows={3}
              component={"span"}
              id="Red"
              name="Red"
              type="text"
              value={props.preferences[1].Red}
              onChange={e => {
                props.handleRedChange(e, props.preferences[1].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Software and Hardware requirements :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="outlined"
              multiline
              inputProps={{style: {fontSize: 14}}}
              rows={3}
              component={"span"}
              id="Shr"
              name="Shr"
              type="text"
              value={props.preferences[1].Shr}
              onChange={e => {
                props.handleShrChange(e, props.preferences[1].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Type of Project :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="Type2-simple-select-label">Type</InputLabel>
              <Select value={props.preferences[1].Type} id="Type" name="Type" onChange={e => {props.handleTypeOPChange(e, props.preferences[1].prefno);}}
              >
                <MenuItem value="Inhouse">Inhouse</MenuItem>
                <MenuItem value="Outhouse">Outhouse</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Category of Project :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="cat2-simple-select-label">Category</InputLabel>
            <Select
              id="Cat"
              name="Cat"
              value={props.preferences[1].Cat}
              onChange={e => {
                props.handleCatChange(e, props.preferences[1].prefno);
              }}
            >
              <MenuItem value="Innovative">Innovative</MenuItem>
              <MenuItem value="Research Oriented">Research Oriented</MenuItem>
              <MenuItem value="NGO Based">NGO Based</MenuItem>
              <MenuItem value="Social Need">Social Need</MenuItem>
              <MenuItem value="Education Based">Education Based</MenuItem>
              <MenuItem value="Real Time">Real Time</MenuItem>
            </Select>
          </FormControl>
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              IEEE / ACM / Springer Journal Paper :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="standard"
              component={"span"}
              id="file"
              name="file"
              type="file"
              onChange={e => {
                props.handleFileChange(e, props.preferences[1].prefno);
              }}
              required
            />
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={4}>
            <Button
              className={classes.buttonprop}
              variant="contained"
              component={"span"}
              onClick={props._prev}
            >
              Previous
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              className={classes.buttonprop}
              variant="contained"
              component={"span"}
              onClick={props.handleNext}
            >
              Next
            </Button>
            {/* <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
              <Alert onClose={props.handleClose} severity="success">
                Preference 2 submitted successfully
              </Alert>
            </Snackbar> */}
          </Grid>
          <Grid item xs={2} />
        </Grid>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

function Step3(props) {
  const classes = props.classes;
  if (props.currentStep !== 3) {
    return null;
  } else {
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <Grid component={"span"} item xs={12}>
            <Typography component={"span"} variant="h3">
              Preference 3
            </Typography>
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>Title of Preference : </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="standard"
              component={"span"}
              id="Top"
              name="Top"
              type="text"
              value={props.preferences[2].Top}
              onChange={e => {
                props.handleTopChange(e, props.preferences[2].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Domain of Specialization :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="outlined"
              multiline
              inputProps={{style: {fontSize: 14}}}
              rows={3}
              component={"span"}
              id="Dos"
              name="Dos"
              type="text"
              value={props.preferences[2].Dos}
              onChange={e => {
                props.handleDosChange(e, props.preferences[2].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Detailed Statement of Problem :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="outlined"
              multiline
              inputProps={{style: {fontSize: 14}}}
              rows={3}
              component={"span"}
              id="Dsop"
              name="Dsop"
              type="text"
              value={props.preferences[2].Dsop}
              onChange={e => {
                props.handleDsopChange(e, props.preferences[2].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Internal agency / external agency / CTL / Mastek/or any other :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="outlined"
              multiline
              inputProps={{style: {fontSize: 14}}}
              rows={3}
              component={"span"}
              id="agency"
              name="agency"
              type="text"
              value={props.preferences[2].Agency}
              onChange={e => {
                props.handleAgencyChange(e, props.preferences[2].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Method/Technique/Algorithm proposed :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="outlined"
              multiline
              inputProps={{style: {fontSize: 14}}}
              rows={3}
              component={"span"}
              id="Mtap"
              name="Mtap"
              type="text"
              value={props.preferences[2].Mtap}
              onChange={e => {
                props.handleMtapChange(e, props.preferences[2].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>Results Expected : </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="outlined"
              multiline
              inputProps={{style: {fontSize: 14}}}
              rows={3}
              component={"span"}
              id="Red"
              name="Red"
              type="text"
              value={props.preferences[2].Red}
              onChange={e => {
                props.handleRedChange(e, props.preferences[2].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Software and Hardware requirements :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="outlined"
              multiline
              inputProps={{style: {fontSize: 14}}}
              rows={3}
              component={"span"}
              id="Shr"
              name="Shr"
              type="text"
              value={props.preferences[2].Shr}
              onChange={e => {
                props.handleShrChange(e, props.preferences[2].prefno);
              }}
              required
            />
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Type of Project :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="Type1-simple-select-label">Type</InputLabel>
              <Select value={props.preferences[2].Type} id="Type" name="Type" onChange={e => {props.handleTypeOPChange(e, props.preferences[2].prefno);}}
              >
                <MenuItem value="Inhouse">Inhouse</MenuItem>
                <MenuItem value="Outhouse">Outhouse</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              Category of Project :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="cat1-simple-select-label">Category</InputLabel>
            <Select
              id="Cat"
              name="Cat"
              value={props.preferences[2].Cat}
              onChange={e => {
                props.handleCatChange(e, props.preferences[2].prefno);
              }}
            >
              <MenuItem value="Innovative">Innovative</MenuItem>
              <MenuItem value="Research Oriented">Research Oriented</MenuItem>
              <MenuItem value="NGO Based">NGO Based</MenuItem>
              <MenuItem value="Social Need">Social Need</MenuItem>
              <MenuItem value="Education Based">Education Based</MenuItem>
              <MenuItem value="Real Time">Real Time</MenuItem>
            </Select>
          </FormControl>
          </Grid>
          <Grid className={classes.typography} item xs={12}sm={6}>
            <Typography component={"span"}>
              IEEE / ACM / Springer Journal Paper :{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              className={classes.TextField}
              variant="standard"
              component={"span"}
              id="file"
              name="file"
              type="file"
              onChange={e => {
                props.handleFileChange(e, props.preferences[2].prefno);
              }}
              required
            />
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={4}>
            <Button
              className={classes.buttonprop}
              variant="contained"
              component={"span"}
              onClick={props._prev}
            >
              Previous
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              className={classes.buttonprop}
              variant="contained"
              component={"span"}
              type="submit"
              onClick={e => {
                props.handleClick(e, props.currentStep);
              }}
            >
              Submit
            </Button>
            <Snackbar
              open={props.openSuccess}
              autoHideDuration={6000}
              onClose={props.handleClose}
            >
              <Alert onClose={props.handleClose} severity="success">
                Preferences submitted successfully
              </Alert>
            </Snackbar>
            <Snackbar
              open={props.openFailure}
              autoHideDuration={6000}
              onClose={props.handleClose}
            >
              <Alert onClose={props.handleClose} severity="error">
                Preferences not submitted successfully
              </Alert>
            </Snackbar>
          </Grid>
          <Grid item xs={2} />
        </Grid>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(StudentContent);
