import React, { useState } from 'react';
import { makeStyles, Typography, CircularProgress, Grid, Paper } from '@material-ui/core';
import axios from 'axios';
import SERVER_URL from "../../Pages/URL"


const useStyles = makeStyles((theme) => ({
    typo:{
        textAlign:"Left"
    }
}))

let sData = null;
let fill = false;
let Group = null;

const StudentCommentPage = () => {

    const classes = useStyles();
    const [stuData,setStuData] = useState(null);
    const [filled,setFilled] = useState(false);
    const [loading,setLoading] = useState(false);

    function checkData() {
        setLoading(true);
        axios({
            method: "get",
            url: SERVER_URL + "/group",
            withCredentials: true,
            headers : {
                Authorization : 'Bearer '+localStorage.getItem("access_token"),
            }
        })
        .then(res => {
        Group = res.data;
        //console.log(Group.comments.length);
        setStuData("new");
        setFilled(true);
        setLoading(false);
        })
        .catch((err) => {
        console.log(err);
        });
    }

    if (loading) {
        console.log("LOADING")
        return (
            <div style={{ margin: "auto" }}>
                <CircularProgress />
            </div>
        );
    }
    if(stuData === null){
        checkData();
        console.log("sData : ",stuData);
        console.log("fill : ",filled);
    }
    // if(fill && Group.comments.length===0){
    //     return(
    //         <React.Fragment>
    //             <Typography variant="h4">No comments have been added</Typography>
    //         </React.Fragment>
    //     )
    // }
    // if(fill && Group.comments.length!==0){
    //     Group.comments.map(comment => {
    //         return(
    //             <React.Fragment>
    //                 <Typography variant="h4">{comment.text}</Typography>
    //             </React.Fragment>
    //         )
    //     })
    // }
    if(filled){
        const {comments} = Group;
        console.log(stuData,filled);
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
    return(
        <div style={{ margin: "auto" }}>
            <CircularProgress />
        </div>
    )
}
 
export default StudentCommentPage;