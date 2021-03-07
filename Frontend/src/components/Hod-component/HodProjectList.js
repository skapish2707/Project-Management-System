import React, { useState } from "react";
import {
  Typography,
  makeStyles,
  AppBar,
  Tab,
  Tabs,
  Box,
  useTheme,
  AccordionSummary,
  Grid,
  Button,
  Accordion,
  AccordionDetails,
  CircularProgress
} from "@material-ui/core";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useHistory } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { toFirstCharUppercase } from "../ToUpper";
import CloudDownload from "@material-ui/icons/CloudDownload";
import axios from "axios";
import SERVER_URL from "../../Pages/URL";

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
  downloadButton: {
    float: "right",
    marginTop: "5%",
    marginBottom: "10px"
  }
}));

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

const HodProjectList = props => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState(0);
  const [downLoading, setDownLoading] = React.useState(false);
  const [SdownLoading, setSDownLoading] = React.useState(false);
  let showButton = false;

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

  const handleChangeT = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  // console.log(props);
  const Groups = props.Groups;

  return (
    <React.Fragment>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChangeT}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Approval done" {...a11yProps(0)} />
          <Tab label="Approved by Project Coordinator" {...a11yProps(1)} />
          <Tab label="Pending Approval" {...a11yProps(2)} />
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
              history.push({
                pathname: `/hod/prefs/${id}`,
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
              //console.log(Group.name);
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
                        {DueDate >= AppliedOn ? (
                          <Typography style={{ color: "green" }} variant="h5">
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
                          <Button disabled variant="outlined" color="secondary">
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
                      onClick={()=>{downloadSubmissionList()}}
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
                style={{ minWidth: "152.84px", maxHeight: "36px", marginRight:"20px"}}
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
              history.push({
                pathname: `/hod/prefs/${id}`,
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
              //console.log(Group.name);
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
                        {DueDate >= AppliedOn ? (
                          <Typography style={{ color: "green" }} variant="h5">
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
                              designation={props.Designation}
                            >
                              Show Preferences
                            </Button>
                          </div>
                        ) : (
                          <Button disabled variant="outlined" color="secondary">
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
              history.push({
                pathname: `/hod/prefs/${id}`,
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
                        {DueDate >= AppliedOn ? (
                          <Typography style={{ color: "green" }} variant="h5">
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
                            {console.log(props)}
                            <Button
                              onClick={routeChange}
                              variant="outlined"
                              color="primary"
                              designation={props.Designation}
                            >
                              Show Preferences
                            </Button>
                          </div>
                        ) : (
                          <Button disabled variant="outlined" color="secondary">
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
              history.push({
                pathname: `/hod/prefs/${id}`,
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
                              designation={props.Designation}
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
    </React.Fragment>
    // <Typography>HELLO</Typography>
  );
};

export default HodProjectList;
