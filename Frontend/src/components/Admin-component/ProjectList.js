import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  CircularProgress,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  LinearProgress,
  MenuItem,
  TextField
} from "@material-ui/core";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { toFirstCharUppercase } from "../ToUpper";
import axios from "axios";
import SERVER_URL from "../../Pages/URL";
import qs from "qs";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import CloudDownload from "@material-ui/icons/CloudDownload";
// import FileDownload from "@material-ui/icons/FileDownload";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: "600",
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.text.secondary
  },
  accor: {
    width: "100%",
    margin: "auto"
  },
  accordet: {
    width: "100%",
    margin: "auto"
  },
  dueDateContainer: {
    borderRadius: "0px"
  },
  downloadButton: {
    float: "right",
    marginTop: "5%",
    marginBottom: "10px"
  }
}));

// let Guides = null;

export default function ControlledAccordions(props) {
  let Groups = props.Groups;
  let dueDate = Groups[0].dueDate;
  let Guides = props.Guides;
  const histor = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [assignLoading, setAssignLoading] = React.useState(false);
  const [guide, setGuide] = React.useState(null);
  const [guideE, setGuideE] = React.useState(null);
  const [changeDuedate, setDueDate] = React.useState(new Date());
  const [DueDateOpen, setDOpen] = React.useState(false);
  const [downLoading, setDownLoading] = React.useState(false);
  const [SdownLoading, setSDownLoading] = React.useState(false);
  let showButton = false;

  const handleGuideChange = e => {
    setGuide(e.target.value);
    Guides.map(Guide => {
      if (Guide.name === e.target.value) {
        setGuideE(Guide.email);
      }
      return null;
    });
    return null;
  };

  //Change DueDate-------------------------------
  //to change format of the month
  const appendLeadingZeroes = n => {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  };

  //Submission List
  const downloadSubmissionList = () => {
    setSDownLoading(true);
    axios({
      method: "get",
      url: SERVER_URL + "/submissionList",
      responseType: "blob",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Submission List.xlsx");
        document.body.appendChild(link);
        link.click();
        setSDownLoading(false);
      })
      .catch(err => {
        setSDownLoading(false);
        console.log(err);
      });
  };

//Project List Download
  const downloadProjectList = () => {
    setDownLoading(true);
    axios({
      method: "get",
      url: SERVER_URL + "/excel",
      responseType: "blob",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Project List.xlsx");
        document.body.appendChild(link);
        link.click();
        setDownLoading(false);
      })
      .catch(err => {
        setDownLoading(false);
        console.log(err);
      });
  };

  const handleChangeDueDateDialogOpen = () => {
    setDOpen(true);
  };
  const handleChangeDueDateDialogClose = () => {
    setDOpen(false);
  };
  const handleChangeDueDate = () => {
    axios({
      method: "post",
      url: SERVER_URL + "/updateDueDate",
      credentials: "include",
      withCredentials: true,
      data: qs.stringify({
        dueDate: changeDuedate
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(res => {
        console.log("Due Changed");
        window.location.reload(false);
      })

      .catch(err => {
        alert("DueDate didnt Change");
        console.log(err);
      });
  };
  const handleSetDueDate = date => {
    let current_datetime = date;
    let formatted_date =
      current_datetime.getFullYear() +
      "-" +
      appendLeadingZeroes(current_datetime.getMonth() + 1) +
      "-" +
      appendLeadingZeroes(current_datetime.getDate());
    setDueDate(formatted_date);
  };

  // Assign Guide button

  const assignGuide = (e, id) => {
    if (guide === null) {
      alert("Please select a guide first");
    } else {
      setAssignLoading(true);
      axios({
        method: "post",
        url: SERVER_URL + "/addGuide",
        credentials: "include",
        withCredentials: true,
        data: qs.stringify({
          name: guide,
          email: guideE,
          groupId: id
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
        .then(res => {
          setAssignLoading(false);
          window.location.reload(false);
        })

        .catch(err => {
          alert("Guide not assigned");
          setAssignLoading(false);
          console.log(err);
        });
    }
  };

  const handleChangeGuide = id => {
    Groups.map(Group => {
      if (Group.id === id) {
        Group.guide.name = null;
        Group.guide.email = null;
      }
      return(null);
    });
    setGuide(null);
    return null;
  };

  // Tabs handleChange

  const handleChangeT = (event, newValue) => {
    setValue(newValue);
  };

  // SwipeableView index changing

  const handleChangeIndex = index => {
    setValue(index);
  };

  // Accordion handleChange

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // let e={}

  if (Guides !== null && Guides.length !== 0) {
    if (guide === null) {
      setGuide(Guides[0].name);
      setGuideE(Guides[0].email);
    }
    return (
      <div>
        {/* DIALOG FOR CHANGE DUEDATE */}
        <Dialog
          open={DueDateOpen}
          onClose={handleChangeDueDateDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" style={{ margin: "auto 100px" }}>
            Change DueDate
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Select a new DueDate</DialogContentText>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                required
                variant="inline"
                inputVariant="outlined"
                format="yyyy/MM/dd"
                value={changeDuedate}
                onChange={handleSetDueDate}
                InputAdornmentProps={{ position: "start" }}
              />
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleChangeDueDateDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleChangeDueDate} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <div></div>
        {/* DIALOG END */}
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <div>
              <Card className={classes.dueDateContainer}>
                <Grid container style={{ padding: "5px" }}>
                  <Grid item xs={8} style={{ margin: "auto" }}>
                    <Typography variant="h6">
                      &nbsp;&nbsp;
                      <b>
                        DueDate for Submitting Proposals:&nbsp;
                        {dueDate.split("T")[0]}
                      </b>
                    </Typography>
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: "right" }}>
                    <Button
                      onClick={handleChangeDueDateDialogOpen}
                      variant="contained"
                      color="primary"
                    >
                      Change DueDate
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </div>
            <Tabs
              value={value}
              onChange={handleChangeT}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Approval done" {...a11yProps(0)} />
              <Tab label="Approval by HOD left" {...a11yProps(1)} />
              <Tab label="Applied" {...a11yProps(2)} />
              <Tab label="Not Applied" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              {Groups.map(Group => {
                const routeChange = () => {
                  histor.push({
                    pathname: `/admin/prefs/${id}`,
                    state: { Group: Group }
                  });
                };
                let DueDate = Group.dueDate.split("T")[0];
                let members = Group.members;
                let Gname = Group.name;
                let id = Group.id;
                let pref1 = [];
                let pref2 = [];
                let pref3 = [];
                let AppliedOn = null;
                let pref1AdminApproval = false;
                let pref2AdminApproval = false;
                let pref3AdminApproval = false;
                let pref1HodApproval = false;
                let pref2HodApproval = false;
                let pref3HodApproval = false;

                if (Group.proposals.length !== 0) {
                  pref1 = Group.proposals[0];
                  pref2 = Group.proposals[1];
                  pref3 = Group.proposals[2];

                  AppliedOn = pref1.applied.split("T")[0];
                  pref1AdminApproval = pref1.approval.admin;
                  pref2AdminApproval = pref2.approval.admin;
                  pref3AdminApproval = pref3.approval.admin;
                  pref1HodApproval = pref1.approval.hod;
                  pref2HodApproval = pref2.approval.hod;
                  pref3HodApproval = pref3.approval.hod;
                }

                if (
                  (pref1AdminApproval && pref1HodApproval) ||
                  (pref2AdminApproval && pref2HodApproval) ||
                  (pref3AdminApproval &&
                    pref3HodApproval &&
                    Group.proposals.length !== 0)
                ) {
                  showButton = true;
                  return (
                    <Accordion
                      expanded={expanded === Gname}
                      onChange={handleChange(Gname)}
                      className={classes.accor}
                      key={Group.name}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography className={classes.heading}>
                          {toFirstCharUppercase(Group.name)}
                        </Typography>
                        {members.map(member => {
                          return (
                            <Typography
                              key={member.name}
                              className={classes.secondaryHeading}
                            >
                              {member.name}&nbsp;&nbsp;&nbsp;&nbsp;
                            </Typography>
                          );
                        })}
                      </AccordionSummary>
                      <AccordionDetails className={classes.accordet}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography style={{ fontWeight: "600" }}>
                                  Name
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                {members.map(member => {
                                  return (
                                    <Typography key={member.email}>
                                      {member.name}
                                    </Typography>
                                  );
                                })}
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={5}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography style={{ fontWeight: "600" }}>
                                  Email
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                {members.map(member => {
                                  return (
                                    <Typography key={member.email}>
                                      {member.email}
                                    </Typography>
                                  );
                                })}
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography style={{ fontWeight: "600" }}>
                                  Roll no
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                {members.map(member => {
                                  return (
                                    <Typography key={member.email}>
                                      {member.rollno}
                                    </Typography>
                                  );
                                })}
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            {DueDate >= AppliedOn ? (
                              <Typography
                                style={{ color: "green" }}
                                variant="h5"
                              >
                                Proposals Submitted On Time
                              </Typography>
                            ) : (
                              <Typography style={{ color: "red" }} variant="h5">
                                Proposals Submitted LATE
                              </Typography>
                            )}
                          </Grid>
                          <Grid item container xs={12}>
                            {Group.proposals.length === 3 ? (
                              <React.Fragment>
                                <Grid item xs={3}>
                                  <Button
                                    onClick={routeChange}
                                    variant="outlined"
                                    color="primary"
                                  >
                                    Show Preferences
                                  </Button>
                                </Grid>
                                <Grid container item xs={9}>
                                  {Group.guide.name === null ? (
                                    <React.Fragment>
                                      <Grid item xs={5} />
                                      <Grid item xs={3}>
                                        <TextField
                                          size="medium"
                                          id="selectGuide"
                                          select
                                          value={guide}
                                          onChange={handleGuideChange}
                                          helperText="Please select Guide"
                                        >
                                          {Guides.map(Guide => {
                                            return (
                                              <MenuItem
                                                key={Guide.email}
                                                value={Guide.name}
                                              >
                                                {Guide.name}
                                              </MenuItem>
                                            );
                                          })}
                                        </TextField>
                                      </Grid>
                                      <Grid item xs={1} />
                                      <Grid item xs={3}>
                                        {!assignLoading ? (
                                          <Button
                                            style={{ marginRight: "20px" }}
                                            variant="contained"
                                            color="secondary"
                                            onClick={e => assignGuide(e, id)}
                                          >
                                            Assign Guide
                                          </Button>
                                        ) : (
                                          <CircularProgress />
                                        )}
                                      </Grid>
                                    </React.Fragment>
                                  ) : (
                                    <React.Fragment>
                                      <Grid item xs={2} />
                                      <Grid item xs={3}>
                                        <Typography
                                          variant="h6"
                                          color="secondary"
                                        >
                                          Guide Assigned:
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={3}>
                                        <Typography
                                          variant="h6"
                                          color="secondary"
                                        >
                                          {Group.guide.name}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={4}>
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          onClick={() => {
                                            handleChangeGuide(id);
                                          }}
                                        >
                                          Change Guide
                                        </Button>
                                      </Grid>
                                    </React.Fragment>
                                  )}
                                </Grid>
                              </React.Fragment>
                            ) : (
                              <Button
                                disabled
                                variant="outlined"
                                color="secondary"
                              >
                                <Typography>Preferences not filled</Typography>
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  );
                }
                return null;
              })}

              <React.Fragment>
                {/* SUBMISSION LIST BUTTON */}
                {SdownLoading ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.downloadButton}
                    style={{ minWidth: "177.04px", maxHeight: "36px" }}
                  >
                    <CircularProgress
                      size="2rem"
                      color="white"
                    />
                  </Button>
                ) : (
                  <React.Fragment>
                    {showButton ? (
                      <React.Fragment>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.downloadButton}
                          startIcon={<CloudDownload />}
                          onClick={downloadSubmissionList}
                        >
                          Submission List
                        </Button>
                      </React.Fragment>
                    ) : null}
                  </React.Fragment>
                )}

                {downLoading ? (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.downloadButton}
                    style={{ minWidth: "152.84px", maxHeight: "36px",marginRight: "20px" }}
                  >
                    <CircularProgress
                      size="2rem"
                      color="white"
                      // style={{ padding: "0 40px" }}
                    />
                  </Button>
                ) : (
                  <React.Fragment>
                    {showButton ? (
                      <React.Fragment>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.downloadButton}
                          startIcon={<CloudDownload />}
                          onClick={downloadProjectList}
                          style={{ marginRight: "20px" }}
                        >
                          Project List
                        </Button>
                      </React.Fragment>
                    ) : null}
                  </React.Fragment>
                )}
              </React.Fragment>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              {Groups.map(Group => {
                const routeChange = () => {
                  histor.push({
                    pathname: `/admin/prefs/${id}`,
                    state: { Group: Group }
                  });
                };
                let DueDate = Group.dueDate.split("T")[0];
                let members = Group.members;
                let Gname = Group.name;
                let id = Group.id;
                let pref1 = [];
                let pref2 = [];
                let pref3 = [];
                let AppliedOn = null;

                let pref1AdminApproval = false;
                let pref2AdminApproval = false;
                let pref3AdminApproval = false;
                let pref1HodApproval = false;
                let pref2HodApproval = false;
                let pref3HodApproval = false;

                if (Group.proposals.length !== 0) {
                  pref1 = Group.proposals[0];
                  pref2 = Group.proposals[1];
                  pref3 = Group.proposals[2];

                  AppliedOn = pref1.applied.split("T")[0];
                  pref1AdminApproval = pref1.approval.admin;
                  pref2AdminApproval = pref2.approval.admin;
                  pref3AdminApproval = pref3.approval.admin;
                  pref1HodApproval = pref1.approval.hod;
                  pref2HodApproval = pref2.approval.hod;
                  pref3HodApproval = pref3.approval.hod;
                }

                if (
                  (pref1AdminApproval && !pref1HodApproval) ||
                  (pref2AdminApproval && !pref2HodApproval) ||
                  (pref3AdminApproval &&
                    !pref3HodApproval &&
                    Group.proposals.length !== 0)
                ) {
                  return (
                    <Accordion
                      expanded={expanded === Gname}
                      onChange={handleChange(Gname)}
                      className={classes.accor}
                      key={Group.name}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography className={classes.heading}>
                          {toFirstCharUppercase(Group.name)}
                        </Typography>
                        {members.map(member => {
                          return (
                            <Typography
                              key={member.name}
                              className={classes.secondaryHeading}
                            >
                              {member.name}&nbsp;&nbsp;&nbsp;&nbsp;
                            </Typography>
                          );
                        })}
                      </AccordionSummary>
                      <AccordionDetails className={classes.accordet}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography style={{ fontWeight: "600" }}>
                                  Name
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                {members.map(member => {
                                  return (
                                    <Typography key={member.email}>
                                      {member.name}
                                    </Typography>
                                  );
                                })}
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} sm={5}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography style={{ fontWeight: "600" }}>
                                  Email
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                {members.map(member => {
                                  return (
                                    <Typography key={member.email}>
                                      {member.email}
                                    </Typography>
                                  );
                                })}
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} sm={3}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography style={{ fontWeight: "600" }}>
                                  Roll-no
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                {members.map(member => {
                                  return (
                                    <Typography key={member.email}>
                                      {member.rollno}
                                    </Typography>
                                  );
                                })}
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            {DueDate >= AppliedOn ? (
                              <Typography
                                style={{ color: "green" }}
                                variant="h5"
                              >
                                Proposals Submitted On Time
                              </Typography>
                            ) : (
                              <Typography style={{ color: "red" }} variant="h5">
                                Proposals Submitted LATE
                              </Typography>
                            )}
                          </Grid>
                          <Grid item xs={12}>
                            {Group.proposals.length === 3 ? (
                              <div>
                                <Button
                                  onClick={routeChange}
                                  variant="outlined"
                                  color="primary"
                                >
                                  Show Preferences
                                </Button>
                              </div>
                            ) : (
                              <Button
                                disabled
                                variant="outlined"
                                color="secondary"
                              >
                                <Typography>Preferences not filled</Typography>
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  );
                }
                return null;
              })}
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              {Groups.map(Group => {
                const routeChange = () => {
                  histor.push({
                    pathname: `/admin/prefs/${id}`,
                    state: { Group: Group }
                  });
                };
                let DueDate = Group.dueDate.split("T")[0];

                let members = Group.members;
                let Gname = Group.name;
                let id = Group.id;
                let pref1 = [];
                let pref2 = [];
                let pref3 = [];
                let AppliedOn = null;
                let pref1Approval = false;
                let pref2Approval = false;
                let pref3Approval = false;

                if (Group.proposals.length !== 0) {
                  pref1 = Group.proposals[0];
                  pref2 = Group.proposals[1];
                  pref3 = Group.proposals[2];

                  AppliedOn = pref1.applied.split("T")[0];
                  pref1Approval = pref1.approval.admin;
                  pref2Approval = pref2.approval.admin;
                  pref3Approval = pref3.approval.admin;
                }

                if (
                  !pref1Approval &&
                  !pref2Approval &&
                  !pref3Approval &&
                  Group.proposals.length !== 0
                ) {
                  return (
                    <Accordion
                      expanded={expanded === Gname}
                      onChange={handleChange(Gname)}
                      className={classes.accor}
                      key={Group.name}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography className={classes.heading}>
                          {toFirstCharUppercase(Group.name)}
                        </Typography>
                        {members.map(member => {
                          return (
                            <Typography
                              key={member.name}
                              className={classes.secondaryHeading}
                            >
                              {member.name}&nbsp;&nbsp;&nbsp;&nbsp;
                            </Typography>
                          );
                        })}
                      </AccordionSummary>
                      <AccordionDetails className={classes.accordet}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography style={{ fontWeight: "600" }}>
                                  Name
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                {members.map(member => {
                                  return (
                                    <Typography key={member.name}>
                                      {member.name}
                                    </Typography>
                                  );
                                })}
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} sm={5}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography style={{ fontWeight: "600" }}>
                                  Email
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                {members.map(member => {
                                  return (
                                    <Typography key={member.email}>
                                      {member.email}
                                    </Typography>
                                  );
                                })}
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} sm={3}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography style={{ fontWeight: "600" }}>
                                  Roll no
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                {members.map(member => {
                                  return (
                                    <Typography key={member.rollno}>
                                      {member.rollno}
                                    </Typography>
                                  );
                                })}
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            {DueDate >= AppliedOn ? (
                              <Typography
                                style={{ color: "green" }}
                                variant="h5"
                              >
                                Proposals Submitted On Time
                              </Typography>
                            ) : (
                              <Typography style={{ color: "red" }} variant="h5">
                                Proposals Submitted LATE
                              </Typography>
                            )}
                          </Grid>
                          <Grid item xs={12}>
                            {Group.proposals.length === 3 ? (
                              <div>
                                <Button
                                  onClick={routeChange}
                                  variant="outlined"
                                  color="primary"
                                >
                                  Show Preferences
                                </Button>
                              </div>
                            ) : (
                              <Button
                                disabled
                                variant="outlined"
                                color="secondary"
                              >
                                <Typography>Preferences not filled</Typography>
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  );
                }
                return null;
              })}
            </TabPanel>

            <TabPanel value={value} index={3} dir={theme.direction}>
              {Groups.map(Group => {
                const routeChange = () => {
                  histor.push({
                    pathname: `/admin/prefs/${id}`,
                    state: { Group: Group }
                  });
                };
                let DueDate = Group.dueDate.split("T")[0];
                let members = Group.members;
                let Gname = Group.name;
                let id = Group.id;

                if (Group.proposals.length === 0) {
                  return (
                    <Accordion
                      expanded={expanded === Gname}
                      onChange={handleChange(Gname)}
                      className={classes.accor}
                      key={Group.name}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography className={classes.heading}>
                          {toFirstCharUppercase(Group.name)}
                        </Typography>
                        {members.map(member => {
                          return (
                            <Typography
                              key={member.name}
                              className={classes.secondaryHeading}
                            >
                              {member.name}&nbsp;&nbsp;&nbsp;&nbsp;
                            </Typography>
                          );
                        })}
                      </AccordionSummary>
                      <AccordionDetails className={classes.accordet}>
                        <Grid
                          container
                          spacing={3}
                          style={{ width: "100%", padding: "auto" }}
                        >
                          <Grid item xs={12} sm={4}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography style={{ fontWeight: "600" }}>
                                  Name
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                {members.map(member => {
                                  return (
                                    <Typography key={member.name}>
                                      {member.name}
                                    </Typography>
                                  );
                                })}
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} sm={5}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography style={{ fontWeight: "600" }}>
                                  Email
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                {members.map(member => {
                                  return (
                                    <Typography key={member.email}>
                                      {member.email}
                                    </Typography>
                                  );
                                })}
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} sm={3}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography style={{ fontWeight: "600" }}>
                                  Roll-no
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                {members.map(member => {
                                  return (
                                    <Typography key={member.rollno}>
                                      {member.rollno}
                                    </Typography>
                                  );
                                })}
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>
                              <b>Due Date for Submitting Proposals:</b>
                              &nbsp;&nbsp;
                              {DueDate}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            {Group.proposals.length === 3 ? (
                              <div>
                                <Button
                                  onClick={routeChange}
                                  variant="outlined"
                                  color="primary"
                                >
                                  Show Preferences
                                </Button>
                              </div>
                            ) : (
                              <Button variant="outlined" color="secondary">
                                <Typography>Preferences not filled</Typography>
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  );
                }
                return null;
              })}
            </TabPanel>
          </SwipeableViews>
        </div>
      </div>
    );
  } else {
    return <LinearProgress />;
  }
}
