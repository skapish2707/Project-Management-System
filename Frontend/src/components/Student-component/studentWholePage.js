import React from "react";
import PropTypes from "prop-types";
import { Grid, Container } from "@material-ui/core";
import {
  makeStyles,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider
} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import StudentContent from "./StudentContent";
import Profile from "../Profile";
import StudentHomePage from "./studentHomePage";
import StudentCommentPage from "./StudentCommentPage";
import axios from "axios";
import SERVER_URL from "../../Pages/URL";

let userInfo = [];
let DueDate = null;
let AppliedOn = null;

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box>
            <Typography component={"span"}>{children}</Typography>
          </Box>
        </Container>
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    maxWidth: "100%",
    marginTop: "3px",
    minHeight: "40vh"
  },
  // tabs: {
  //   borderRight: `1px solid ${theme.palette.divider}`,
  // },
  TabPanel: {
    //borderLeft:`1px solid ${theme.palette.divider}`,
    display: "block"
    //margin:"1px",
  },
  vert_tab_grid: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  hor_tab_grid: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  large_win_tabs: {
    width: "90%",
    margin: "auto",
    [theme.breakpoints.down("760")]: {
      display: "none"
    }
  },
  small_win_tabs: {
    width: "90%",
    margin: "auto",
    [theme.breakpoints.up("760")]: {
      display: "none"
    }
  }
}));

let Group=null;

const StudentWholePage = props => {
  userInfo = props.userInfo;
  //console.log(userInfo.name);

  const [academicYear,setAcademicYear] = React.useState("");

  function checkData() {
    axios({
      method: "get",
      url: SERVER_URL + "/group",
      withCredentials: true,
      headers:{
        Authorization : 'Bearer '+ localStorage.getItem("access_token")
      }
    })
      .then(res => {
        Group = res.data;
        DueDate = Group.dueDate.split("T")[0];
        AppliedOn = Group.proposals[0].applied.split("T")[0];
        setAcademicYear(Group.acadYear);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      {checkData()}
      <Profile academicYear={academicYear} userInfo={userInfo} />
      <div
        style={{
          boxShadow: "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)"
        }}
        className={classes.small_win_tabs}
      >
        <Grid container className={classes.root}>
          <ThemeProvider theme={theme}>
            <Grid item xs={12} className={classes.hor_tab_grid}>
              <Tabs
                orientation="horizontal"
                value={value}
                onChange={handleChange}
                aria-label="horizontal tabs"
                variant="fullWidth"
                //scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab className={classes.tab} label="Home" {...a11yProps(0)} />
                <Tab
                  className={classes.tab}
                  label="Preferences"
                  {...a11yProps(1)}
                />
                <Tab
                  className={classes.tab}
                  label="Comments"
                  {...a11yProps(2)}
                />
              </Tabs>
            </Grid>
            {/* <Grid item xs={2} /> */}
          </ThemeProvider>
          <Grid className={classes.TabPanel} item xs={12}>
            <TabPanel value={value} index={0}>
              <StudentHomePage Group={Group} DueDate={DueDate} AppliedOn={AppliedOn}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <StudentContent />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <StudentCommentPage />
            </TabPanel>
          </Grid>
          {/* <Grid item xs={1}></Grid> */}
        </Grid>
      </div>
      <div
        style={{
          boxShadow: "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)"
        }}
        className={classes.large_win_tabs}
      >
        <Grid style={{ marginTop: "3px" }} container className={classes.root}>
          <ThemeProvider theme={theme}>
            <Grid item xs={3} className={classes.vert_tab_grid}>
              <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab className={classes.tab} label="Home" {...a11yProps(0)} />
                <Tab
                  className={classes.tab}
                  label="Preferences"
                  {...a11yProps(1)}
                />
                <Tab
                  className={classes.tab}
                  label="Comments"
                  {...a11yProps(2)}
                />
              </Tabs>
            </Grid>
          </ThemeProvider>
          <Grid className={classes.TabPanel} item xs={9}>
            <TabPanel value={value} index={0}>
              <StudentHomePage Group={Group} DueDate={DueDate} AppliedOn={AppliedOn}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <StudentContent />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <StudentCommentPage />
            </TabPanel>
          </Grid>
          {/* <Grid item xs={1}></Grid> */}
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default StudentWholePage;
