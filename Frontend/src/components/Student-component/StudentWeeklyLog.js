import React from 'react';
import { makeStyles, Typography, CircularProgress, Grid, Paper } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    typo:{
        textAlign:"Left"
    }
}))

let Group = null;

const StudentWeeklyLog = (props) => {
    Group = props.Group
    const classes = useStyles();


    if(Group === null){
        return (
            <div style={{ margin: "auto" }}>
                <CircularProgress />
            </div>
        );
    }else{
        const {weeklyMeetLog} = Group;
        if(weeklyMeetLog.length === 0){
            return(
                <React.Fragment>
                    <Typography>You have not reported to your guide even once</Typography>
                </React.Fragment>
            )
        }else{
            return(
            weeklyMeetLog.map(wML => {
                let dt = new Date(wML.scheduled_date)
                return(
                    <React.Fragment key={wML._id}>
                        <Paper style={{backgroundColor:"#e0e0e0"}}>
                            <Grid style={{margin:"10px 35px"}} container spacing={2}>
                                <Grid className={classes.typo} item xs={6} sm={6}>
                                    <Typography><b>Date</b> : {dt.getDate()}/{dt.getMonth()+1}/{dt.getFullYear()}</Typography>
                                </Grid>
                                {(dt.getHours()>=12)?(
                                    <React.Fragment>
                                        {(dt.getHours()===12)?(
                                            <Grid className={classes.typo} item xs={12} sm={6}>
                                                <Typography><b>Time</b> : {dt.getHours()}:{dt.getMinutes()}&nbsp;pm</Typography>
                                            </Grid>
                                        ):(
                                            <Grid className={classes.typo} item xs={12} sm={6}>
                                                <Typography><b>Time</b> : {dt.getHours()}:{dt.getMinutes()}&nbsp;pm</Typography>
                                            </Grid>
                                        )}
                                    </React.Fragment>
                                ):(
                                    <Grid className={classes.typo} item xs={12} sm={6}>
                                        <Typography><b>Time</b> : {dt.getHours()}:{dt.getMinutes()}&nbsp;am</Typography>
                                    </Grid>
                                )}
                                <Grid className={classes.typo} item xs={12}>
                                    <Typography><b>Remark</b> : {wML.remark}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </React.Fragment>
                );
            }))
        }
    }
}
 
export default StudentWeeklyLog;