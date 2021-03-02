import { Button, CircularProgress, createMuiTheme, Grid, makeStyles, responsiveFontSizes, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import SERVER_URL from '../../Pages/URL';
import axios from "axios";
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import qs from "qs";

// let theme = createMuiTheme();
// theme = responsiveFontSizes(theme);

const useStyles = makeStyles((themes) => ({
    TextField: {
        width: "100%"
    },
    typography:{
        fontSize:"16px",
        display:"flex",
        textAlign:"left"
    },
    tableContainer: {
        marginTop: "10px",
        marginBottom: "50px"
    },
    table: {
        minWidth: 650
    }
}))

let Group = null
let Ad = null

const StudentAdditionalDoc = (props) => {
    Group = props.Group
    Ad=Group.addtionalDocuments
    console.log(Ad)

    const [addiDoc,setAddiDoc] = useState("")
    const [addiDesc,setAddiDesc] = useState("")
    const [addiFile,setAddiFile] = useState(null)
    const [loading,setLoading] = useState(false)
    const [delLoading,setDelLoading] = useState(false)
    const classes = useStyles();

    const handleAddiDocChange = (e) => {
        setAddiDoc(e.target.value);
    }

    const handleAddiDescChange = (e) => {
        setAddiDesc(e.target.value);
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
                if(e.target.files[0].type!=="application/pdf"){
                    alert("Please upload pdf file of size less than 10MB");
                    e.target.value=null;
                    setAddiFile(null)
                }else{
                    setAddiFile(e.target.files[0]);
                }
            }
        }
    }

    const submitAddiDoc = (e) => {
        e.preventDefault();
        if(addiDoc===""||addiDesc===""||addiFile===null){
            alert("Enter Details")
        }else{
            var formData = new FormData();
            formData.append("docName",addiDoc)
            formData.append("desc",addiDesc)
            formData.append("doc", addiFile)
            formData.append("gid",Group.id)
            setLoading(true)
            axios({
                method: "post",
                url: SERVER_URL + "/student/additionalDocument",
                credentials: "include",
                withCredentials: true,
                data: formData,
                headers: {
                "Content-Type": "multipart/form-data",
                Authorization : 'Bearer '+ localStorage.getItem("access_token")
                }
            })
                .then(res => {
                    setLoading(false)
                    window.location.reload(false);
                })
                .catch(err => {
                    setLoading(false)
                    if (err) throw err;
            });
        }
    };

    const deleteAddiDoc = (e,gid,aid) => {
        e.preventDefault();
        setDelLoading(true);
        axios({
            method: "post",
            url: SERVER_URL + "/student/additionalDocument/delete",
            credentials: "include",
            withCredentials: true,
            data: qs.stringify({
                gid:gid,
                id:aid
              }),
              headers: {
                "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                Authorization : 'Bearer '+ localStorage.getItem("access_token") 
              }
        })
            .then(res => {
                setDelLoading(false)
                window.location.reload(false);
            })
            .catch(err => {
                setDelLoading(false)
                if (err) throw err;
        });
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
                        <Typography component="span">Title: </Typography>
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
                        <Typography component="span">Description: </Typography>
                    </Grid>
                    <Grid style={{margin:"20px 0px"}} item className={classes.typography} xs={12} md={6}>
                        <TextField
                            className={classes.TextField}
                            variant="outlined"
                            component={"span"}
                            multiline
                            inputProps={{style: {fontSize: 14}}}
                            rows={3}
                            id="addidesc"
                            name="addidesc"
                            type="text"
                            value={addiDesc}
                            onChange={(e)=>{handleAddiDescChange(e)}}
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
                    {(!loading)?(
                        <React.Fragment>
                            <Grid item style={{margin:"10px 0px"}} xs={12}>
                                <Button variant="contained" color="secondary" onClick={(e)=>{submitAddiDoc(e)}}>Submit</Button>
                            </Grid>
                        </React.Fragment>
                    ):(
                        <React.Fragment>
                            <Grid item style={{margin:"10px 0px"}} xs={12}>
                                <Button variant="contained" color="secondary"><CircularProgress/></Button>
                            </Grid>
                        </React.Fragment>
                    )}
                    <div
                      style={{
                            backgroundColor: "#d3d3d3",
                            margin: "30px 0px 30px 0px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
                            width:"100%"
                      }}
                    >
                        <React.Fragment>
                            <div
                            style={{ backgroundColor: "#d3d3d3", textAlign: "left" }}
                            >
                                <Typography
                                    variant="h3"
                                    style={{
                                    fontWeight: "300",
                                    paddingLeft: "30px",
                                    paddingBottom: "20px"
                                    }}
                                >
                                    Additional Uploaded Documents
                                </Typography>
                            </div>
                            {Ad.length === 0 ? (
                            <Typography variant="h2">
                                No Additional Document Uploaded
                            </Typography>
                            ) : (
                            <React.Fragment>
                                <Grid
                                container
                                style={{
                                    backgroundColor: "#d3d3d3",
                                    padding: "10px",
                                    marginBottom: "2px",
                                    textAlign: "left"
                                }}
                                >
                                <Grid item xs={3} style={{ paddingLeft: "20px" }}>
                                    <Typography>
                                        <b>Title</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography style={{paddingLeft:"20px"}}>
                                        <b>Description</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography>
                                        <b>File Link</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={1} />
                                </Grid>
                                {Ad.map(ad => {
                                return (
                                    <Grid
                                    container
                                    key={ad._id}
                                    style={{
                                        backgroundColor: "#fff",
                                        padding: "8px",
                                        marginBottom: "2px",
                                        textAlign: "left"
                                    }}
                                    >
                                    <Grid
                                        item
                                        xs={3}
                                        style={{ paddingLeft: "20px" }}
                                    >
                                        <Typography>{ad.docName}</Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Typography>{ad.desc}</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography>
                                            <a style={{textDecoration:"none"}} href={ad.doclink} target="_blank">
                                                View File
                                            </a>
                                        </Typography>
                                    </Grid>
                                    {!delLoading?(
                                        <Grid item xs={1}>
                                            <Typography style={{textAlign:"center"}}>
                                                <Button onClick={(e)=>{deleteAddiDoc(e,Group.id,ad._id)}}>
                                                    <DeleteTwoToneIcon />
                                                </Button>
                                            </Typography>
                                        </Grid>
                                    ):(
                                        <Grid item xs={1}>
                                            <Typography style={{textAlign:"center"}}>
                                                <Button onClick={(e)=>{deleteAddiDoc(e,Group.id,ad._id)}}>
                                                    <DeleteTwoToneIcon />
                                                </Button>
                                            </Typography>
                                        </Grid>
                                    )}
                                    </Grid>
                                );
                                })}
                            </React.Fragment>
                            )}
                        </React.Fragment>
                    </div>
                </Grid>
            </React.Fragment>
        )
    }
}

export default StudentAdditionalDoc;