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