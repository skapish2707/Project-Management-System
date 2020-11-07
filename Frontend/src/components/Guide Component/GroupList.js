import React from 'react';
import axios from "axios";
import SERVER_URL from "../../Pages/URL";
import { Accordion, AccordionDetails, AccordionSummary, Button, CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core';
import { toFirstCharUppercase } from "../ToUpper";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useHistory } from 'react-router-dom';


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


                

const GuideGroupList = (props) => {
    const [adData,setAdData] = React.useState(null);
    const [filled,setFilled] = React.useState(false)
    const histor = useHistory();
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [loading,setLoading] = React.useState(false);


    function checkData() {
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
        //console.log(Groups);
        return(
            <React.Fragment >
                {Groups.map(Group => {
                    const routeChange = () => {
                        histor.push({
                        pathname: `/guide/prefs/${id}`,
                        });
                    };
                    //console.log(Group);
                    let DueDate = Group.dueDate.split("T")[0];
                    let members = Group.members;
                    let Gname = Group.name;
                    let id = Group.id;
                    let pref1 = [];
                    // let pref2 = [];
                    // let pref3 = [];
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
    }
    else{
        return(
            <CircularProgress />
        )
    }
}
 
 
export default GuideGroupList;