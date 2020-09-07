import React, { useState } from 'react';
import { makeStyles, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Typography, ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import axios from "axios";
import SERVER_URL from "../../Pages/URL";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme)=>({
    tableContainer:{
        marginTop:"10px",
        marginBottom:"10px",
        backgroundColor:"#666"
    },
    table:{
        minWidth: 650,
    }
}))

let Group = null;

const StudentHomePage = () => {

    const [stuData, setStuData] = useState(null);
    const [filled, setFilled ] = useState(false);
    const [loading,setLoading] = useState(false);
    const classes = useStyles();
    function checkData() {
        setLoading(true);
        axios({
            method: "get",
            url: SERVER_URL + "/group",
            withCredentials: true
        })
        .then(res => {
        Group = res.data;
        console.log(Group);
        setStuData("new");
        setFilled(true);
        setLoading(false);
        })
        .catch((err) => {
        console.log(err);
        });
    }

    let studata = stuData;
    if (loading) {
        return (
            <div style={{ margin: "auto" }}>
                <CircularProgress />
            </div>
        );
    }
    if(studata === null){
        checkData();
    }
    if(filled){
        let i=1;
        const {department,name,members,proposals} = Group;
        return (
            <React.Fragment>
                <ThemeProvider theme={theme}>
                <Typography variant="h4">Group Details</Typography>
                <TableContainer className={classes.tableContainer} component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Roll No.</TableCell>
                            <TableCell align="center">Email ID</TableCell>
                            <TableCell align="center">Group No.</TableCell>
                            <TableCell align="center">Department</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {members.map((member) => (
                            <TableRow key={member._id}>
                            <TableCell align="center">{member.name}</TableCell>
                            <TableCell align="center">{member.rollno}</TableCell>
                            <TableCell align="center">{member.email}</TableCell>
                            <TableCell align="center">{name}</TableCell>
                            <TableCell align="center">{department}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography style={{marginTop:"20px"}} variant="h4">Approval Status</Typography>
                <TableContainer className={classes.tableContainer} component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Proposal</TableCell>
                            <TableCell align="center">Proposal Title</TableCell>
                            <TableCell align="center">Admin</TableCell>
                            <TableCell align="center">Head of Department</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {proposals.map((proposal) => (
                            <TableRow key={proposal.title}>
                            <TableCell align="center">{i++}</TableCell>
                            <TableCell align="center">{proposal.title}</TableCell>
                            <TableCell align="center">{proposal.approval.admin ? "Approved" : "Not Approved"}</TableCell>
                            <TableCell align="center">{proposal.approval.hod ? "Approved" : "Not Approved"}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </ThemeProvider>
            </React.Fragment>
         );
    }
    
}
 
export default StudentHomePage;