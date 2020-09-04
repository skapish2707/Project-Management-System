import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
/* eslint no-restricted-globals:0 */

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

export default function ControlledAccordions(props) {
  const histor = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChangeT = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const Groups = props.Groups;

  return (
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
          <Tab label="Approved" {...a11yProps(0)} />
          <Tab label="Applied" {...a11yProps(1)} />
          <Tab label="Not Applied" {...a11yProps(2)} />
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
            console.log(Group);
            let members = Group.members;
            let Gname = Group.name;
            let id = Group.id;
            let pref1 = [];
            let pref2 = [];
            let pref3 = [];

            let pref1Approval = false;
            let pref2Approval = false;
            let pref3Approval = false;

            if (Group.proposals.length !== 0) {
              pref1 = Group.proposals[0];
              pref2 = Group.proposals[1];
              pref3 = Group.proposals[2];

              pref1Approval = pref1.approval.admin;
              pref2Approval = pref2.approval.admin;
              pref3Approval = pref3.approval.admin;
            }

            if (
              pref1Approval ||
              pref2Approval ||
              (pref3Approval && Group.proposals.length !== 0)
            ) {
              console.log(Group.name);
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
                      {Group.name}
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
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12} sm={4}>
                            <Typography style={{ fontWeight: "600" }}>
                              Name
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography style={{ fontWeight: "600" }}>
                              Email
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography style={{ fontWeight: "600" }}>
                              Rollno
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        {members.map(member => {
                          return (
                            <Grid container key={member.rollno}>
                              <Grid item xs={12} sm={4}>
                                <Typography>{member.name}</Typography>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Typography>{member.email}</Typography>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Typography>{member.rollno}</Typography>
                              </Grid>
                            </Grid>
                          );
                        })}
                      </Grid>
                      <Grid item xs={12}>
                        {Group.proposals.length === 3 ? (
                          <div>
                            <Button onClick={routeChange}>
                              Show Preferences
                            </Button>
                          </div>
                        ) : (
                          <Typography>Preferences not filled</Typography>
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
            let members = Group.members;
            let Gname = Group.name;
            let id = Group.id;
            let pref1 = [];
            let pref2 = [];
            let pref3 = [];

            let pref1Approval = false;
            let pref2Approval = false;
            let pref3Approval = false;

            if (Group.proposals.length !== 0) {
              pref1 = Group.proposals[0];
              pref2 = Group.proposals[1];
              pref3 = Group.proposals[2];

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
                      {Group.name}
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
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12} sm={4}>
                            <Typography style={{ fontWeight: "600" }}>
                              Name
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography style={{ fontWeight: "600" }}>
                              Email
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography style={{ fontWeight: "600" }}>
                              Rollno
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        {members.map(member => {
                          return (
                            <Grid container key={member.rollno}>
                              <Grid item xs={12} sm={4}>
                                <Typography>{member.name}</Typography>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Typography>{member.email}</Typography>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Typography>{member.rollno}</Typography>
                              </Grid>
                            </Grid>
                          );
                        })}
                      </Grid>
                      <Grid item xs={12}>
                        {Group.proposals.length === 3 ? (
                          <div>
                            <Button onClick={routeChange}>
                              Show Preferences
                            </Button>
                          </div>
                        ) : (
                          <Typography>Preferences not filled</Typography>
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
                      {Group.name}
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
                      <Grid item xs={12}>
                        <Grid container style={{ width: "100%" }}>
                          <Grid item xs={12} sm={4}>
                            <div>
                              <Typography style={{ fontWeight: "600" }}>
                                Name
                              </Typography>
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography style={{ fontWeight: "600" }}>
                              Email
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Typography style={{ fontWeight: "600" }}>
                              Rollno
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        {members.map(member => {
                          return (
                            <Grid container key={member.rollno}>
                              <Grid item xs={12} sm={4}>
                                <Typography>{member.name}</Typography>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Typography>{member.email}</Typography>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Typography>{member.rollno}</Typography>
                              </Grid>
                            </Grid>
                          );
                        })}
                      </Grid>
                      <Grid item xs={12}>
                        {Group.proposals.length === 3 ? (
                          <div>
                            <Button onClick={routeChange}>
                              Show Preferences
                            </Button>
                          </div>
                        ) : (
                          <Typography>Preferences not filled</Typography>
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
  );
}
