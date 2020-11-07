import React, { useState } from 'react';
import { makeStyles, Typography, CircularProgress, Grid, Paper } from '@material-ui/core';
import axios from 'axios';
import SERVER_URL from "../../Pages/URL"


const useStyles = makeStyles((theme) => ({
    typo:{
        textAlign:"Left"
    }
}))

let Group = null;

const StudentCommentPage = (props) => {
    Group = props.Group
    const classes = useStyles();


    if(Group === null){
        return (
            <div style={{ margin: "auto" }}>
                <CircularProgress />
            </div>
        );
    }else{
        const {comments} = Group;
        if(comments.length === 0){
            console.log(comments.length);
            return(
                <React.Fragment>
                    <Typography variant="h4">No comments have been added</Typography>
                </React.Fragment>
            )
        }else{
            console.log(comments);
            return(
            comments.map(comment => {
                console.log(comment);
                return(
                    <React.Fragment key={comment._id}>
                        <Paper>
                            <Grid style={{marginTop:"10px",marginBottom:"10px"}} container spacing={2}>
                                <Grid className={classes.typo} item xs={6}>
                                    <Typography>Author : {comment.author}</Typography>
                                </Grid>
                                <Grid className={classes.typo} item xs={6}>
                                    <Typography>Time : {comment.time}</Typography>
                                </Grid>
                                <Grid className={classes.typo} item xs={12}>
                                    <Typography>Comment : {comment.text}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </React.Fragment>
                );
            }))
        }
    }
}
 
export default StudentCommentPage;