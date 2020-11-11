import React from 'react'
import HodSideMenu from './HodSideMenu'
import axios from "axios";
import SERVER_URL from "../../Pages/URL";
import { Redirect } from "react-router-dom";
import { LinearProgress, makeStyles } from "@material-ui/core";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Button,CircularProgress,Grid} from "@material-ui/core";
import { toFirstCharUppercase } from "../ToUpper"
import { useHistory } from 'react-router-dom';

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

let Ad=null;
let groupData=null


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    
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

const HodgroupsPage = (props) => {

  const [user,setUser] = React.useState("")
  const [groupDetails,setGroupDetails] = React.useState(null)
  const [loading,setLoading] = React.useState(false)
  const [filled,setFilled] = React.useState(false)
  const histor = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [reqSent,setReqSent] = React.useState(false);
  
  function getStat(){
    axios({
      method: "get",
      url: SERVER_URL + "/user",
      withCredentials: true,
      headers : {
        Authorization : 'Bearer '+ localStorage.getItem("access_token") 
      }
    })
      .then(res => {
        setUser(res.data);
      })

      .catch(err => {
        setUser("No User");
        localStorage.removeItem("token");
      });
  };

  
  function checkData() {
    setReqSent(true);
    setLoading(true);
    axios({
      method: "get",
      url: SERVER_URL + "/guideGroup",
      withCredentials: true,
      headers : {
        Authorization : 'Bearer '+ localStorage.getItem("access_token") 
      }
    })
      .then(res => {
        setReqSent(false);
        Ad = res.data.length;
        groupData=res.data
        setGroupDetails(res.data);
        setFilled(true)
        setLoading(false);
      })
      .catch(function (err) {
        setReqSent(false);
        setLoading(false);
        console.log(err);
      });
  }

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // function handleChildClick(e){
  //   e.stopPropagation();
  //   console.log('handleChildClick');
  // }
    if (groupDetails === null && reqSent === false){
      checkData();
    } 
    if (user === "") {
      getStat();
      return <LinearProgress />;
    } else if (user.type === "hod") {
      if(loading){
        return(
            <CircularProgress />
        )
    }
    if(filled)
    {
        if(groupData.length!==0){
            return(
                <React.Fragment >
                    <HodSideMenu style={{marginBottom:"10px"}}/>
                    <Typography style={{margin:"20px"}} variant = "h3">
                      Assigned Groups
                    </Typography>
                    {groupData.map(Group => {
                        const routeChange = () => {
                            histor.push({
                            pathname: `/hod/groups/prefs/${id}`,
                            });
                        };
                        let DueDate = Group.dueDate.split("T")[0];
                        let members = Group.members;
                        let Gname = Group.name;
                        let id = Group.id;
                        let pref1 = [];
                        let AppliedOn = null;
    
                        if (Group.proposals.length !== 0) {
                            pref1 = Group.proposals[0];
                            // pref2 = Group.proposals[1];
                            // pref3 = Group.proposals[2];
    
                            AppliedOn = pref1.applied.split("T")[0];
                            //console.log(AppliedOn, DueDate);
                        }
                        // if (Group.guide.name===userInfo.name) {
                            return (
                            <Accordion
                                style={{
                                    width: "90%",
                                    margin: "auto",
                                    textAlign: "left",
                                    marginTop: "2px",
                                    boxShadow:
                                    "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)"
                                }}
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
                                    <Grid item container xs={12}>
                                    {Group.proposals.length === 3 ? (
                                        <React.Fragment>
                                            <Grid item xs={3}>
                                                <Button
                                                onClick={routeChange}
                                                variant="outlined"
                                                color="primary"
                                                >
                                                More Details
                                                </Button>
                                            </Grid>
                                        </React.Fragment>
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
                        // }
                        // return null;
                        })}
                </React.Fragment>
            )
        }else{
            return(
                <React.Fragment>
                  <HodSideMenu />
                  <Typography>
                    No group has been assigned to you yet.
                  </Typography>
                </React.Fragment>
            )
        }
    }
    else{
        return(
            <CircularProgress />
        )
    }
    } else {
      return <Redirect to="/" />;
    }
      }


export default HodgroupsPage;
