import React, { useState } from "react";
import {
  makeStyles,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
  Typography,
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes
} from "@material-ui/core";
import axios from "axios";
import SERVER_URL from "../../Pages/URL";

let DueDate = null;
let AppliedOn = null;
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles(theme => ({
  tableContainer: {
    marginTop: "10px",
    marginBottom: "50px"
  },
  table: {
    minWidth: 650
  }
}));

let propF = false;
let sData = null;
let fill = false;
let Group = null;

const StudentHomePage = () => {

    const [propFilled,setPropFilled] = useState(false)
    const [stuData, setStuData] = useState(null);
    const [filled, setFilled ] = useState(false);
    const [loading,setLoading] = useState(false);
    const classes = useStyles();
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
        DueDate = Group.dueDate.split("T")[0];
        AppliedOn = Group.proposals[0].applied.split("T")[0];
        if (Group.proposals.length > 0) {
          setPropFilled(true);
          propF = propFilled;
        }
        setStuData("new");
        setFilled(true);
        setLoading(false);
        sData = stuData;
        fill = filled;
      })
      .catch(err => {
        console.log(err);
      });
  }

  function propApproved(proposals) {
    let approved = false;
    let propTitle = "";

    proposals.map(proposal => {
      if (proposal.approval.admin && proposal.approval.hod) {
        approved = true;
        propTitle = proposal.title;
      }
    });

    if (approved) {
      if (DueDate >= AppliedOn) {
        return (
          <React.Fragment>
            <Typography color="primary" variant="h4">
              Proposal Submitted On time
            </Typography>
            <Typography style={{ marginBottom: "40px" }} variant="h4">
              Your Proposal <b>{propTitle}</b> has been approved. Please start
              working on it.
            </Typography>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <Typography color="secondary" variant="h4">
              Proposal Submitted Late
            </Typography>
            <Typography style={{ marginBottom: "40px" }} variant="h4">
              Your Proposal <b>{propTitle}</b> has been approved. Please start
              working on it.
            </Typography>
          </React.Fragment>
        );
      }
    } else {
      if (DueDate >= AppliedOn) {
        return (
          <React.Fragment>
            <Typography color="primary" variant="h4">
              Proposal Submitted On time
            </Typography>
            <Typography style={{ marginBottom: "40px" }} variant="h5">
              Your Proposals are yet to be approved. Please check again later.
            </Typography>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <Typography color="secondary" variant="h4">
              Proposal Submitted Late
            </Typography>
            <Typography style={{ marginBottom: "40px" }} variant="h5">
              Your Proposals are yet to be approved. Please check again later.
            </Typography>
          </React.Fragment>
        );
      }
    }
  }
  // console.log(propF)
  if (loading) {
    return (
      <div style={{ margin: "auto" }}>
        <CircularProgress />
      </div>
    );
  }
  if (sData === null) {
    checkData();
  }
  if (fill && propF) {
    let i = 1;
    const { department, name, members, proposals } = Group;
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <Typography variant="h4">Group Details</Typography>
          <TableContainer
            style={{ backgroundColor: "#d3d3d3" }}
            className={classes.tableContainer}
            component={Paper}
          >
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
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
                {members.map(member => (
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
          <Typography style={{ marginTop: "20px" }} variant="h4">
            Approval Status
          </Typography>
          <TableContainer
            style={{ backgroundColor: "#d3d3d3" }}
            className={classes.tableContainer}
            component={Paper}
          >
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">Proposal</TableCell>
                  <TableCell align="center">Proposal Title</TableCell>
                  <TableCell align="center">Admin</TableCell>
                  <TableCell align="center">Head of Department</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {proposals.map(proposal => (
                  <TableRow key={proposal.title}>
                    <TableCell align="center">{i++}</TableCell>
                    <TableCell align="center">{proposal.title}</TableCell>
                    <TableCell align="center">
                      {proposal.approval.admin ? "Approved" : "Not Approved"}
                    </TableCell>
                    <TableCell align="center">
                      {proposal.approval.hod ? "Approved" : "Not Approved"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {propApproved(proposals)}
        </ThemeProvider>
      </React.Fragment>
    );
  }
  if (fill && !propF) {
    const { department, name, members, proposals } = Group;
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <Typography variant="h4">Group Details</Typography>
          <TableContainer
            style={{ backgroundColor: "#d3d3d3" }}
            className={classes.tableContainer}
            component={Paper}
          >
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
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
                {members.map(member => (
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
          {proposals.length === 0 ? (
            <Typography style={{ marginBottom: "40px" }} variant="h5">
              <b>Due Date for Submitting Proposals:</b>&nbsp;&nbsp;{DueDate}
            </Typography>
          ) : null}

          <Typography style={{ marginBottom: "40px" }} variant="h3">
            Preferences not filled
          </Typography>
        </ThemeProvider>
      </React.Fragment>
    );
  }
  return <CircularProgress />;
};

export default StudentHomePage;
