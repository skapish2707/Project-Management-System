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
import { Redirect } from "react-router-dom";
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
          <Typography>{children}</Typography>
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
  console.log(props.Groups);
  const Groups = props.Groups;

  return (
    <div className={classes.root}>
      {Groups.map(Group => {
        const routeChange = () => {
          let path = `/admin/prefs/${id}`;
          histor.push({
            pathname: `/admin/prefs/${id}`,
            state: { Group: Group }
          });
        };
        let members = Group.members;
        console.log(members);
        let Gname = Group.name;
        let id = Group.id;
        console.log(Gname, id);
        return (
          <Accordion
            expanded={expanded === Gname}
            onChange={handleChange(Gname)}
            className={classes.accor}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>{Group.name}</Typography>
              {members.map(member => {
                return (
                  <Typography className={classes.secondaryHeading}>
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
                      <Grid container>
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
              </Grid>
              {Group.proposals.length === 3 ? (
                <Button onClick={routeChange}>Show Preferences</Button>
              ) : (
                <Typography>Preferences not filled</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
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
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Item Three
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
}
