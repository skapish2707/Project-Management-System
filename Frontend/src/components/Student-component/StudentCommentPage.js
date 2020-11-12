import React from 'react';
import { makeStyles, Typography, CircularProgress, Grid, Paper } from '@material-ui/core';


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
            return(
                <React.Fragment>
                    <Typography variant="h4">No comments have been added</Typography>
                </React.Fragment>
            )
        }else{
            return(
            comments.map(comment => {
                let dt = new Date(comment.time)
                return(
                    <React.Fragment key={comment._id}>
                        <Paper style={{backgroundColor:"#e0e0e0"}}>
                            <Grid style={{margin:"10px 35px"}} container spacing={2}>
                                <Grid className={classes.typo} item xs={12} sm={4}>
                                    <Typography><b>Author</b> : {comment.author}</Typography>
                                </Grid>
                                <Grid className={classes.typo} item xs={6} sm={4}>
                                    <Typography><b>Date</b> : {dt.getDate()}/{dt.getMonth()+1}/{dt.getFullYear()}</Typography>
                                </Grid>
                                <Grid className={classes.typo} item xs={6} sm={4}>
                                    <Typography><b>Time</b> : {dt.getHours()}:{dt.getMinutes()}</Typography>
                                </Grid>
                                
                                <Grid className={classes.typo} item xs={12}>
                                    <Typography><b>Comment</b> : {comment.text}</Typography>
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