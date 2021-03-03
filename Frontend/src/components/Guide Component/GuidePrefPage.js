import React, { Component } from "react";
import PropTypes from "prop-types";
import { createMuiTheme, responsiveFontSizes, ThemeProvider, withStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import SERVER_URL from "../../Pages/URL";
import qs from "qs";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  Grid,
  Button,
  TextField,
  CircularProgress,
  Card,
  TableCell,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableContainer
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { toFirstCharUppercase } from "../ToUpper";
import Navbar from "../Navbar/Navbar";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import HodCommentPage from "../Hod-component/HodCommentPage";
import DeleteIcon from "@material-ui/icons/Delete";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

let mem=[]
let filled = false;
let Ad = null;
let Groups = null;
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
// const months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
// let pd= new Date()

const styles = theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: "33.33%",
    flexShrink: 0,
    textAlign: "left",
    [theme.breakpoints.down("600")]: {
      display: "none"
    }
  },
  grid: {
    margin: "20px",
    textAlign: "center"
  },
  comment: {
    marginTop: "50px"
  },
  comTitle: {
    textAlign: "right",
    margin: "auto 0",
    [theme.breakpoints.down("sm")]: {
      textAlign: "left"
    }
  },
  comField: {
    width: "90%",
    backgroundColor: "#fff",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  comButton: {
    textAlign: "left",
    margin: "auto 0",
    [theme.breakpoints.down("sm")]: {
      textAlign: "right"
    }
  },
  deleteIconStyle: {
    cursor: "pointer",
    "&:hover": {
      color: "red"
    }
  }
});

class HodPrefPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
      adData: null,
      filled,
      comment: "",
      openSuccess: false,
      openFailure: false,
      scheduleLoading: false,
      dateTime: "",
      orgMarks: "",
      eodMarks: "",
      timeMarks: "",
      subKnowMarks: "",
      weeklyLogMsg: "",
      weeklyLogDate: date,
      reportMarks:[
        {
          orgAndWriting: "",
          biblogrpahy: "",
          diagrams: "",
          enggTheoryAnaly: "",
          spellAndGrammar: ""
        },
        {
          orgAndWriting: "",
          biblogrpahy: "",
          diagrams: "",
          enggTheoryAnaly: "",
          spellAndGrammar: ""
        },
        {
          orgAndWriting: "",
          biblogrpahy: "",
          diagrams: "",
          enggTheoryAnaly: "",
          spellAndGrammar: ""
        }
      ],
      implementationMarks:[
        {
          probStatement: "",
          innovation: "",
          pmf: "",
          concept: "",
          teamWork: ""
        },
        {
          probStatement: "",
          innovation: "",
          pmf: "",
          concept: "",
          teamWork: ""
        },
        {
          probStatement: "",
          innovation: "",
          pmf: "",
          concept: "",
          teamWork: ""
        }
      ]
    };
  }

  handleBibliography = (e,index) => {
    let repMarks = [...this.state.reportMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        repMarks[i].biblogrpahy = e.target.value;
        this.setState({ reportMarks: repMarks });
      }
    }
  };
  
  
  handleSpellAndGrammar = (e,index) => {
    let repMarks = [...this.state.reportMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        repMarks[i].spellAndGrammar = e.target.value;
        this.setState({ reportMarks: repMarks });
      }
    }
  };
  handleOrgAndWriting = (e,index) => {
    let repMarks = [...this.state.reportMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        repMarks[i].orgAndWriting = e.target.value;
        this.setState({ reportMarks: repMarks });
      }
    }
  };
  handleEngTheoryAnaly = (e,index) => {
    let repMarks = [...this.state.reportMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        repMarks[i].enggTheoryAnaly = e.target.value;
        this.setState({ reportMarks: repMarks });
      }
    }
  };
  handleDiagram = (e,index) => {
    let repMarks = [...this.state.reportMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        repMarks[i].diagrams = e.target.value;
        this.setState({ reportMarks: repMarks });
      }
    }
  };
  handleProbStatement = (e,index) => {
    let repMarks = [...this.state.implementationMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        repMarks[i].probStatement = e.target.value;
        this.setState({ implementationMarks: repMarks });
      }
    }
  };
  handleConcept = (e,index) => {
    let repMarks = [...this.state.implementationMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        repMarks[i].concept = e.target.value;
        this.setState({ implementationMarks: repMarks });
      }
    }
  };
  handleTeamWork = (e,index) => {
    let repMarks = [...this.state.implementationMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        repMarks[i].teamWork = e.target.value;
        this.setState({ implementationMarks: repMarks });
      }
    }
  };
  handlePMF = (e,index) => {
    let repMarks = [...this.state.implementationMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        repMarks[i].pmf = e.target.value;
        this.setState({ implementationMarks: repMarks });
      }
    }
  };
  handleInnovation = (e,index) => {
    let repMarks = [...this.state.implementationMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        repMarks[i].innovation = e.target.value;
        this.setState({ implementationMarks: repMarks });
      }
    }
  };

  handleReportSubmit = (e, id) => {
    e.preventDefault()
    let RepMarks = []
    let flag=true
    for(var i=0;i<mem.length;i++){
      RepMarks.push(this.state.reportMarks[i])
      Object.values(this.state.reportMarks[i]).forEach(element => {
        console.log(element)
        if(element==="" || parseInt(element)>3){
          flag=false
        }
      });
    }
    if(flag===false){
      alert("Please enter appropriate values")
    }else{
      mem.map((member,index)=>{
        let roll=member.rollno
        Object.assign(RepMarks[index],{"rollno":roll})
      })
      console.log(RepMarks);
      axios({
        method: "post",
        url: SERVER_URL + "/report",
        withCredentials: true,
        data: qs.stringify({
          gid: id,
          reportMarks: RepMarks
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
      .then(res => {
        window.location.reload();
        console.log("Succesful")
      })
      .catch(function (err) {
        console.log(err);
      });
    }
  };

  handleDeleteReport = (e, id) => {
    axios({
      method: "post",
      url: SERVER_URL + "/deleteReport",
      withCredentials: true,
      data: qs.stringify({
        gid: id
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(res => {
        this.setState({
          bibliography: "",
          diagram: "",
          spellAndGrammar: "",
          enggTheoryAnaly: "",
          orgAndWriting: ""
        });
        window.location.reload();
      })

      .catch(function (err) {
        console.log(err);
        this.setState({
          bibliography: "",
          diagram: "",
          spellAndGrammar: "",
          enggTheoryAnaly: "",
          orgAndWriting: ""
        });
      });
  };

  //WEEKLY LOG
  weeklyMsgHandler = e => {
    let message = e.target.value;
    this.setState({
      weeklyLogMsg: message
    });
  };

  appendLeadingZeroes = n => {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  };
  handleweelyDateChange = date => {
    let current_datetime = date;
    let formatted_date =
      current_datetime.getFullYear() +
      "-" +
      this.appendLeadingZeroes(current_datetime.getMonth() + 1) +
      "-" +
      this.appendLeadingZeroes(current_datetime.getDate());
    this.setState({
      weeklyLogDate: formatted_date
    });
  };

  sendLog = gid => {
    const { weeklyLogDate, weeklyLogMsg } = this.state;
    if (weeklyLogMsg === "") {
      alert("Please enter a remark");
    } else {
      axios({
        method: "post",
        url: SERVER_URL + "/weeklyMeetLog",
        credentials: "include",
        withCredentials: true,
        data: qs.stringify({
          gid: gid,
          date: weeklyLogDate,
          remark: weeklyLogMsg
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
        .then(res => {
          window.location.reload();
          this.setState({
            weeklyLogMsg: ""
          });
        })

        .catch(err => {
          console.log(err);
        });
    }
  };
  //Delete weekly Log
  deleteLog = (gid, wid) => {
    axios({
      method: "post",
      url: SERVER_URL + "/deleteWeeklyMeetLog",
      credentials: "include",
      withCredentials: true,
      data: qs.stringify({
        gid: gid,
        id: wid
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(res => {
        window.location.reload(false);
      })

      .catch(err => {
        console.log(err);
      });
  };


  handleImplementationSubmit = (e, id) => {
    e.preventDefault()
    let ImpMarks = []
    let flag=true
    for(var i=0;i<mem.length;i++){
      ImpMarks.push(this.state.implementationMarks[i])
      Object.values(this.state.implementationMarks[i]).forEach(element => {
        console.log(element)
        if(element==="" || parseInt(element)>3){
          flag=false
        }
      });
    }
    if(flag===false){
      alert("Please enter appropriate values")
    }else{
      mem.map((member,index)=>{
        let roll=member.rollno
        Object.assign(ImpMarks[index],{"rollno":roll})
      })
      console.log(ImpMarks);
      axios({
        method: "post",
        url: SERVER_URL + "/implementation",
        withCredentials: true,
        data: qs.stringify({
          gid: id,
          implementationMarks: ImpMarks
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
      .then(res => {
        window.location.reload();
        console.log("Successful")
      })
      .catch(function (err) {
        console.log(err);
      });
    }
  };

  handleDeleteImplementation = (e, id) => {
    axios({
      method: "post",
      url: SERVER_URL + "/deleteImplementation",
      withCredentials: true,
      data: qs.stringify({
        gid: id
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(res => {
        this.setState({
          probStatement: "",
          concept: "",
          innovation: "",
          teamWork: "",
          pmf: ""
        });
        window.location.reload();
      })

      .catch(function (err) {
        console.log(err);
        this.setState({
          probStatement: "",
          concept: "",
          innovation: "",
          teamWork: "",
          pmf: ""
        });
      });
  };

  sche_pres = (e, id) => {
    let dt = new Date(this.state.dateTime);
    this.setState({ scheduleLoading: true });
    axios({
      method: "post",
      url: SERVER_URL + "/presentation",
      withCredentials: true,
      data: qs.stringify({
        datetime: dt.toISOString(),
        gid: id
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(res => {
        this.setState({ scheduleLoading: false });
      })

      .catch(function (err) {
        console.log(err);
        this.setState({ scheduleLoading: false });
      });
  };

  handleDateTimeChange = e => {
    this.setState({ dateTime: e.target.value });
  };

  commentHandler = e => {
    let comment = e.target.value;
    this.setState({
      comment: comment
    });
  };

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

  sendComment(Gid) {
    const { comment } = this.state;
    if (comment === "") {
      this.setState({
        openFailure: true
      });
    } else {
      axios({
        method: "post",
        url: SERVER_URL + "/comment",
        credentials: "include",
        withCredentials: true,
        data: qs.stringify({
          id: Gid,
          msg: comment
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
        .then(response => {
          this.setState({ openSuccess: true, loading: false });
          this.setState({
            comment: "",
            adData: null
          });
        })

        .catch(err => {
          this.setState({ openFailure: true, loading: false });
          console.log(err);
        });
    }
  }

  checkData() {
    axios({
      method: "get",
      url: SERVER_URL + "/guideGroup",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(res => {
        Ad = res.data.length;
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

  handleApprove = (pid, id) => {
    axios({
      method: "post",
      url: SERVER_URL + "/approve",
      credentials: "include",
      withCredentials: true,
      data: qs.stringify({
        id: id,
        pid: pid
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(response => {
        this.setState({
          adData: null,
          filled: false,
          Ad: null
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  handleMarkSubmit = (e, groupID, presentationID) => {
    if (this.state.timeMarks==="" || this.state.orgMarks==="" ||
     this.state.eodMarks==="" || this.state.subKnowMarks === "")
    {
      alert("Please enter all field")
    }
    else if (
      parseInt(this.state.timeMarks, 10) > 3 ||
      parseInt(this.state.orgMarks, 10) > 2 ||
      parseInt(this.state.eodMarks, 10) > 3 ||
      parseInt(this.state.subKnowMarks, 10) > 2
    ) {
      alert("Entered marks greater than max marks. Please re-enter");
      this.setState({
        timeMarks: "",
        orgMarks: "",
        eodMarks: "",
        subKnowMarks: ""
      });

    } else {
      axios({
        method: "post",
        url: SERVER_URL + "/presentationMarks",
        credentials: "include",
        withCredentials: true,
        data: qs.stringify({
          gid: groupID,
          pid: presentationID,
          orgMarks: this.state.orgMarks,
          subKnowMarks: this.state.subKnowMarks,
          EODMarks: this.state.eodMarks,
          timeMarks: this.state.timeMarks
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
        .then(response => {
          this.setState({ marks: "", totalMarks: "" });
          window.location.reload();
        })
        .catch(err => {
          this.setState({ marks: "", totalMarks: "" });
          console.log(err);
        });
    }
  };

  handleOrgMarks = e => {
    this.setState({ orgMarks: e.target.value });
  };
  handleSubKnowMarks = e => {
    this.setState({ subKnowMarks: e.target.value });
  };
  handleTimeMarks = e => {
    this.setState({ timeMarks: e.target.value });
  };
  handleEodMarks = e => {
    this.setState({ eodMarks: e.target.value });
  };

  handleDeletePresentation = (e, PID, GID) => {
    axios({
      method: "post",
      url: SERVER_URL + "/deletePresentation",
      withCredentials: true,
      data: qs.stringify({
        pid: PID,
        gid: GID
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(res => {
        window.location.reload();
      })

      .catch(function (err) {
        console.log(err);
      });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    if (this.state.adData === null) {
      this.checkData();
    }
    if (this.state.filled === true && Ad !== 0) {
      return (
        <React.Fragment>
          <Navbar />
          <div style={{ width: "90%", margin: "auto" }}>
            {Groups.map(group => {
              let Gid = group.id;
              if (group.id === this.props.match.params.id) {
                let members = group.members;
                mem=members
                let Presentations = group.presentation;
                let Proposals = group.proposals;
                let Comments = group.comments;
                let weeklyLog = group.weeklyMeetLog;
                let implementation = group.implementation;
                let report = group.report;
                Presentations.sort((a, b) =>
                  new Date(a.scheduled_date).getTime() >
                  new Date(b.scheduled_date).getTime()
                    ? 1
                    : -1
                );
                return (
                  <div key={group.id}>
                    <Grid container spacing={2} className={classes.grid}>
                      <Grid item xs={12}>
                        <Typography variant="h3">
                          <b>{toFirstCharUppercase(group.name)}</b>
                        </Typography>
                      </Grid>
                    </Grid>
                    {Proposals.map((proposal, index) => {
                      const panel = proposal.title;
                      let approval = proposal.approval;
                      let pid = proposal._id;
                      let appliedDate = new Date(proposal.applied);
                      return (
                        <Accordion
                          key={proposal._id}
                          expanded={expanded === panel}
                          onChange={this.handleChange(panel)}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            {proposal.approval.admin ? (
                              <Typography
                                className={classes.heading}
                                style={{ color: "#03ac13" }}
                              >
                                <b>Proposal {index + 1}</b>
                              </Typography>
                            ) : (
                              <Typography className={classes.heading}>
                                <b>Proposal {index + 1}</b>
                              </Typography>
                            )}

                            <Typography className={classes.secondaryHeading}>
                              {proposal.title}
                            </Typography>

                            {proposal.approval.admin ? (
                              <Typography
                                style={{
                                  color: "#03ac13",
                                  margin: "auto"
                                }}
                              >
                                <DoneIcon size="large" />
                              </Typography>
                            ) : (
                              <Typography
                                style={{ color: "red", margin: "auto" }}
                              >
                                <ClearIcon size="large" />
                              </Typography>
                            )}
                          </AccordionSummary>
                          <AccordionDetails style={{ textAlign: "left" }}>
                            <Grid
                              container
                              className={classes.content}
                              spacing={1}
                            >
                              <Grid item xs={12}>
                                <Typography>
                                  <b>Title of Proposal:&nbsp;&nbsp;</b>
                                  {proposal.title}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography>
                                  <b>
                                    Detailed Statement of Problem:&nbsp;&nbsp;
                                  </b>
                                  {proposal.details}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography>
                                  <b>
                                    Internal Agency/External
                                    Agency/CTL/Mastek/or any other:&nbsp;&nbsp;
                                  </b>
                                  {proposal.agency}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography>
                                  <b>
                                    Methods/Technique/Algorithm
                                    proposed:&nbsp;&nbsp;
                                  </b>
                                  {proposal.method}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography>
                                  <b>
                                    Software/Hardware Requirements:&nbsp;&nbsp;
                                  </b>
                                  {proposal.requirements}
                                </Typography>
                              </Grid>

                              <Grid item xs={12}>
                                <Typography>
                                  <b>Domain of Specialization:&nbsp;&nbsp;</b>
                                  {proposal.specialization}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography>
                                  <b>Result Expected:&nbsp;&nbsp;</b>
                                  {proposal.result}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography>
                                  <b>Appied On:&nbsp;&nbsp;</b>
                                  {appliedDate.getDate()}/
                                  {appliedDate.getMonth() + 1}/
                                  {appliedDate.getFullYear()}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                {approval.admin ? (
                                  <Typography>
                                    <b>Admin approval status:&nbsp;&nbsp;</b>
                                    Approved
                                  </Typography>
                                ) : (
                                  <Typography>
                                    <b>Admin approval status:&nbsp;&nbsp;</b>not
                                    approved
                                  </Typography>
                                )}
                              </Grid>
                              <Grid item xs={12}>
                                {approval.hod ? (
                                  <Typography>
                                    <b>HOD approval status:&nbsp;&nbsp;</b>
                                    Approved
                                  </Typography>
                                ) : (
                                  <Typography>
                                    <b>HOD approval status:&nbsp;&nbsp;</b>not
                                    approved
                                  </Typography>
                                )}
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  onClick={() => {
                                    window.open(
                                      `${SERVER_URL}/${proposal.attachPrints}`
                                    );
                                  }}
                                >
                                  Show Uploaded Document
                                </Button>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                style={{ textAlign: "right" }}
                              >
                                {proposal.approval.admin ? (
                                  <div>
                                    {!proposal.approval.hod ? (
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        onClick={() => {
                                          this.handleApprove(pid, Gid);
                                        }}
                                      >
                                        Approve Proposal
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                      >
                                        Approved
                                      </Button>
                                    )}
                                  </div>
                                ) : (
                                  <div>
                                    {!proposal.approval.hod ? (
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                      >
                                        Not Approved
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                      >
                                        Another Proposal has been approved
                                      </Button>
                                    )}
                                  </div>
                                )}
                              </Grid>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                    <Card
                      style={{
                        marginTop: "50px",
                        backgroundColor: "#d8d8d8",
                        padding: "20px",
                        paddingTop: "0px",
                        marginBottom: "50px"
                      }}
                    >
                      <Grid style={{ marginTop: "20px" }} container>
                        <Grid item xs={4} style={{ textAlign: "left" }}>
                          <Typography
                            style={{ marginBottom: "20px", marginLeft: "20px" }}
                            variant="h3"
                          >
                            Presentation
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <form
                            onSubmit={e => {
                              this.sche_pres(e, Gid);
                            }}
                          >
                            <Grid container>
                              <Grid item xs={3}></Grid>
                              <Grid
                                item
                                xs={6}
                                style={{
                                  padding: "5px",
                                  backgroundColor: "#fff"
                                }}
                              >
                                <TextField
                                  id="datetime-local"
                                  label="Next Presentation"
                                  type="datetime-local"
                                  className={classes.textField}
                                  required
                                  InputLabelProps={{
                                    shrink: true
                                  }}
                                  onChange={this.handleDateTimeChange}
                                  style={{
                                    padding: "5px 20px",
                                    borderRadius: "2px"
                                  }}
                                />
                              </Grid>
                              <Grid
                                item
                                xs={3}
                                style={{
                                  padding: "5px",
                                  textAlign: "left",
                                  backgroundColor: "#fff"
                                }}
                              >
                                {!this.state.scheduleLoading ? (
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{ margin: "10px" }}
                                  >
                                    Schedule
                                  </Button>
                                ) : (
                                  <CircularProgress />
                                )}
                              </Grid>
                            </Grid>
                          </form>
                        </Grid>
                        <Grid item xs={12}>
                          {Presentations.length !== 0 ? (
                            <React.Fragment>
                              {Presentations.map((presentation, index) => {
                                const panel = presentation._id;
                                let d = new Date(presentation.scheduled_date);
                                return (
                                  <Accordion
                                    key={presentation._id}
                                    expanded={expanded === panel}
                                    onChange={this.handleChange(panel)}
                                  >
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1bh-content"
                                      id="panel1bh-header"
                                    >
                                      <Grid container>
                                        <Grid item xs={3}>
                                          <Typography variant="h6">
                                            <b>Presentation {index + 1}</b>
                                          </Typography>
                                        </Grid>
                                        {!presentation.filled ? (
                                          <React.Fragment>
                                            {d.getTime() > Date.now() ? (
                                              <React.Fragment>
                                                <Grid item xs={6} />
                                                <Grid item xs={3}>
                                                  <Typography>
                                                    Presentation Not conducted
                                                  </Typography>
                                                </Grid>
                                              </React.Fragment>
                                            ) : (
                                              <React.Fragment>
                                                <Grid item xs={6} />
                                                <Grid item xs={3}>
                                                  <Typography color="secondary">
                                                    Presentation Missing
                                                  </Typography>
                                                </Grid>
                                              </React.Fragment>
                                            )}
                                          </React.Fragment>
                                        ) : (
                                          <React.Fragment>
                                            <Grid item xs={6} />
                                            <Grid item xs={3}>
                                              <Typography
                                                style={{ color: "green" }}
                                              >
                                                Presentation conducted
                                              </Typography>
                                            </Grid>
                                          </React.Fragment>
                                        )}
                                      </Grid>
                                    </AccordionSummary>
                                    <AccordionDetails
                                      style={{ textAlign: "left" }}
                                    >
                                      <Grid
                                        container
                                        className={classes.content}
                                        spacing={1}
                                        style={{
                                          padding: "0px"
                                        }}
                                      >
                                        <Grid
                                          item
                                          xs={2}
                                          style={{
                                            textAlign: "left",
                                            backgroundColor: "#d3d3d3"
                                          }}
                                        >
                                          <React.Fragment>
                                            {d.getHours() > 12 ? (
                                              <Typography variant="h5">
                                                {d.getHours() - 12}:
                                                {d.getMinutes()} pm
                                              </Typography>
                                            ) : (
                                              <Typography variant="h5">
                                                {d.getHours()}:{d.getMinutes()}{" "}
                                                am
                                              </Typography>
                                            )}
                                            {days[d.getDay()]} {d.getDate()}/
                                            {d.getMonth() + 1}/{d.getFullYear()}
                                          </React.Fragment>
                                        </Grid>
                                        {!presentation.filled &&
                                        d.getTime() <= Date.now() ? (
                                          <Grid
                                            item
                                            xs={10}
                                            style={{
                                              backgroundColor: "#fff",
                                              padding: "0px",
                                              margin: "0px 0px",
                                              border: "4px solid #d3d3d3"
                                            }}
                                          >
                                            <Grid container>
                                              <Grid item>
                                                <TextField
                                                  size="small"
                                                  type="number"
                                                  value={this.state.timeMarks}
                                                  variant="outlined"
                                                  label="Time Management(3)"
                                                  onChange={
                                                    this.handleTimeMarks
                                                  }
                                                  style={{
                                                    margin: "10px 5px",
                                                    backgroundColor: "#fff"
                                                  }}
                                                  required
                                                />
                                              </Grid>
                                              <Grid
                                                item

                                                // style={{ textAlign: "right" }}
                                              >
                                                <TextField
                                                  size="small"
                                                  type="number"
                                                  value={this.state.eodMarks}
                                                  variant="outlined"
                                                  label="Effectiveness(3) "
                                                  onChange={this.handleEodMarks}
                                                  style={{
                                                    margin: "10px 5px",
                                                    backgroundColor: "#fff"
                                                  }}
                                                  required
                                                />
                                              </Grid>

                                              <Grid item>
                                                <TextField
                                                  size="small"
                                                  type="number"
                                                  value={this.state.orgMarks}
                                                  variant="outlined"
                                                  label="Organization(2)"
                                                  onChange={this.handleOrgMarks}
                                                  style={{
                                                    margin: "10px 5px",
                                                    backgroundColor: "#fff"
                                                  }}
                                                  required
                                                />
                                              </Grid>
                                              <Grid item>
                                                <TextField
                                                  size="small"
                                                  type="number"
                                                  value={
                                                    this.state.subKnowMarks
                                                  }
                                                  variant="outlined"
                                                  label="Subject Knowledge(2)"
                                                  onChange={
                                                    this.handleSubKnowMarks
                                                  }
                                                  style={{
                                                    margin: "10px 5px",
                                                    backgroundColor: "#fff"
                                                  }}
                                                  required
                                                />
                                              </Grid>
                                              <Grid item>
                                                <Button
                                                  size="large"
                                                  variant="contained"
                                                  color="primary"
                                                  onClick={e => {
                                                    this.handleMarkSubmit(
                                                      e,
                                                      Gid,
                                                      presentation._id
                                                    );
                                                  }}
                                                  style={{
                                                    margin: "10px 0px",
                                                    marginLeft: "15px"
                                                  }}
                                                >
                                                  Submit Marks
                                                </Button>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        ) : null}
                                        {presentation.filled ? (
                                          <React.Fragment>
                                            <Grid
                                              item
                                              xs={10}
                                              style={{
                                                border: "4px solid #d3d3d3",
                                                padding: "12px",
                                                textAlign: "center"
                                              }}
                                            >
                                              <Grid container>
                                                <Grid item xs={2}>
                                                  <Typography>
                                                    Organisation:&nbsp;
                                                    {presentation.orgMarks}
                                                  </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                  <Typography>
                                                    Subject Knowledge:&nbsp;
                                                    {presentation.subKnowMarks}
                                                  </Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                  <Typography>
                                                    Effectiveness of
                                                    Delivery:&nbsp;
                                                    {presentation.EODMarks}
                                                  </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                  <Typography>
                                                    Time Management:&nbsp;
                                                    {presentation.timeMarks}
                                                  </Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                  <Typography>
                                                    <b>
                                                      Total Marks:
                                                      {presentation.orgMarks +
                                                        presentation.subKnowMarks +
                                                        presentation.EODMarks +
                                                        presentation.timeMarks}
                                                      /10
                                                    </b>
                                                  </Typography>
                                                </Grid>
                                              </Grid>
                                            </Grid>

                                            <Grid
                                              item
                                              xs={12}
                                              style={{ textAlign: "right" }}
                                            >
                                              <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={e => {
                                                  this.handleDeletePresentation(
                                                    e,
                                                    presentation._id,
                                                    Gid
                                                  );
                                                }}
                                              >
                                                Delete presentation
                                              </Button>
                                            </Grid>
                                          </React.Fragment>
                                        ) : (
                                          <Grid
                                            item
                                            xs={12}
                                            style={{ textAlign: "right" }}
                                          >
                                            <Button
                                              variant="contained"
                                              color="secondary"
                                              onClick={e => {
                                                this.handleDeletePresentation(
                                                  e,
                                                  presentation._id,
                                                  Gid
                                                );
                                              }}
                                            >
                                              Delete presentation
                                            </Button>
                                          </Grid>
                                        )}
                                      </Grid>
                                    </AccordionDetails>
                                  </Accordion>
                                );
                              })}
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <Typography>No presentation scheduled</Typography>
                            </React.Fragment>
                          )}
                        </Grid>
                      </Grid>
                    </Card>
                    {/* Report marks */}
                    <Card
                      style={{
                        backgroundColor: "#d8d8d8",
                        padding: "0px 30px",
                        margin: "50px auto"
                      }}
                    >
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          style={{
                            textAlign: "left",
                            margin: "20px 0px 0px 20px"
                          }}
                        >
                          <Typography variant="h3">Report Marks</Typography>
                        </Grid>
                        <Grid item xs={12} style={{ margin: "20px 0px" }}>
                          {report.filled ? (
                            <Card
                              style={{
                                padding: "10px",
                                margin: "2px 0px"
                              }}
                            >
                              <Grid container>
                                <Grid item xs={4}>
                                  <Typography variant="h6">
                                    Organisation and writing style :{" "}
                                    {report.orgAndWriting}
                                  </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography variant="h6">
                                    Engineering Theory and Analysis :{" "}
                                    {report.enggTheoryAnaly}
                                  </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography variant="h6">
                                    Use of Bibliography : {report.biblogrpahy}
                                  </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography variant="h6">
                                    Spelling and Grammar :{" "}
                                    {report.spellAndGrammar}
                                  </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography variant="h6">
                                    Graphs/Diagram : {report.diagrams}
                                  </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography variant="h5">
                                    Total :{" "}
                                    {report.orgAndWriting +
                                      report.enggTheoryAnaly +
                                      report.biblogrpahy +
                                      report.spellAndGrammar +
                                      report.diagrams}
                                    /15
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  style={{ textAlign: "right" }}
                                >
                                  <Button
                                    onClick={e => {
                                      this.handleDeleteReport(e, Gid);
                                    }}
                                    variant="contained"
                                    color="secondary"
                                  >
                                    Delete
                                  </Button>
                                </Grid>
                              </Grid>
                            </Card>
                          ) : (
                            <Card
                              style={{
                                borderRadius: "0px",
                                padding: "10px",
                                margin: "2px 0px"
                              }}
                            >
                              {/* <form> */}
                              <ThemeProvider theme={theme}>
                                <Typography variant="h4">Group Details</Typography>
                                <TableContainer
                                  style={{ backgroundColor: "#d3d3d3" }}
                                  className={classes.tableContainer}
                                  component={Paper}
                                >
                                  <Table
                                    className={classes.table}
                                    size="small"
                                    aria-label="a dense table"
                                  >
                                    <TableHead>
                                      <TableRow>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Roll No.</TableCell>
                                        <TableCell align="center">Organizational and writing style</TableCell>
                                        <TableCell align="center">Engineering Theory and Analysis</TableCell>
                                        <TableCell align="center">Use of Bibliography</TableCell>
                                        <TableCell align="center">Spelling and Grammar</TableCell>
                                        <TableCell align="center">Graphs/Diagrams</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {members.map((member,index) => (
                                        <TableRow key={member._id}>
                                          <TableCell align="center">{member.name}</TableCell>
                                          <TableCell align="center">{member.rollno}</TableCell>
                                          <TableCell align="center">
                                          <TextField
                                            type="number"
                                            id="Organisation_and_writing_style"
                                            name="Organisation_and_writing_style"
                                            label="(3)"
                                            value={this.state.orgAndWriting}
                                            variant="standard"
                                            onChange={(e)=>{this.handleOrgAndWriting(e,index,member.rollno)}}
                                            // style={{ width: "40%" }}
                                            required
                                          />
                                          </TableCell>
                                          <TableCell align="center">
                                          <TextField
                                            type="number"
                                            id="Eng_Theory_and_Analysis"
                                            name="Eng_Theory_and_Analysis"
                                            label="(3)"
                                            value={this.state.enggTheoryAnaly}
                                            variant="standard"
                                            onChange={(e=>{this.handleEngTheoryAnaly(e,index)})}
                                            // style={{ width: "40%" }}
                                            required
                                          />
                                          </TableCell>
                                          <TableCell align="center">
                                          <TextField
                                            type="number"
                                            id="Use_of_Bibliography"
                                            name="Use_of_Bibliography"
                                            label="(3)"
                                            value={this.state.bibliography}
                                            variant="standard"
                                            onChange={(e)=>{this.handleBibliography(e,index)}}
                                            // style={{ width: "40%" }}
                                            required
                                          />
                                          </TableCell>
                                          <TableCell align="center">
                                          <TextField
                                            type="number"
                                            id="Spelling_and_Grammar"
                                            name="Spelling_and_Grammar"
                                            label="(3)"
                                            value={this.state.spellAndGrammar}
                                            variant="standard"
                                            onChange={(e)=>{this.handleSpellAndGrammar(e,index)}}
                                            // style={{ width: "40%" }}
                                            required
                                          />
                                          </TableCell>
                                          <TableCell align="center">
                                          <TextField
                                            type="number"
                                            id="Graphs/Diagram"
                                            name="Graphs/Diagram"
                                            label="(3)"
                                            value={this.state.diagram}
                                            variant="standard"
                                            onChange={(e)=>{this.handleDiagram(e,index)}}
                                            // style={{ width: "40%" }}
                                            required
                                          />
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </ThemeProvider>
                              <Grid container>
                                
                                <Grid item xs={6} style={{ margin: "5px 0" }}>
                                  <Button
                                    type="submit"
                                    onClick={e => {
                                      this.handleReportSubmit(e, Gid);
                                    }}
                                    variant="contained"
                                    color="primary"
                                    style={{
                                      padding: "10px 0px",
                                      marginLeft: "30px",
                                      width: "54%",
                                      fontSize: "20px"
                                    }}
                                  >
                                    Submit
                                  </Button>
                                </Grid>
                              </Grid>
                              {/* </form> */}
                            </Card>
                          )}
                        </Grid>
                      </Grid>
                    </Card>
                    {/* Implementation */}
                    <Card
                      style={{
                        backgroundColor: "#d8d8d8",
                        padding: "0px 30px",
                        margin: "50px auto"
                      }}
                    >
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          style={{
                            textAlign: "left",
                            margin: "20px 0px 0px 20px"
                          }}
                        >
                          <Typography variant="h3">
                            Implementation Marks
                          </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ margin: "20px 0px" }}>
                        <ThemeProvider theme={theme}>
                          <Typography variant="h4">Group Details</Typography>
                          <TableContainer
                            style={{ backgroundColor: "#d3d3d3" }}
                            className={classes.tableContainer}
                            component={Paper}
                          >
                            <Table
                              className={classes.table}
                              size="small"
                              aria-label="a dense table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell align="center">Name</TableCell>
                                  <TableCell align="center">Roll No.</TableCell>
                                  <TableCell align="center">Problem Statement</TableCell>
                                  <TableCell align="center">Concepts</TableCell>
                                  <TableCell align="center">Innovation</TableCell>
                                  <TableCell align="center">Teamwork</TableCell>
                                  <TableCell align="center">Project Management and Finance</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {members.map((member,index) => (
                                  <TableRow key={member._id}>
                                    <TableCell align="center">{member.name}</TableCell>
                                    <TableCell align="center">{member.rollno}</TableCell>
                                    <TableCell align="center">
                                    <TextField
                                        type="number"
                                        id="Problem_Statement"
                                        name="Problem_Statement"
                                        label="(3)"
                                        variant="standard"
                                        onChange={(e)=>{this.handleProbStatement(e,index)}}
                                        // style={{ width: "40%" }}
                                        required
                                      />
                                    </TableCell>
                                    <TableCell align="center">
                                    <TextField
                                        type="number"
                                        id="Concepts"
                                        name="Concepts"
                                        label="(3)"
                                        variant="standard"
                                        onChange={(e)=>{this.handleConcept(e,index)}}
                                        // style={{ width: "40%" }}
                                        required
                                      />
                                    </TableCell>
                                    <TableCell align="center">
                                    <TextField
                                        type="number"
                                        id="Innovation"
                                        name="Innovation"
                                        label="(3)"
                                        variant="standard"
                                        onChange={(e)=>{this.handleInnovation(e,index)}}
                                        // style={{ width: "40%" }}
                                        required
                                      />
                                    </TableCell>
                                    <TableCell align="center">
                                    <TextField
                                        type="number"
                                        id="Teamwork"
                                        name="Teamwork"
                                        label="(3)"
                                        variant="standard"
                                        onChange={(e)=>{this.handleTeamWork(e,index)}}
                                        // style={{ width: "40%" }}
                                        required
                                      />
                                    </TableCell>
                                    <TableCell align="center">
                                    <TextField
                                        type="number"
                                        id="Proj_Management_and_Finance"
                                        name="Proj_Management_and_Finance"
                                        label="(3)"
                                        variant="standard"
                                        onChange={(e)=>{this.handlePMF(e,index)}}
                                        // style={{ width: "40%" }}
                                        required
                                      />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </ThemeProvider>
                        </Grid>
                      </Grid>
                      <Button
                        onClick={e => {
                          this.handleImplementationSubmit(e, Gid);
                        }}
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{
                          padding: "10px 0px",
                          marginLeft: "30px",
                          width: "54%",
                          fontSize: "20px"
                        }}
                      >
                        Submit
                      </Button>
                    </Card>
                    {/* WEEKLY LOG */}
                    <Card
                      style={{
                        backgroundColor: "#d8d8d8",
                        padding: "0px 30px",
                        margin: "50px auto"
                      }}
                    >
                      <Grid container>
                        <Grid item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Grid>
                        <Grid
                          item
                          xs={12}
                          sm={3}
                          style={{
                            textAlign: "left",
                            margin: "20px 0px 0px 0px"
                          }}
                        >
                          <Typography variant="h3">Weekly Log</Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={8}
                          style={{
                            backgroundColor: "#fff",
                            width: "100%",
                            margin: "20px 0"
                          }}
                        >
                          <form>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                autoOk
                                required
                                variant="inline"
                                inputVariant="outlined"
                                format="yyyy/MM/dd"
                                value={this.state.weeklyLogDate}
                                InputAdornmentProps={{ position: "start" }}
                                style={{ margin: "10px" }}
                                onChange={this.handleweelyDateChange}
                              />
                            </MuiPickersUtilsProvider>
                            <TextField
                              type="text"
                              id="logMsg"
                              name="logMsg"
                              label="Add log remark"
                              variant="outlined"
                              value={this.state.weeklyLogMsg}
                              style={{ margin: "10px" }}
                              onChange={this.weeklyMsgHandler}
                            />
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => this.sendLog(Gid)}
                              style={{
                                margin: "20px ",
                                marginLeft: "50px"
                              }}
                            >
                              Add Log
                            </Button>
                          </form>
                        </Grid>
                        <Grid item xs={12} style={{ margin: "20px 0px" }}>
                          <Card
                            style={{
                              borderRadius: "0px",
                              padding: "10px",
                              margin: "2px 0px"
                            }}
                          >
                            <Grid container>
                              <Grid item xs={12} style={{ textAlign: "left" }}>
                                <Typography variant="h4">
                                  <b>Log History:</b>
                                </Typography>
                              </Grid>
                            </Grid>
                          </Card>
                          {weeklyLog ? (
                            weeklyLog.map(log => {
                              let wid = log._id;
                              return (
                                <Card
                                  key={log._id}
                                  style={{
                                    borderRadius: "0px",
                                    padding: "10px",
                                    margin: "2px 0px"
                                  }}
                                >
                                  <Grid container>
                                    <Grid item xs={12} sm={5}>
                                      <Typography variant="h6">
                                        {log.remark}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                      <Typography variant="h6">
                                        {log.scheduled_date
                                          ? log.scheduled_date.split("T")[0]
                                          : null}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                      <DeleteIcon
                                        className={classes.deleteIconStyle}
                                        onClick={() => this.deleteLog(Gid, wid)}
                                      />
                                    </Grid>
                                  </Grid>
                                </Card>
                              );
                            })
                          ) : (
                            <Typography variant="h6">No logs Yet</Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Card>
                    <div
                      style={{
                        backgroundColor: "#d8d8d8",
                        padding: "0px 30px",
                        margin: "50px auto"
                      }}
                    >
                      <Grid container className={classes.comment}>
                        <Grid item xs={12} style={{ marginBottom: "30px" }}>
                          <Typography
                            variant="h2"
                            style={{ textAlign: "left", fontWeight: "400" }}
                          >
                            Comments
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={3}
                          className={classes.comTitle}
                        >
                          <Typography>
                            <b>Add Comments:</b>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField
                            className={classes.comField}
                            variant="outlined"
                            component={"span"}
                            multiline
                            inputProps={{ style: { fontSize: 14 } }}
                            rows={3}
                            id="comment"
                            name="comment"
                            type="text"
                            value={this.state.comment}
                            onChange={this.commentHandler}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={3}
                          className={classes.comButton}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              this.sendComment(Gid);
                            }}
                          >
                            Send Comment
                          </Button>
                          <Snackbar
                            open={this.state.openSuccess}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                          >
                            <Alert
                              onClose={this.handleClose}
                              severity="success"
                            >
                              Successful comment
                            </Alert>
                          </Snackbar>
                          <Snackbar
                            open={this.state.openFailure}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                          >
                            <Alert onClose={this.handleClose} severity="error">
                              Unsuccessful. Comment cannot be empty
                            </Alert>
                          </Snackbar>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <HodCommentPage Comments={Comments} />
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                );
              } else return null;
            })}
          </div>
        </React.Fragment>
      );
    } else return <LinearProgress />;
  }
}

HodPrefPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HodPrefPage);


// {implementation.filled ? (
//   <Card
//     style={{
//       borderRadius: "0px",
//       padding: "10px",
//       margin: "2px 0px"
//     }}
//   >
//     <Grid container>
//       <Grid item xs={4}>
//         <Typography variant="h6">
//           Problem Statement :{" "}
//           {implementation.probStatment}
//         </Typography>
//       </Grid>
//       <Grid item xs={4}>
//         <Typography variant="h6">
//           Concepts : {implementation.concept}
//         </Typography>
//       </Grid>
//       <Grid item xs={4}>
//         <Typography variant="h6">
//           Innovation : {implementation.innovation}
//         </Typography>
//       </Grid>
//       <Grid item xs={4}>
//         <Typography variant="h6">
//           Teamwork : {implementation.teamwork}
//         </Typography>
//       </Grid>
//       <Grid item xs={4}>
//         <Typography variant="h6">
//           Project Management and Finance :{" "}
//           {implementation.pmf}
//         </Typography>
//       </Grid>
//       <Grid item xs={4}>
//         <Typography variant="h5">
//           Total :{" "}
//           {implementation.probStatment +
//             implementation.concept +
//             implementation.innovation +
//             implementation.teamwork +
//             implementation.pmf}
//           /15
//         </Typography>
//       </Grid>
//       <Grid
//         item
//         xs={12}
//         style={{ textAlign: "right" }}
//       >
//         <Button
//           onClick={e => {
//             this.handleDeleteImplementation(e, Gid);
//           }}
//           variant="contained"
//           color="secondary"
//         >
//           Delete
//         </Button>
//       </Grid>
//     </Grid>
//   </Card>
// ) : (
//   <Card
//     style={{
//       borderRadius: "0px",
//       padding: "10px",
//       margin: "2px 0px"
//     }}
//   >
//     {/* <form > */}
//     <Grid container>
//       <Grid item xs={6} style={{ margin: "5px 0" }}>
//         <Grid container>
//           <Grid
//             item
//             xs={8}
//             style={{ padding: "8px 0px" }}
//           >
//             <Typography variant="h6">
//               Problem Statement:
//             </Typography>
//           </Grid>
//           <Grid
//             item
//             xs={4}
//             style={{
//               textAlign: "left"
//             }}
//           >
//             <TextField
//               type="number"
//               id="Problem_Statement"
//               name="Problem_Statement"
//               label="(3)"
//               variant="outlined"
//               onChange={this.handleProbStatement}
//               style={{ width: "40%" }}
//               required
//             />
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item xs={6} style={{ margin: "5px 0" }}>
//         <Grid container>
//           <Grid
//             item
//             xs={8}
//             style={{ padding: "8px 0px" }}
//           >
//             <Typography variant="h6">
//               Concepts:
//             </Typography>
//           </Grid>
//           <Grid
//             item
//             xs={4}
//             style={{ textAlign: "left" }}
//           >
//             <TextField
//               type="number"
//               id="Concepts"
//               name="Concepts"
//               label="(3)"
//               variant="outlined"
//               onChange={this.handleConcept}
//               style={{ width: "40%" }}
//               required
//             />
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item xs={6} style={{ margin: "5px 0" }}>
//         <Grid container>
//           <Grid
//             item
//             xs={8}
//             style={{ padding: "8px 0px" }}
//           >
//             <Typography variant="h6">
//               Innovation:
//             </Typography>
//           </Grid>
//           <Grid
//             item
//             xs={4}
//             style={{ textAlign: "left" }}
//           >
//             {" "}
//             <TextField
//               type="number"
//               id="Innovation"
//               name="Innovation"
//               label="(3)"
//               variant="outlined"
//               onChange={this.handleInnovation}
//               style={{ width: "40%" }}
//               required
//             />
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item xs={6} style={{ margin: "5px 0" }}>
//         <Grid container>
//           <Grid
//             item
//             xs={8}
//             style={{ padding: "8px 0px" }}
//           >
//             <Typography variant="h6">
//               Teamwork:
//             </Typography>
//           </Grid>
//           <Grid
//             item
//             xs={4}
//             style={{ textAlign: "left" }}
//           >
//             {" "}
//             <TextField
//               type="number"
//               id="Teamwork"
//               name="Teamwork"
//               label="(3)"
//               variant="outlined"
//               onChange={this.handleTeamWork}
//               style={{ width: "40%" }}
//               required
//             />
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item xs={6} style={{ margin: "5px 0" }}>
//         <Grid container>
//           <Grid
//             item
//             xs={8}
//             style={{ padding: "8px 0px" }}
//           >
//             <Typography variant="h6">
//               Project Management and Finance:
//             </Typography>
//           </Grid>
//           <Grid
//             item
//             xs={4}
//             style={{ textAlign: "left" }}
//           >
//             <TextField
//               type="number"
//               id="Proj_Management_and_Finance"
//               name="Proj_Management_and_Finance"
//               label="(3)"
//               variant="outlined"
//               onChange={this.handlePMF}
//               style={{ width: "40%" }}
//               required
//             />
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item xs={6} style={{ margin: "10px 0" }}>
        // <Button
        //   onClick={e => {
        //     this.handleImplementationSubmit(e, Gid);
        //   }}
        //   type="submit"
        //   variant="contained"
        //   color="primary"
        //   style={{
        //     padding: "10px 0px",
        //     marginLeft: "30px",
        //     width: "54%",
        //     fontSize: "20px"
        //   }}
        // >
        //   Submit
        // </Button>
//       </Grid>
//     </Grid>
//     {/* </form> */}
//   </Card>
// )}



//states
// this.state = {
//   expanded: null,
//   adData: null,
//   filled,
//   comment: "",
//   openSuccess: false,
//   openFailure: false,
//   scheduleLoading: false,
//   dateTime: "",
//   orgMarks: "",
//   eodMarks: "",
//   timeMarks: "",
//   subKnowMarks: "",
//   probStatement: "",
//   concept: "",
//   innovation: "",
//   pmf: "",
//   teamWork: "",
//   bibliography: "",
//   diagram: "",
//   enggTheoryAnaly: "",
//   orgAndWriting: "",
//   spellAndGrammar: "",
//   weeklyLogMsg: "",
//   weeklyLogDate: date
// };


//Report marks

{/* <Grid item xs={6} style={{ margin: "5px 0" }}>
                                  <Grid container>
                                    <Grid
                                      item
                                      xs={8}
                                      style={{ padding: "8px 0px" }}
                                    >
                                      <Typography variant="h6">
                                        Organisation and writing style
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={4}
                                      style={{
                                        textAlign: "left"
                                      }}
                                    >
                                      <TextField
                                        type="number"
                                        id="Organisation_and_writing_style"
                                        name="Organisation_and_writing_style"
                                        label="(3)"
                                        value={this.state.orgAndWriting}
                                        variant="outlined"
                                        onChange={this.handleOrgAndWriting}
                                        style={{ width: "40%" }}
                                        required
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={6} style={{ margin: "5px 0" }}>
                                  <Grid container>
                                    <Grid
                                      item
                                      xs={8}
                                      style={{ padding: "8px 0px" }}
                                    >
                                      <Typography variant="h6">
                                        Engineering Theory and Analysis:
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={4}
                                      style={{
                                        textAlign: "left"
                                      }}
                                    >
                                      <TextField
                                        type="number"
                                        id="Eng_Theory_and_Analysis"
                                        name="Eng_Theory_and_Analysis"
                                        label="(3)"
                                        value={this.state.enggTheoryAnaly}
                                        variant="outlined"
                                        onChange={this.handleEngTheoryAnaly}
                                        style={{ width: "40%" }}
                                        required
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={6} style={{ margin: "5px 0" }}>
                                  <Grid container>
                                    <Grid
                                      item
                                      xs={8}
                                      style={{ padding: "8px 0px" }}
                                    >
                                      <Typography variant="h6">
                                        Use of Bibliography:
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={4}
                                      style={{
                                        textAlign: "left"
                                      }}
                                    >
                                      <TextField
                                        type="number"
                                        id="Use_of_Bibliography"
                                        name="Use_of_Bibliography"
                                        label="(3)"
                                        value={this.state.bibliography}
                                        variant="outlined"
                                        onChange={this.handleBibliography}
                                        style={{ width: "40%" }}
                                        required
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={6} style={{ margin: "5px 0" }}>
                                  <Grid container>
                                    <Grid
                                      item
                                      xs={8}
                                      style={{ padding: "8px 0px" }}
                                    >
                                      <Typography variant="h6">
                                        Spelling and Grammar:
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={4}
                                      style={{
                                        textAlign: "left"
                                      }}
                                    >
                                      {" "}
                                      <TextField
                                        type="number"
                                        id="Spelling_and_Grammar"
                                        name="Spelling_and_Grammar"
                                        label="(3)"
                                        value={this.state.spellAndGrammar}
                                        variant="outlined"
                                        onChange={this.handleSpellAndGrammar}
                                        style={{ width: "40%" }}
                                        required
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={6} style={{ margin: "5px 0" }}>
                                  <Grid container>
                                    <Grid
                                      item
                                      xs={8}
                                      style={{ padding: "8px 0px" }}
                                    >
                                      <Typography variant="h6">
                                        Graphs/Diagrams:
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={4}
                                      style={{
                                        textAlign: "left"
                                      }}
                                    >
                                      <TextField
                                        type="number"
                                        id="Graphs/Diagram"
                                        name="Graphs/Diagram"
                                        label="(3)"
                                        value={this.state.diagram}
                                        variant="outlined"
                                        onChange={this.handleDiagram}
                                        style={{ width: "40%" }}
                                        required
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid> */}