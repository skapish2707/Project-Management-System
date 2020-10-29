import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { CircularProgress, ClickAwayListener, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Menu, MenuItem, TextField } from "@material-ui/core";
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
  }
}));

let Guides = null;
let guideIndex=null;

export default function ControlledAccordions(props) {
  const histor = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [open,setOpen] = React.useState(false);
  const [guideName,setGuideName] = React.useState("");
  const [guideEmail,setGuideEmail] =React.useState("");
  const [loading,setLoading]=React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [assignLoading,setAssignLoading]=React.useState(false)


//Guide Menu
  const handleMenuClick = (event) => {
    //console.log(Guides)
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (event,index1) => {
    if(index1==="backdropClick"){
      console.log(index1)
      setAnchorEl(null);
    }else{
      guideIndex=index1;
      console.log(index1)
      setAnchorEl(null);
    }
  };

  //Add Guide Button & different options in Dialog Box
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseCancel = () => {
    console.log("CANCEL")
    setOpen(false);
  };
  const handleCloseSubmit = () => {
    setLoading(true)
    if(guideName==="" || guideEmail===""){
      alert("Guide name or email cannot be empty")
    }else{
      axios({
        method: "post",
        url: SERVER_URL + "/addGuide?type=new",
        credentials: "include",
        withCredentials: true,
        data: qs.stringify({
          name:guideName,
          email:guideEmail
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization : 'Bearer '+ localStorage.getItem("access_token")
        }
      })
      .then(res => {
        console.log("submitted")
        setLoading(false)
        setGuideName("")
        setGuideEmail("")
        setOpen(false);
        window.location.reload(false);
      })

      .catch(err => {
        alert("Guide not added")
        setLoading(false)
        console.log(err);
        setOpen(false);
      });
    }
  };

// Assign Guide button

  const assignGuide = (e,id) => {  
    if(guideIndex===null){
      alert("Please select a guide first")
    }else{
      setAssignLoading(true)
      axios({
        method: "post",
        url: SERVER_URL + "/addGuide",
        credentials: "include",
        withCredentials: true,
        data: qs.stringify({
          name:Guides[guideIndex].name,
          email:Guides[guideIndex].email,
          groupId:id
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          "Authorization" : 'Bearer '+ localStorage.getItem("access_token")
        }
      })
      .then(res => {
        console.log("submitted")
        setAssignLoading(false)
        window.location.reload(false);
      })

      .catch(err => {
        alert("Guide not assigned")
        setAssignLoading(false)
        console.log(err);
      });
    }
  }


// Dialog box Guide name and email

  const handleGNameChange = (e) => {
    setGuideName(e.target.value)
  }

  const handleGEmailChange = (e) => {
    setGuideEmail(e.target.value)
  }

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
  const Groups = props.Groups;
  const Guides = props.Guides;
  let e={}

  return (
    <div>
      { !loading ? (
        <div>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>Add Guide</Button>
          <Dialog open={open} onClose={handleCloseCancel} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Guide</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please add name and email of Guide.
              </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="guideName"
                  label="Guide Name"
                  type="text"
                  value={guideName}
                  onChange={handleGNameChange}
                  fullWidth
                  required
                />
                <TextField
                  margin="dense"
                  id="guideEmail"
                  label="Guide Email"
                  type="text"
                  value={guideEmail}
                  onChange={handleGEmailChange}
                  fullWidth
                  required
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseCancel} color="primary">
                Cancel
              </Button>
              <Button onClick={handleCloseSubmit} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <div><CircularProgress /></div>
      )}
      <div className={classes.root}>
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
                //console.log(AppliedOn, DueDate);
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
                                return <Typography key={member.email}>{member.name}</Typography>;
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
                                return <Typography key={member.email}>{member.email}</Typography>;
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
                                return <Typography key={member.email}>{member.rollno}</Typography>;
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
                                {(Group.guide.name===null)?(
                                  <div>
                                    <Button style={{marginLeft : "20px"}} aria-controls="simple-menu" variant="outlined" color="primary" aria-haspopup="true" onClick={handleMenuClick}>
                                  Assign Guide
                                </Button>          
                                <Menu
                                  id="simple-menu"
                                  anchorEl={anchorEl}
                                  keepMounted
                                  open={Boolean(anchorEl)}
                                  onClose={handleMenuClose}
                                  style={{minWidth:"500px"}}
                                >
                                  { anchorEl ? (
                                    <div>
                                        {Guides.map((Guide,index) => {
                                          return(
                                            <div key={Guide.email}>
                                              {/* <ClickAwayListener onClickAway={()=>{setClicked(true)}}> */}
                                                <MenuItem onClick={(e) => {handleMenuClose(e,index)}}>{Guide.name}</MenuItem>
                                              {/* </ClickAwayListener> */}
                                            </div>
                                          )
                                        })}
                                    </div>
                                  ) : (
                                    null
                                  )}
                                </Menu>
                                { (guideIndex!==null) ? (
                                    <Button style={{marginLeft:"20px"}} variant="outlined" color="secondary">{Guides[guideIndex].name}</Button>
                                ) : (
                                  <Button style={{marginLeft:"20px"}} variant="outlined" color="secondary">Guide not selected</Button>
                                )}
                                { !assignLoading ? (
                                    <Button style={{marginLeft:"20px"}} variant="contained" color="secondary" onClick={(e)=>assignGuide(e,id)}>Assign Guide</Button>
                                ) : (
                                    <CircularProgress />
                                )}
                              </div>
                              ):(
                                <div>
                                  <Button style={{marginLeft:"20px"}} variant="outlined" color="secondary">{Group.guide.name}</Button>
                                </div>
                              )}
                              
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
                //console.log(DueDate, AppliedOn);
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
                                return <Typography key={member.email}>{member.name}</Typography>;
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
                                return <Typography key={member.email}>{member.email}</Typography>;
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
                                return <Typography key={member.email}>{member.rollno}</Typography>;
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
                            <b>Due Date for Submitting Proposals:</b>&nbsp;&nbsp;
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
}
