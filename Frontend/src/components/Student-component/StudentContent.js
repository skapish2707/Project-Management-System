import React, { Component } from "react";
import PropTypes from 'prop-types';
import SERVER_URL from "../../Pages/URL";
import axios from "axios";
import qs from "qs";
import {Typography, TextField, Grid, Button, withStyles, CircularProgress, Paper, Tabs, Tab, Box, AppBar } from "@material-ui/core";

let Stu = null;
let filled = false;
let Proposals = null;

const useStyles = theme => ({
  buttonprop:{
    marginBottom: "5px"
  },
  TextField:{
    width:"90%",
  },
  typography:{
    display:"flex",
    justifyContent:"left"
  }
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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
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
          selectedFile: null
        }
      ],
      currentStep: 1,
      stuData: null,
      tabValue:0,
      filled
    };

  }
  
  handleChange = (event, newValue) => {
    this.setState({
      tabValue:newValue
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
        // console.log(this.state.preferences);
      }
    }
    //console.log(this.state.preferences)
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
    //console.log(this.state.preferences)
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
    //console.log(this.state.preferences)
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
    //console.log(this.state.preferences)
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
    //console.log(this.state.preferences)
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
    //console.log(this.state.preferences)
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
    //console.log(this.state.preferences)
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
      console.log("HELLO");
      let prefs = [...this.state.preferences];
      for (var i = 0; i < 3; i++) {
        if (i === pn - 1) {
          //let pref=[...prefs[i]];
          prefs[i].filled = true;
          // prefs[i]=pref;
          this.setState({ preferences: prefs });
          console.log(prefs[i].filled);
          this.handleSubmit(e);
        }
      }
    } else {
      let prefs = [...this.state.preferences];
      for (var i = 0; i < 3; i++) {
        if (i === pn - 1) {
          //let pref=[...prefs[i]];
          prefs[i].filled = true;
          // prefs[i]=pref;
          this.setState({ preferences: prefs });
          //console.log(prefs[i].filled);
        }
      }
    }

    console.log(this.state.preferences);
  };

  handleSubmit = e => {
    e.preventDefault();
    let pref1 = this.state.preferences[0];
    let pref2 = this.state.preferences[1];
    let pref3 = this.state.preferences[2];
    //console.log(pref1);
    let proposals = [
          {
            "title": pref1.Top,
            "specialization": pref1.Dos,
            "details": pref1.Dsop,
            "agency": pref1.Agency,
            "method": pref1.Mtap,
            "result": pref1.Red,
            "requirements": pref1.Shr
          },
          {
            "title": pref2.Top,
            "specialization": pref2.Dos,
            "details": pref2.Dsop,
            "agency": pref2.Agency,
            "method": pref2.Mtap,
            "result": pref2.Red,
            "requirements": pref2.Shr
          },
          {
            "title": pref3.Top,
            "specialization": pref3.Dos,
            "details": pref3.Dsop,
            "agency": pref3.Agency,
            "method": pref3.Mtap,
            "result": pref3.Red,
            "requirements": pref3.Shr
          }
    ]
    var formData = new FormData();
    formData.append("proposals",JSON.stringify(proposals));
    formData.append("file1",this.state.preferences[0].selectedFile);
    formData.append("file2",this.state.preferences[1].selectedFile);
    formData.append("file3",this.state.preferences[2].selectedFile);
    console.log(proposals)
    axios({
      method: "post",
      url: SERVER_URL + "/student",
      credentials: "include",
      withCredentials: true,
      data: formData,
      headers: {
       "Content-Type": "multipart/form-data"
      }
    })
      .then(function (res) {
        alert("Submitted");
      })
      .catch(function (err) {
        alert("Not Submitted");
        if (err) throw err;
      });
    
    console.log(this.state.preferences);
  };

  checkData = () => {
    axios({
      method: "get",
      url: SERVER_URL + "/group",
      withCredentials: true
    })
      .then(res => {
        console.log(res)
        Stu = res.data.proposals.length;
        Proposals = res.data.proposals;
        //console.log(Stu,Proposals)
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

  /*
   * the functions for our button
   */
  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <Button variant="contained" component={'span'} onClick={this._prev}>
          Previous
        </Button>
      );
    }
    return null;
  }

  handleNext = e => {
    e.preventDefault();
    let currentStep = this.state.currentStep;
    let {filled,prefno,Top,Dos,Dsop,Agency,Mtap,Red,Shr,selectedFile} = this.state.preferences[currentStep - 1];
    if (
      Top === "" || Dos === "" || Dsop === "" || Agency === "" || Mtap === "" || Red === "" || Shr === "" || selectedFile === null
    ) {
      alert("Please enter all the details of the preference");
    } else {
      // console.log(this.state.preferences);
      this._next(e);
    }
  };



  render() {
    const {classes} = this.props;
    if (this.state.stuData === null) {
      this.checkData();
    }
    if (this.state.filled === true) {
      if (Stu == 0) {
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
                handleFileChange={this.handleFileChange}
              />
              <Step3
                classes={classes}
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
                handleFileChange={this.handleFileChange}
              />
              {this.previousButton()}
            </form>
          </React.Fragment>
        );
      }
      if (Stu != 0) {
        let value=this.state.tabValue
        return (
          <React.Fragment>
            <div className={classes.root}>
                <Tabs value={value} onChange={this.handleChange} aria-label="simple tabs example" indicatorColor="primary" textColor="primary" centered>
                  <Tab label="Item One" {...a11yProps(0)} />
                  <Tab label="Item Two" {...a11yProps(1)} />
                  <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
              <TabPanel value={value} index={0}>
                Item one
              </TabPanel>
              <TabPanel value={value} index={1}>
                Item Two
              </TabPanel>
              <TabPanel value={value} index={2}>
                Item Three
              </TabPanel>
            </div>
          </React.Fragment>
        );
      }
    }
    return(
      <React.Fragment>
        <CircularProgress />
      </React.Fragment>
    ) 
  }
}

