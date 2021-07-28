import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
  withStyles
} from "@material-ui/core/styles";
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
  TableContainer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
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
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
  DateTimePicker
} from "@material-ui/pickers";
import Footer from "../Footer/Footer";

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
let logDate = date

let repLength = 0;
let impLength = 0;
let mem = [];
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

class GuidePrefPage extends Component {
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
      dateTime: new Date(),
      weeklyLog:{
        weeklyLogData: [
          { logMsg:"", taskMarks: "", levelMarks: "", workMarks: "", puncMarks: "" },
          { logMsg:"", taskMarks: "", levelMarks: "", workMarks: "", puncMarks: "" },
          { logMsg:"", taskMarks: "", levelMarks: "", workMarks: "", puncMarks: "" }
        ],
        weeklyLogDate: date,
      },
      presentationMarks: [
        { orgMarks: "", subKnowMarks: "", EODMarks: "", timeMarks: "" },
        { orgMarks: "", subKnowMarks: "", EODMarks: "", timeMarks: "" },
        { orgMarks: "", subKnowMarks: "", EODMarks: "", timeMarks: "" }
      ],
      reportMarks: [
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
      implementationMarks: [
        {
          probStatment: "",
          innovation: "",
          pmf: "",
          concept: "",
          teamwork: ""
        },
        {
          probStatment: "",
          innovation: "",
          pmf: "",
          concept: "",
          teamwork: ""
        },
        {
          probStatment: "",
          innovation: "",
          pmf: "",
          concept: "",
          teamwork: ""
        }
      ],
      repDelOpen:false,
      impDelOpen:false
    };
  }

  repDelClickOpen = () => {
    this.setState({repDelOpen:true})
  };

  repDelAgreeClickClose = () => {
    repLength=0
    this.setState({repDelOpen:false})
  }
  repDelCancelClickClose = () => {
    this.setState({repDelOpen:false})
  }
  impDelClickOpen = () => {
    this.setState({impDelOpen:true})
  };

  impDelAgreeClickClose = () => {
    impLength=0
    this.setState({impDelOpen:false})
  }
  impDelCancelClickClose = () => {
    this.setState({impDelOpen:false})
  }


  handleBibliography = (e, index) => {
    let repMarks = [...this.state.reportMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        repMarks[i].biblogrpahy = e.target.value;
        this.setState({ reportMarks: repMarks });
      }
    }
  };

  handleSpellAndGrammar = (e, index) => {
    let repMarks = [...this.state.reportMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        repMarks[i].spellAndGrammar = e.target.value;
        this.setState({ reportMarks: repMarks });
      }
    }
  };
  handleOrgAndWriting = (e, index) => {
    let repMarks = [...this.state.reportMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        repMarks[i].orgAndWriting = e.target.value;
        this.setState({ reportMarks: repMarks });
      }
    }
  };
  handleEngTheoryAnaly = (e, index) => {
    let repMarks = [...this.state.reportMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        repMarks[i].enggTheoryAnaly = e.target.value;
        this.setState({ reportMarks: repMarks });
      }
    }
  };
  handleDiagram = (e, index) => {
    let repMarks = [...this.state.reportMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        repMarks[i].diagrams = e.target.value;
        this.setState({ reportMarks: repMarks });
      }
    }
  };
  handleProbStatement = (e, index) => {
    let impMarks = [...this.state.implementationMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        impMarks[i].probStatment = e.target.value;
        this.setState({ implementationMarks: impMarks });
      }
    }
  };
  handleConcept = (e, index) => {
    let impMarks = [...this.state.implementationMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        impMarks[i].concept = e.target.value;
        this.setState({ implementationMarks: impMarks });
      }
    }
  };
  handleTeamWork = (e, index) => {
    let impMarks = [...this.state.implementationMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        impMarks[i].teamwork = e.target.value;
        this.setState({ implementationMarks: impMarks });
      }
    }
  };
  handlePMF = (e, index) => {
    let impMarks = [...this.state.implementationMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        impMarks[i].pmf = e.target.value;
        this.setState({ implementationMarks: impMarks });
      }
    }
  };
  handleInnovation = (e, index) => {
    let impMarks = [...this.state.implementationMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        impMarks[i].innovation = e.target.value;
        this.setState({ implementationMarks: impMarks });
      }
    }
  };

  handleReportSubmit = (e, id) => {
    e.preventDefault();
    let RepMarks = [];
    let flag = true;
    for (var i = 0; i < mem.length; i++) {
      RepMarks.push(this.state.reportMarks[i]);
      Object.values(this.state.reportMarks[i]).forEach(element => {
        if (element === "" || parseInt(element) > 3 || parseInt(element) < 0) {
          flag = false;
        }
      });
    }
    if (flag === false) {
      alert("Please enter appropriate values");
    } else {
      mem.map((member, index) => {
        let roll = member.rollno;
        Object.assign(RepMarks[index], { rollno: roll });
      });
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
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };
  //WEEKLY LOG
  weeklyMsgHandler = (e,index) => {
    let message = e.target.value;
    let weeklylog = [...this.state.weeklyLog.weeklyLogData];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        weeklylog[i].logMsg = message;
        this.setState({ weeklyLog: {weeklyLogData: weeklylog, weeklyLogDate:logDate }});
      }
    }
  };
  handleTaskComp= (e, index) => {
    let weeklylog = [...this.state.weeklyLog.weeklyLogData];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        weeklylog[i].taskMarks = e.target.value;
        this.setState({ weeklyLog: {weeklyLogData: weeklylog, weeklyLogDate:logDate }});
      }
    }
  };
  handleLevelPrep= (e, index) => {
    let weeklylog = [...this.state.weeklyLog.weeklyLogData];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        weeklylog[i].levelMarks = e.target.value;
        this.setState({ weeklyLog: {weeklyLogData: weeklylog, weeklyLogDate:logDate }});
      }
    }
  };
  handleWorkTeam = (e, index) => {
    let weeklylog = [...this.state.weeklyLog.weeklyLogData];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        weeklylog[i].workMarks = e.target.value;
        this.setState({ weeklyLog: {weeklyLogData: weeklylog, weeklyLogDate:logDate }});
      }
    }
  };
  handlePuncAndReg= (e, index) => {
    let weeklylog = [...this.state.weeklyLog.weeklyLogData];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        weeklylog[i].puncMarks = e.target.value;
        this.setState({ weeklyLog: {weeklyLogData: weeklylog, weeklyLogDate:logDate }});
      }
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

  

  appendLeadingZeroes = n => {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  };
  handleweelyDateChange = date => {
    let current_datetime = date;
    let WeeklyLog = this.state.weeklyLog
    let formatted_date =
      current_datetime.getFullYear() +
      "-" +
      this.appendLeadingZeroes(current_datetime.getMonth() + 1) +
      "-" +
      this.appendLeadingZeroes(current_datetime.getDate());
    logDate = formatted_date
    WeeklyLog.weeklyLogDate = formatted_date
    this.setState({
      weeklyLog: WeeklyLog
    });
  };

  sendLog = (gid,members) => {
    const {weeklyLog} = this.state;
    let flag = true
    weeklyLog.weeklyLogData.map((element)=>{
      if(element.logMsg === ""){
        flag = false
      }
      else if(
        parseInt(element.levelMarks) > 5 || parseInt(element.levelMarks) < 0 || element.levelMarks === "" ||
        parseInt(element.puncMarks) > 5 || parseInt(element.puncMarks) < 0 || element.puncMarks === "" ||
        parseInt(element.taskMarks) > 5 || parseInt(element.taskMarks) < 0 || element.workMarks === "" ||
        parseInt(element.workMarks) > 5 || parseInt(element.workMarks) < 0 || element.taskMarks === ""
      )
        flag = false;
    })
    if (flag === false) {
      alert("Please check entered values");
    } else {
      let WeeklyLog = this.state.weeklyLog
      for (var i = 0; i < members.length; i++) {
        WeeklyLog.weeklyLogData[i].rollno = parseInt(members[i].rollno)
      }
      console.log(WeeklyLog)
      axios({
        method: "post",
        url: SERVER_URL + "/weeklyMeetLog",
        credentials: "include",
        withCredentials: true,
        data: qs.stringify({
          gid: gid,
          weeklyMeetLog: WeeklyLog
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
        .then(res => {
          this.setState({
            weeklyLog: {
              weeklyLogData: [
                { logMsg:"", taskMarks: "", levelMarks: "", workMarks: "", puncMarks: "" },
                { logMsg:"", taskMarks: "", levelMarks: "", workMarks: "", puncMarks: "" },
                { logMsg:"", taskMarks: "", levelMarks: "", workMarks: "", puncMarks: "" }
              ],
              weeklyLogDate: date,
            }      
          });
          window.location.reload();
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
    e.preventDefault();
    let ImpMarks = [];
    let flag = true;
    for (var i = 0; i < mem.length; i++) {
      ImpMarks.push(this.state.implementationMarks[i]);
      Object.values(this.state.implementationMarks[i]).forEach(element => {
        console.log(element);
        if (element === "" || parseInt(element) > 3 || parseInt(element) < 0) {
          flag = false;
        }
      });
    }
    if (flag === false) {
      alert("Please enter appropriate values");
    } else {
      mem.map((member, index) => {
        let roll = member.rollno;
        Object.assign(ImpMarks[index], { rollno: roll });
      });
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
          console.log("Successful");
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
    e.preventDefault()
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
        window.location.reload()
      })

      .catch(function (err) {
        console.log(err);
        this.setState({ scheduleLoading: false });
      });
  };

  handleDateTimeChange = dt => {
    this.setState({ dateTime: dt });
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
        Groups.map(group => {
          if (group.id === this.props.match.params.id) {
            impLength = group.implementation.length;
            repLength = group.report.length;
        }})
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

  //PRESENTATION MARKS HANDLER
  handleMarkSubmit = (e, groupID, presentationID) => {
    e.preventDefault();
    let pMarks = [];
    let flag = true;
    for (var i = 0; i < mem.length; i++) {
      pMarks.push(this.state.presentationMarks[i]);
      Object.values(this.state.presentationMarks[i]).forEach(element => {
        if (element === "") {
          flag = false;
        }
      });
    }
    pMarks.map(pm => {
      if (
        parseInt(pm.timeMarks) > 3 || parseInt(pm.timeMarks) < 0 ||
        parseInt(pm.orgMarks) > 2 || parseInt(pm.orgMarks) < 0 ||
        parseInt(pm.EODMarks) > 3 || parseInt(pm.EODMarks) < 0 ||
        parseInt(pm.subKnowMarks) > 2 || parseInt(pm.subKnowMarks) < 0
      )
        flag = false;
    });
    if (flag === false) {
      alert("Please enter appropriate values Or fill all the fields");
    } else {
      mem.map((member, index) => {
        let roll = member.rollno;
        Object.assign(pMarks[index], { rollno: roll });
      });

      axios({
        method: "post",
        url: SERVER_URL + "/presentationMarks",
        credentials: "include",
        withCredentials: true,
        data: qs.stringify({
          gid: groupID,
          pid: presentationID,
          presentation: pMarks
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
        .then(response => {
          this.setState({ marks: "", totalMarks: "" });
          window.location.reload();
          console.log("success");
        })
        .catch(err => {
          this.setState({ marks: "", totalMarks: "" });
          console.log(err);
        });
    }
  };

  handleOrgMarks = (e, index) => {
    let presMarks = [...this.state.presentationMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        presMarks[i].orgMarks = e.target.value;
        this.setState({ presentationMarks: presMarks });
      }
    }
  };
  handleSubKnowMarks = (e, index) => {
    let presMarks = [...this.state.presentationMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        presMarks[i].subKnowMarks = e.target.value;
        this.setState({ presentationMarks: presMarks });
      }
    }
  };
  handleTimeMarks = (e, index) => {
    let presMarks = [...this.state.presentationMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        presMarks[i].timeMarks = e.target.value;
        this.setState({ presentationMarks: presMarks });
      }
    }
  };
  handleEODMarks = (e, index) => {
    let presMarks = [...this.state.presentationMarks];
    for (var i = 0; i < 3; i++) {
      if (i === index) {
        presMarks[i].EODMarks = e.target.value;
        this.setState({ presentationMarks: presMarks });
      }
    }
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
                mem = members;
                let Presentations = group.presentation;
                let Proposals = group.proposals;
                let Comments = group.comments;
                let weeklyLog = group.weeklyMeetLog;
                let implementation = group.implementation;
                let report = group.report;
                let Ad = group.addtionalDocuments;
                

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
                                  <b>Type of Project:&nbsp;&nbsp;</b>
                                  {proposal.typeOfProject}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography>
                                  <b>Category of Project:&nbsp;&nbsp;</b>
                                  {proposal.category}
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
                                      `${proposal.attachPrints}`
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
                    <div
                      style={{
                        marginTop: "30px",
                        boxShadow:
                          "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)"
                      }}
                    >
                      <React.Fragment>
                        {Ad.length === 0 ? (
                          <Typography variant="h4">
                            No Additional Document Uploaded
                          </Typography>
                        ) : (
                          <React.Fragment>
                            <div
                              style={{ backgroundColor: "#fff", textAlign: "left" }}
                            >
                              <Typography
                                variant="h4"
                                style={{
                                  fontWeight: "400",
                                  paddingLeft: "30px",
                                  padding: "20px 30px"
                                }}
                              >
                                <b>Additional Uploaded Documents</b>
                              </Typography>
                            </div>
                            <Grid
                              container
                              style={{
                                backgroundColor: "#fff",
                                padding: "10px",
                                marginBottom: "2px",
                                textAlign: "left"
                              }}
                            >
                              <Grid item xs={3} style={{ paddingLeft: "20px" }}>
                                <Typography>
                                  <b>Title</b>
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography>
                                  <b>Description</b>
                                </Typography>
                              </Grid>
                              <Grid item xs={1}></Grid>
                              <Grid item xs={2} style={{ textAlign: "centre" }}>
                                <Typography>
                                  <b>File Link</b>
                                </Typography>
                              </Grid>
                            </Grid>
                            {Ad.map(ad => {
                              return (
                                <Grid
                                  container
                                  key={ad._id}
                                  style={{
                                    backgroundColor: "#fff",
                                    padding: "12px",
                                    marginBottom: "2px",
                                    textAlign: "left"
                                  }}
                                >
                                  <Grid
                                    item
                                    xs={3}
                                    style={{ paddingLeft: "20px" }}
                                  >
                                    <Typography>{ad.docName}</Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography>{ad.desc}</Typography>
                                  </Grid>
                                  <Grid item xs={1}></Grid>
                                  <Grid item xs={2}>
                                    <Typography>
                                      <a
                                        href={ad.doclink}
                                        style={{ textDecoration: "none" }}
                                        target="_blank"
                                      >
                                        <Button
                                          variant="outlined"
                                          color="primary"
                                          size="small"
                                        >
                                          Show Document
                                        </Button>
                                      </a>
                                    </Typography>
                                  </Grid>
                                </Grid>
                              );
                            })}
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    </div>
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
                        <Grid
                          item
                          xs={4}
                          style={{ textAlign: "left", marginBottom: "20px" }}
                        >
                          <Typography
                            variant="h4"
                            style={{ marginBottom: "20px", marginLeft: "20px" }}
                          >
                            <b>Presentation</b>
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <form
                            onSubmit={e => {
                              this.sche_pres(e, Gid);
                            }}
                          >
                            <Grid container style={{margin: "5px 15px 10px 0px", padding: "0px"}}>
                              <Grid item xs={3}></Grid>
                              <Grid
                                item
                                xs={6}
                                style={{
                                  padding: "5px",
                                  backgroundColor: "#fff"
                                }}
                              >
                                {/* <TextField
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
                                /> */}
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <DateTimePicker
                                  required
                                  variant="inline"
                                  inputVariant="outlined"
                                  InputAdornmentProps={{ position: "start" }}
                                  style={{ margin: "10px" }}
                                  value={this.state.dateTime} onChange={this.handleDateTimeChange} />
                                </MuiPickersUtilsProvider>
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
                                let presM = presentation.marks;
                                return (
                                  <>
                                    {presM.length !== 0 ? (
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
                                            {presM.length === 0 ? (
                                              <React.Fragment>
                                                {d.getTime() > Date.now() ? (
                                                  <React.Fragment>
                                                    <Grid item xs={6} />
                                                    <Grid item xs={3}>
                                                      <Typography>
                                                        Presentation Not
                                                        conducted
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
                                          <Grid container>
                                            <Grid item xs={12}>
                                            <ThemeProvider theme={theme}>
                                            <TableContainer
                                              style={{
                                                backgroundColor: "#f8f8f8",
                                                
                                              }}
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
                                                    <TableCell align="center">
                                                      Roll No.
                                                    </TableCell>
                                                    <TableCell align="center">
                                                      Time Management
                                                    </TableCell>
                                                    <TableCell align="center">
                                                      Effectiveness
                                                    </TableCell>
                                                    <TableCell align="center">
                                                      Organization
                                                    </TableCell>
                                                    <TableCell align="center">
                                                      Subject Knowledge
                                                    </TableCell>
                                                  </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                  {presM.map(presM => (
                                                    <TableRow key={presM._id}>
                                                      <TableCell align="center">
                                                        {presM.rollno}
                                                      </TableCell>
                                                      <TableCell align="center">
                                                        <Typography>
                                                          {presM.timeMarks}
                                                        </Typography>
                                                      </TableCell>
                                                      <TableCell align="center">
                                                        <Typography>
                                                          {presM.EODMarks}
                                                        </Typography>
                                                      </TableCell>
                                                      <TableCell align="center">
                                                        <Typography>
                                                          {presM.orgMarks}
                                                        </Typography>
                                                      </TableCell>
                                                      <TableCell align="center">
                                                        <Typography>
                                                          {presM.subKnowMarks}
                                                        </Typography>
                                                      </TableCell>
                                                    </TableRow>
                                                  ))}
                                                </TableBody>
                                              </Table>
                                            </TableContainer>
                                          </ThemeProvider>
                                            </Grid>
                                            <Grid item xs={12}>
                                            <Button
                                              style={{ float: "right", marginTop:"20px" }}
                                              color="secondary"
                                              variant="contained"
                                              onClick={e => {
                                                this.handleDeletePresentation(
                                                  e,
                                                  presentation._id,
                                                  Gid
                                                );
                                              }}
                                            >
                                              Delete
                                            </Button>
                                            </Grid>
                                          </Grid>
                                        </AccordionDetails>
                                      </Accordion>
                                    ) : (
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
                                                        Presentation Not
                                                        conducted
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
                                            <Grid item xs={8} sm={10}></Grid>
                                            <Grid 
                                              item xs={4} sm={2}
                                                style={{
                                                textAlign: "left",
                                                float:"right",
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
                                                    {d.getHours()}:
                                                    {d.getMinutes()} am
                                                  </Typography>
                                                )}
                                                {days[d.getDay()]} {d.getDate()}
                                                /{d.getMonth() + 1}/
                                                {d.getFullYear()}
                                              </React.Fragment>
                                            </Grid>
                                            {presM.length === 0 &&
                                            d.getTime() <= Date.now() ? (
                                              <ThemeProvider theme={theme}>
                                                <TableContainer
                                                  style={{
                                                    backgroundColor: "#f8f8f8",
                                                    marginTop:"10px",
                                                    
                                                  }}
                                                  className={
                                                    classes.tableContainer
                                                  }
                                                  component={Paper}
                                                >
                                                  <Table
                                                    className={classes.table}
                                                    size="small"
                                                    aria-label="a dense table"
                                                  >
                                                    <TableHead>
                                                      <TableRow>
                                                        <TableCell align="center">
                                                          Name
                                                        </TableCell>
                                                        <TableCell align="center">
                                                          Roll No.
                                                        </TableCell>
                                                        <TableCell align="center">
                                                          Time Management
                                                        </TableCell>
                                                        <TableCell align="center">
                                                          Effectiveness
                                                        </TableCell>
                                                        <TableCell align="center">
                                                          Organization
                                                        </TableCell>
                                                        <TableCell align="center">
                                                          Subject Knowledge
                                                        </TableCell>
                                                      </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                      {members.map(
                                                        (member, index) => (
                                                          <TableRow
                                                            key={member._id}
                                                          >
                                                            <TableCell align="center">
                                                              {member.name}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                              {member.rollno}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                              <TextField
                                                                size="small"
                                                                type="number"
                                                                value={
                                                                  this.state
                                                                    .timeMarks
                                                                }
                                                                variant="outlined"
                                                                label="(3)"
                                                                onChange={e => {
                                                                  this.handleTimeMarks(
                                                                    e,
                                                                    index
                                                                  );
                                                                }}
                                                                style={{
                                                                  margin:
                                                                    "10px 5px",
                                                                  backgroundColor:
                                                                    "#fff"
                                                                }}
                                                                required
                                                              />
                                                            </TableCell>
                                                            <TableCell align="center">
                                                              <TextField
                                                                size="small"
                                                                type="number"
                                                                value={this.state.EODMarks}
                                                                variant="outlined"
                                                                label="(3) "
                                                                onChange={e => {this.handleEODMarks(e,index);}}
                                                                style={{
                                                                  margin:
                                                                    "10px 5px",
                                                                  backgroundColor:
                                                                    "#fff"
                                                                }}
                                                                required
                                                              />
                                                            </TableCell>
                                                            <TableCell align="center">
                                                              <TextField
                                                                size="small"
                                                                type="number"
                                                                value={
                                                                  this.state
                                                                    .orgMarks
                                                                }
                                                                variant="outlined"
                                                                label="(2)"
                                                                onChange={e => {
                                                                  this.handleOrgMarks(
                                                                    e,
                                                                    index
                                                                  );
                                                                }}
                                                                style={{
                                                                  margin:
                                                                    "10px 5px",
                                                                  backgroundColor:
                                                                    "#fff"
                                                                }}
                                                                required
                                                              />
                                                            </TableCell>

                                                            <TableCell align="center">
                                                              <TextField
                                                                size="small"
                                                                type="number"
                                                                value={
                                                                  this.state
                                                                    .subKnowMarks
                                                                }
                                                                variant="outlined"
                                                                label="(2)"
                                                                onChange={e => {
                                                                  this.handleSubKnowMarks(
                                                                    e,
                                                                    index
                                                                  );
                                                                }}
                                                                style={{
                                                                  margin:
                                                                    "10px 5px",
                                                                  backgroundColor:
                                                                    "#fff"
                                                                }}
                                                                required
                                                              />
                                                            </TableCell>
                                                          </TableRow>
                                                        )
                                                      )}
                                                    </TableBody>
                                                  </Table>
                                                </TableContainer>
                                                <div style={{width:"100%"}}>
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
                                                    float:"right"
                                                  }}
                                                >
                                                  Submit Marks
                                                </Button>
                                                </div>
                                                
                                              </ThemeProvider>
                                            ) : null}
                                            {presM.length !== 0 ? (
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
                                                        {
                                                          presentation.subKnowMarks
                                                        }
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

                                                <div
                                                  style={{ textAlign: "left", width:"100%" }}
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
                                                    style={{float:"left"}}
                                                  >
                                                    Delete presentation
                                                  </Button>
                                                </div>
                                              </React.Fragment>
                                            ) : (
                                              <Grid
                                                item
                                                xs={12}
                                                style={{ textAlign: "left" }}
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
                                    )}
                                  </>
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
                          <Typography variant="h4">
                            <b>Report Marks</b>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ margin: "20px 0px" }}>
                          {repLength !== 0 ? (
                            <ThemeProvider theme={theme}>
                              <TableContainer
                                style={{ backgroundColor: "#fff" }}
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
                                      <TableCell align="center">
                                        Roll-No.
                                      </TableCell>
                                      <TableCell align="center">
                                        Organizational and writing style
                                      </TableCell>
                                      <TableCell align="center">
                                        Engineering Theory and Analysis
                                      </TableCell>
                                      <TableCell align="center">
                                        Use of Bibliography
                                      </TableCell>
                                      <TableCell align="center">
                                        Spelling and Grammar
                                      </TableCell>
                                      <TableCell align="center">
                                        Graphs/Diagrams
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {report.map((report, index) => (
                                      <TableRow key={report._id}>
                                        <TableCell align="center">
                                          {report.rollno}
                                        </TableCell>
                                        <TableCell align="center">
                                          <Typography>
                                            {report.orgAndWriting}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                          <Typography>
                                            {report.enggTheoryAnaly}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                          <Typography>
                                            {report.biblogrpahy}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                          <Typography>
                                            {report.spellAndGrammar}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                          <Typography>
                                            {report.diagrams}
                                          </Typography>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                              <div>
                              <Button
                                style={{ float: "right",marginTop:"20px" }}
                                color="secondary"
                                variant="contained"
                                onClick={this.repDelClickOpen}
                              >
                                Edit
                              </Button>
                              <Dialog
                                open={this.state.repDelOpen}
                                onClose={this.repDelClickClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title">{"Re-enter the marks?"}</DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    If you click ok then you have to re-enter the marks completely. If you refresh the page or close the tabs then all your changes will be lost. 
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={this.repDelCancelClickClose} color="primary" autoFocus>
                                    Cancel
                                  </Button>
                                  <Button onClick={this.repDelAgreeClickClose} color="primary" autoFocus>
                                    Agree
                                  </Button>
                                </DialogActions>
                              </Dialog>
                              </div>
                            </ThemeProvider>
                          ) : (
                            <>
                              {/* <form> */}
                              <ThemeProvider theme={theme}>
                                <TableContainer
                                  style={{ backgroundColor: "#fff" }}
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
                                        <TableCell align="center">
                                          Name
                                        </TableCell>
                                        <TableCell align="center">
                                          Roll-No.
                                        </TableCell>
                                        <TableCell align="center">
                                          Organizational and writing style
                                        </TableCell>
                                        <TableCell align="center">
                                          Engineering Theory and Analysis
                                        </TableCell>
                                        <TableCell align="center">
                                          Use of Bibliography
                                        </TableCell>
                                        <TableCell align="center">
                                          Spelling_and Grammar
                                        </TableCell>
                                        <TableCell align="center">
                                          Graphs/Diagrams
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {members.map((member, index) => (
                                        <TableRow key={member._id}>
                                          <TableCell align="center">
                                            {member.name}
                                          </TableCell>
                                          <TableCell align="center">
                                            {member.rollno}
                                          </TableCell>
                                          <TableCell align="center">
                                            <TextField
                                              type="number"
                                              id="Organisation_and_writing_style"
                                              name="Organisation_and_writing_style"
                                              label="(3)"
                                              value={this.state.orgAndWriting}
                                              variant="outlined"
                                              size="small"
                                              onChange={e => {
                                                this.handleOrgAndWriting(
                                                  e,
                                                  index,
                                                  member.rollno
                                                );
                                              }}
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
                                              variant="outlined"
                                              size="small"
                                              onChange={e => {
                                                this.handleEngTheoryAnaly(
                                                  e,
                                                  index
                                                );
                                              }}
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
                                              variant="outlined"
                                              size="small"
                                              onChange={e => {
                                                this.handleBibliography(
                                                  e,
                                                  index
                                                );
                                              }}
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
                                              variant="outlined"
                                              size="small"
                                              onChange={e => {
                                                this.handleSpellAndGrammar(
                                                  e,
                                                  index
                                                );
                                              }}
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
                                              variant="outlined"
                                              size="small"
                                              onChange={e => {
                                                this.handleDiagram(e, index);
                                              }}
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
                              <div style={{textAlign:"right", marginTop:"20px"}}>
                                  <Button
                                    type="submit"
                                    onClick={e => {
                                      this.handleReportSubmit(e, Gid);
                                    }}
                                    variant="contained"
                                    color="primary"
                                    
                                  >
                                    Submit
                                  </Button>
                              </div>
                              {/* </form> */}
                            </>
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
                          <Typography
                            variant="h4"
                            style={{ marginBottom: "20px" }}
                          >
                            <b>Implementation Marks</b>
                          </Typography>
                        </Grid>
                        {impLength !== 0 ? (
                          <ThemeProvider theme={theme}>
                            <TableContainer
                              style={{ backgroundColor: "#fff" }}
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
                                    <TableCell align="center">
                                      Roll-No.
                                    </TableCell>
                                    <TableCell align="center">
                                      Problem Statement
                                    </TableCell>
                                    <TableCell align="center">
                                      Concepts
                                    </TableCell>
                                    <TableCell align="center">
                                      Innovation
                                    </TableCell>
                                    <TableCell align="center">
                                      Teamwork
                                    </TableCell>
                                    <TableCell align="center">
                                      Project Management and Finance
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {implementation.map(
                                    (implementation, index) => (
                                      <TableRow key={implementation._id}>
                                        <TableCell align="center">
                                          {implementation.rollno}
                                        </TableCell>
                                        <TableCell align="center">
                                          <Typography>
                                            {implementation.probStatment}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                          <Typography>
                                            {implementation.concept}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                          <Typography>
                                            {implementation.innovation}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                          <Typography>
                                            {implementation.teamwork}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                          <Typography>
                                            {implementation.pmf}
                                          </Typography>
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                            <div style={{ width: "100%" }}>
                              <Button
                                style={{ float: "right",margin:"20px 00" }}
                                color="secondary"
                                variant="contained"
                                onClick={this.impDelClickOpen}
                              >
                                Edit
                              </Button>
                              <Dialog
                                open={this.state.impDelOpen}
                                onClose={this.impDelClickClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title">{"Re-enter the marks?"}</DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    If you click ok then you have to re-enter the marks completely. If you refresh the page or close the tabs then all your changes will be lost. 
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={this.impDelCancelClickClose} color="primary" autoFocus>
                                    Cancel
                                  </Button>
                                  <Button onClick={this.impDelAgreeClickClose} color="primary" autoFocus>
                                    Agree
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </div>
                          </ThemeProvider>
                        ) : (
                          <Grid item xs={12} style={{ marginBottom: "20px" }}>
                            <ThemeProvider theme={theme}>
                              <TableContainer
                                style={{ backgroundColor: "#fff" }}
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
                                      <TableCell align="center">
                                        Roll-No.
                                      </TableCell>
                                      <TableCell align="center">
                                        Problem Statement
                                      </TableCell>
                                      <TableCell align="center">
                                        Concepts
                                      </TableCell>
                                      <TableCell align="center">
                                        Innovation
                                      </TableCell>
                                      <TableCell align="center">
                                        Teamwork
                                      </TableCell>
                                      <TableCell align="center">
                                        Project Management and Finance
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {members.map((member, index) => (
                                      <TableRow key={member._id}>
                                        <TableCell align="center">
                                          {member.name}
                                        </TableCell>
                                        <TableCell align="center">
                                          {member.rollno}
                                        </TableCell>
                                        <TableCell align="center">
                                          <TextField
                                            type="number"
                                            id="Problem_Statement"
                                            name="Problem_Statement"
                                            label="(3)"
                                            variant="outlined"
                                            size="small"
                                            onChange={e => {
                                              this.handleProbStatement(
                                                e,
                                                index
                                              );
                                            }}
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
                                            variant="outlined"
                                            size="small"
                                            onChange={e => {
                                              this.handleConcept(e, index);
                                            }}
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
                                            variant="outlined"
                                            size="small"
                                            onChange={e => {
                                              this.handleInnovation(e, index);
                                            }}
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
                                            variant="outlined"
                                            size="small"
                                            onChange={e => {
                                              this.handleTeamWork(e, index);
                                            }}
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
                                            variant="outlined"
                                            size="small"
                                            onChange={e => {
                                              this.handlePMF(e, index);
                                            }}
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
                            <div>
                              <Button
                                onClick={e => {
                                  this.handleImplementationSubmit(e, Gid);
                                }}
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{
                                  float: "right",
                                  marginTop: "20px"
                                }}
                              >
                                Submit
                              </Button>
                            </div>
                          </Grid>
                        )}
                      </Grid>
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
                          sm={12}
                          style={{
                            textAlign: "left",
                            margin: "20px 0px 0px 0px"
                          }}
                        >
                          <Typography variant="h4">
                            <b>Weekly Log</b>
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
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
                                value={this.state.weeklyLog.weeklyLogDate}
                                InputAdornmentProps={{ position: "start" }}
                                style={{ margin: "10px" }}
                                onChange={this.handleweelyDateChange}
                              />
                            </MuiPickersUtilsProvider>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => this.sendLog(Gid, members)}
                              style={{
                                margin: "20px ",
                                marginLeft: "50px"
                              }}
                            >
                              Add Log
                            </Button>
                            <ThemeProvider theme={theme}>
                                <TableContainer
                                  style={{ backgroundColor: "#fff" }}
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
                                        <TableCell align="center">
                                          Roll-No.
                                        </TableCell>
                                        <TableCell align="center" >
                                          Remark
                                        </TableCell>
                                        <TableCell align="center">
                                          Task Completion
                                        </TableCell>
                                        <TableCell align="center">
                                          Level of preparation
                                        </TableCell>
                                        <TableCell align="center">
                                          Working within a team
                                        </TableCell>
                                        <TableCell align="center">
                                          Punctuality and Regularity
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {members.map((member, index) => (
                                        <TableRow key={member._id}>
                                          <TableCell align="center">
                                            {member.rollno}
                                          </TableCell>
                                          <TableCell align = "center" style={{width:"35%"}}>
                                            <TextField
                                              type="text"
                                              id="logMsg"
                                              name="logMsg"
                                              label = "Remark"
                                              variant="outlined"
                                              size="small"
                                              onChange={(e)=>{this.weeklyMsgHandler(e,index)}}
                                              required
                                              style={{width:"100%"}}
                                            />
                                          </TableCell> 
                                          <TableCell align="center">
                                            <TextField
                                              type="number"
                                              id="Task_Completion"
                                              name="Task_Completion"
                                              label="(5)"
                                              variant="outlined"
                                              size="small"
                                              onChange={e => {
                                                this.handleTaskComp(
                                                  e,
                                                  index
                                                );
                                              }}
                                              // style={{ width: "40%" }}
                                              required
                                            />
                                          </TableCell>
                                          <TableCell align="center">
                                            <TextField
                                              type="number"
                                              id="Level_of_Prep"
                                              name="Level_of_Prep"
                                              label="(5)"
                                              variant="outlined"
                                              size="small"
                                              onChange={e => {
                                                this.handleLevelPrep(
                                                  e,
                                                  index
                                                );
                                              }}
                                              // style={{ width: "40%" }}
                                              required
                                            />
                                          </TableCell>
                                          <TableCell align="center">
                                            <TextField
                                              type="number"
                                              id="Work_Team"
                                              name="Work_Team"
                                              label="(5)"
                                              variant="outlined"
                                              size="small"
                                              onChange={e => {
                                                this.handleWorkTeam(
                                                  e,
                                                  index
                                                );
                                              }}
                                              // style={{ width: "40%" }}
                                              required
                                            />
                                          </TableCell>
                                          <TableCell align="center">
                                            <TextField
                                              type="number"
                                              id="Punc_and_Reg"
                                              name="Punc_and_Reg"
                                              label="(5)"
                                              variant="outlined"
                                              size="small"
                                              onChange={e => {this.handlePuncAndReg(e,index)}}
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
                          {/* {weeklyLog ? (
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
                          )} */}
                        </Grid>
                      </Grid>
                    </Card>
                    <Card
                      style={{
                        backgroundColor: "#d8d8d8",
                        padding: "0px 30px",
                        marginBottom: "100px",
                        marginTop:"0px"
                      }}
                    >
                      <Grid container className={classes.comment}>
                        <Grid item xs={12} style={{ margin: "20px 10px" }}>
                          <Typography
                            variant="h4"
                            style={{ textAlign: "left" }}
                          >
                            <b>Comments</b>
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
                    </Card>
                    <div style={{ height: "50px" }}></div>
                  </div>
                );
              } else return null;
            })}
          </div>
          <Footer />
        </React.Fragment>
      );
    } else return <LinearProgress />;
  }
}

GuidePrefPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GuidePrefPage);
