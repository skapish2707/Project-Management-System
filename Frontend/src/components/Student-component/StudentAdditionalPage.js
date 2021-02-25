import { Button, CircularProgress, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles((themes) => ({
    TextField: {
        width: "100%"
    },
    typography:{
        fontSize:"16px",
        display:"flex",
        textAlign:"left"
    }
}))

let Group = null

const StudentAdditionalDoc = (props) => {
    Group = props.Group

    const [addiDoc,setAddiDoc] = useState("")
    const [addiFile,setAddiFile] = useState(null)
    const classes = useStyles();

    const handleAddiDocChange = (e) => {
        setAddiDoc(e.target.value);
    }

    const handleAddiFileChange = (e) => {
        // console.log(e.target.files[0])
        if(e.target.files[0]===undefined){
            alert("Please select a file.")
        }else{
            if(e.target.files[0].size > 10485760){
                alert("File size cannot exceed 10MB. Please select another file.");
                e.target.value=null;
                setAddiFile(null)
            }else{
                setAddiFile(e.target.files[0]);
            }
        }
    }

    const submitAddiDoc = (e) => {
        e.preventDefault();
        console.log(addiDoc);
        console.log(addiFile.size);
    }

    if(Group===null){
        return (
            <div style={{ margin: "auto" }}>
                <CircularProgress />
            </div>
        );
    }else{
        return(
            <React.Fragment>
                <Grid container>
                    <Grid style={{margin: "20px 0px"}} item xs={12}>
                        <Typography variant="h5">
                            Here you can add certificates related to your project,black book,etc.
                        </Typography>
                    </Grid>
                    <Grid style={{margin:"20px 0px"}} item className={classes.typography} xs={12} md={6}>
                        <Typography component="span">Type of document: </Typography>
                    </Grid>
                    <Grid style={{margin:"20px 0px"}} item className={classes.typography} xs={12} md={6}>
                        <TextField
                            className={classes.TextField}
                            variant="standard"
                            component={"span"}
                            id="addidocs"
                            name="addidocs"
                            type="text"
                            value={addiDoc}
                            onChange={(e)=>{handleAddiDocChange(e)}}
                            required
                        />
                    </Grid>
                    <Grid style={{margin:"20px 0px"}} item className={classes.typography} xs={12} md={6}>
                        <Typography component="span">Select document: </Typography>
                    </Grid>
                    <Grid style={{margin:"20px 0px"}} item className={classes.typography} xs={12} md={6}>
                        <TextField
                            className={classes.TextField}
                            variant="standard"
                            component={"span"}
                            id="addifile"
                            name="addifile"
                            type="file"
                            onChange={(e)=>{handleAddiFileChange(e)}}
                            required
                        />
                    </Grid>
                    <Grid item style={{margin:"10px 0px"}} xs={12}>
                        <Button variant="contained" color="secondary" onClick={(e)=>{submitAddiDoc(e)}}>Submit</Button>
                    </Grid>
                    {(true)?(
                        <React.Fragment>
                            <Grid item xs={12}>
                                <Typography style={{margin:"10px 0px"}} className={classes.typography}>
                                    You have not submitted any documents yet.
                                </Typography>
                            </Grid>
                        </React.Fragment>
                    ):(
                        <React.Fragment>
                            <Grid item xs={12}>
                                <Typography style={{margin:"10px 0px"}} className={classes.typography}>
                                    You have submitted the following documents till now.
                                </Typography>
                            </Grid>
                        </React.Fragment>
                    )}
                </Grid>
            </React.Fragment>
        )
    }
}

export default StudentAdditionalDoc;