function Step1(props){
  const classes=props.classes;
  if(props.currentStep!==1){
    return null;
  }else{
    return(
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid component={'span'} item xs={12}>
            <Typography component={'span'} variant="h3">Preference 1</Typography>
          </Grid>
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Title of Preference : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'} id="Top" name="Top" type="text" value={props.preferences[0].Top}
            onChange={e => {
              props.handleTopChange(e, props.preferences[0].prefno);
            }}
            required />
          </Grid>
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Domain of Specialization : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
              id="Dos"
              name="Dos"
              type="text"
              value={props.preferences[0].Dos}
              onChange={e => {
                props.handleDosChange(e, props.preferences[0].prefno);
              }}
              required />
          </Grid>
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Detailed Statement of Problem : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
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
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Internal agency / external agency / CTL / Mastek/or any other : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
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
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Method/Technique/Algorithm proposed : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
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
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Results Expected : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
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
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Software and Hardware requirements : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
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
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>IEEE / ACM / Springer Journal Paper : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
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
            <Button className={classes.buttonprop} variant="contained" component={'span'} onClick={props.handleNext}>Next</Button>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </React.Fragment>
    );
  }
}

function Step2(props){
  const classes=props.classes;
  if(props.currentStep!==2){
    return null;
  }else{
    return(
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid component={'span'} item xs={12}>
            <Typography component={'span'} variant="h3">Preference 2</Typography>
          </Grid>
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Title of Preference : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'} id="Top" name="Top" type="text" value={props.preferences[1].Top}
            onChange={e => {
              props.handleTopChange(e, props.preferences[1].prefno);
            }}
            required />
          </Grid>
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Domain of Specialization : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
              id="Dos"
              name="Dos"
              type="text"
              value={props.preferences[1].Dos}
              onChange={e => {
                props.handleDosChange(e, props.preferences[1].prefno);
              }}
              required />
          </Grid>
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Detailed Statement of Problem : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
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
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Internal agency / external agency / CTL / Mastek/or any other : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
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
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Method/Technique/Algorithm proposed : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
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
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Results Expected : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
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
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Software and Hardware requirements : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
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
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>IEEE / ACM / Springer Journal Paper : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
              id="file"
              name="file"
              type="file"
              onChange={e => {
                props.handleFileChange(e, props.preferences[1].prefno);
              }}
              required
            />
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Button className={classes.buttonprop} variant="contained" component={'span'} onClick={props.handleNext}>Next</Button>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </React.Fragment>
    );
  }
}

function Step3(props){
  const classes=props.classes;
  if(props.currentStep!==3){
    return null;
  }else{
    return(
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid component={'span'} item xs={12}>
            <Typography component={'span'} variant="h3">Preference 3</Typography>
          </Grid>
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Title of Preference : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'} id="Top" name="Top" type="text" value={props.preferences[2].Top}
            onChange={e => {
              props.handleTopChange(e, props.preferences[2].prefno);
            }}
            required />
          </Grid>
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Domain of Specialization : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
              id="Dos"
              name="Dos"
              type="text"
              value={props.preferences[2].Dos}
              onChange={e => {
                props.handleDosChange(e, props.preferences[2].prefno);
              }}
              required />
          </Grid>
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Detailed Statement of Problem : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
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
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Internal agency / external agency / CTL / Mastek/or any other : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
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
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Method/Technique/Algorithm proposed : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
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
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Results Expected : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
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
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>Software and Hardware requirements : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
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
          <Grid className={classes.typography} item xs={12} md={6}>
            <Typography component={'span'}>IEEE / ACM / Springer Journal Paper : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField className={classes.TextField} variant="standard" component={'span'}
              id="file"
              name="file"
              type="file"
              onChange={e => {
                props.handleFileChange(e, props.preferences[2].prefno);
              }}
              required
            />
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Button variant="contained" component={'span'} type="submit" onClick={e=>{
              props.handleClick(e, props.currentStep);
            }}>Submit</Button>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(StudentContent);
