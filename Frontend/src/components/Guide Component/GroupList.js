import React,{Component} from 'react';
import axios from "axios";
import SERVER_URL from "../../Pages/URL";
import { Accordion, AccordionDetails, AccordionSummary, Button, CircularProgress, Grid, makeStyles, TextField, Typography, useTheme } from '@material-ui/core';
import { toFirstCharUppercase } from "../ToUpper";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useHistory } from 'react-router-dom';

let Ad=null;
let Groups=null;

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

  let currentDate=new Date();
//   let date = "Last Sync: " + currentDate.getDate() + "-" + (currentDate.getMonth()+1)  + "-" + currentDate.getFullYear();
  let curTime = currentDate.getHours() + ":"  + currentDate.getMinutes(); 

                

const GuideGroupList = (props) => {
    const [adData,setAdData] = React.useState(null);
    const [filled,setFilled] = React.useState(false)
    const histor = useHistory();
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [loading,setLoading] = React.useState(false);
    const [scheduleLoading,setScheduleLoading] = React.useState(false);
    const [dateTime,setDateTime] = React.useState("");
    const theme = useTheme();

    function checkData() {
        setLoading(true);
        axios({
        method: "get",
        url: SERVER_URL + "/getStudents?by=group",
        withCredentials: true,
        headers : {
            Authorization : 'Bearer '+ localStorage.getItem("access_token") 
        }
        })
        .then(res => {
            Ad = res.data.length;
            Groups = res.data;
            setAdData("new");
            setFilled(true);
            setLoading(false);
        })
    
        .catch(function (err) {
            console.log(err);
            setLoading(false);
        });
    }
    
     const sche_pres = () => {
        let  dt = new Date(dateTime);
        console.log(dateTime)
        console.log(dt.toString());  
        //setScheduleLoading(true);
        // axios({
        // method: "post",
        // url: SERVER_URL + "/presentation",
        // withCredentials: true,
        // data: qs.stringify({
            
        //   }),
        // headers : {
        //     Authorization : 'Bearer '+ localStorage.getItem("access_token") 
        // }
        // })
        // .then(res => {

        //     setScheduleLoading(false);
        // })
    
        // .catch(function (err) {
        //     console.log(err);
        //     setScheduleLoading(false);
        // });
    }

    const handleDateTimeChange = (e) =>{
        setDateTime(e.target.value);
        console.log(dateTime)
    }

    //accordion handleChange
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    if(loading){
        return(
            <CircularProgress />
        )
    }
    if(adData===null){
        checkData();
        return null
    }
    if(filled)
    {
        console.log(Groups);
        return(
            <React.Fragment >
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

                    if (Group.proposals.length !== 0) {
                        pref1 = Group.proposals[0];
                        pref2 = Group.proposals[1];
                        pref3 = Group.proposals[2];

                        AppliedOn = pref1.applied.split("T")[0];
                        //console.log(AppliedOn, DueDate);
                    }
                    let userInfo=props.userInfo;
                    if (Group.guide.name===userInfo.name) {
                        return (
                        <Accordion
                            style={{
                                width: "90%",
                                margin: "auto",
                                textAlign: "left",
                                marginTop: "50px",
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
                                        <Grid container item xs={9}>
                                            <Grid item xs={3}>
                                                <Typography>Schedule Presentation: </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                            <TextField
                                                id="datetime-local"
                                                label="Next appointment"
                                                type="datetime-local"
                                                defaultValue="2017-05-24T10:30"
                                                className={classes.textField}
                                                InputLabelProps={{
                                                shrink: true,
                                                }}
                                                onChange={handleDateTimeChange}
                                            />
                                            </Grid>
                                            <Grid item xs={3}>
                                                {
                                                    (!scheduleLoading)?(
                                                        <Button onClick={sche_pres} variant="contained" color="secondary">Schedule</Button>
                                                    ):(
                                                        <CircularProgress />
                                                    )
                                                }
                                            </Grid>
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
                    }
                    return null;
                    })}
            </React.Fragment>
        )
    }
    else{
        return(
            <CircularProgress />
        )
    }
}
 
 
export default GuideGroupList;