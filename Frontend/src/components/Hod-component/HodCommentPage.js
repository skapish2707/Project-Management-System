import React, { useState } from 'react';
import { makeStyles, Typography, CircularProgress, Grid, Paper } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    typo1:{
        textAlign:"Left"
    },
    typo2:{
        textAllign:"Right"
    }
}))



const HodCommentPage = (props) => {
    const classes = useStyles();
    const comments=props.Comments;
    if(comments.length === 0){
        console.log(comments.length);
        return(
            <React.Fragment>
                <Typography variant="h4">No comments have been added</Typography>
            </React.Fragment>
        )
    }else{
        return(
        comments.map(comment => {
            if(comment.author="trial@hod.com")
            {return(
                <React.Fragment key={comment._id}>
                    <Paper style={{marginBottom:"20px"}}>
                        <Grid style={{marginTop:"10px",marginBottom:"10px"}} container spacing={2}>
                            <Grid className={classes.typo1} item xs={6}>
                                <Typography>Comment : {comment.text}</Typography>
                            </Grid>
                            <Grid className={classes.typo2} item xs={6}>
                                <Typography>Time : {comment.time}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </React.Fragment>
            );}else{return null}
        }))
    }
}
 
export default HodCommentPage;