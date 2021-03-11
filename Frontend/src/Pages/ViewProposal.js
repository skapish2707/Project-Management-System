import React, { useEffect, useState } from "react";
import axios from "axios";
import SERVER_URL from "../../src/Pages/URL";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "../components/ToUpper";
import LinearProgress from "@material-ui/core/LinearProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Footer from "../components/Footer/Footer"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: "33.33%",
    flexShrink: 0,
    textAlign: "left",
    [theme.breakpoints.down("600")]: {
      display: "none"
    }
  },
  grid: {
    margin: "20px",
    textAlign: "center"
  },
  comment: {
    marginTop: "50px"
  },
  comTitle: {
    textAlign: "right",
    margin: "auto 0",
    [theme.breakpoints.down("sm")]: {
      textAlign: "left"
    }
  },
  comField: {
    width: "90%",
    backgroundColor: "#fff",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  comButton: {
    textAlign: "left",
    margin: "auto 0",
    [theme.breakpoints.down("sm")]: {
      textAlign: "right"
    }
  },
  table: {
    minWidth: 650
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
    margin: theme.spacing(2)
  },
}));

const ViewProposal = props => {
  const classes = useStyles();
  const [loadedData, setLoadedData] = useState("");
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const Gid = props.match.params.id;
  useEffect(() => {
    axios({
      method: "get",
      url: SERVER_URL + `/view/group/${Gid}`
    })
      .then(res => {
        setLoadedData(res.data);
      })

      .catch(err => {
        alert("Something went wrong");
      });
  }, []);
  console.log(loadedData);
  if (loadedData) {
    const memberData = loadedData.members;
    const proposalData = loadedData.proposals;
    return (
      <React.Fragment>
      <div key={loadedData.name} style={{ paddingBottom: "200px" }}>
        <AppBar position="static" style={{ backgroundColor: "#b01a1a" }}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Project Management System
          </Typography>
        </Toolbar>
      </AppBar>
        <div
          style={{
            width: "90%",
            margin: "20px auto",
            backgroundColor: "#e0e0e0",
            boxShadow:
              "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)"
          }}
        >
          <Typography variant="h2" style={{ padding: "30px" }}>
            <b>{toFirstCharUppercase(loadedData.name)}</b>
          </Typography>
        </div>
        <div
          style={{ width: "90%", margin: "20px auto", backgroundColor: "#fff" }}
        >
          <Typography
            variant="h4"
            style={{
              textAlign: "left",
              padding:"8px 00",
              paddingLeft: "30px",
              boxShadow:
                "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)"
            }}
          >
            <b>Details</b>
          </Typography>
        </div>
        <div
          style={{
            width: "90%",
            margin: "auto",
            boxShadow:
              "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)"
          }}
        >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography className={classes.heading}>
                      <b>Name</b>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className={classes.heading}>
                      <b>Email</b>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className={classes.heading}>
                      <b>Rollno</b>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {memberData.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.rollno}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div
          style={{ width: "90%", margin: "20px auto", backgroundColor: "#fff" }}
        >
          <Typography
            variant="h4"
            style={{
              textAlign: "left",
              padding:"8px 00",
              paddingLeft: "30px",
              boxShadow:
                "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)"
            }}
          >
            <b>Proposals</b>
          </Typography>
        </div>
        <div
          style={{
            width: "90%",
            margin: "auto",
            boxShadow:
              "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)"
          }}
        >
          {proposalData.map((proposal, index) => {
            const panel = proposal.title;
            let approval = proposal.approval;
            let pid = proposal._id;
            let appliedDate = new Date(proposal.applied);
            return (
              <Accordion
                key={proposal._id}
                expanded={expanded === panel}
                onChange={handleChange(panel)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  {proposal.approval.admin ? (
                    <Typography
                      className={classes.heading}
                      style={{ color: "#03ac13",textAlign: "left" }}
                    >
                      <b>Proposal {index + 1}</b>
                    </Typography>
                  ) : (
                    <Typography
                      className={classes.heading}
                      style={{ textAlign: "left" }}
                    >
                      <b>Proposal {index + 1}</b>
                    </Typography>
                  )}

                  <Typography className={classes.secondaryHeading}>
                    {proposal.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ textAlign: "left" }}>
                  <Grid container className={classes.content} spacing={1}>
                    <Grid item xs={12}>
                      <Typography>
                        <b>Title of Proposal:&nbsp;&nbsp;</b>
                        {proposal.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <b>Detailed Statement of Problem:&nbsp;&nbsp;</b>
                        {proposal.details}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <b>
                          Internal Agency/External Agency/CTL/Mastek/or any
                          other:&nbsp;&nbsp;
                        </b>
                        {proposal.agency}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <b>Methods/Technique/Algorithm proposed:&nbsp;&nbsp;</b>
                        {proposal.method}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <b>Software/Hardware Requirements:&nbsp;&nbsp;</b>
                        {proposal.requirements}
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography>
                        <b>Domain of Specialization:&nbsp;&nbsp;</b>
                        {proposal.specialization}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <b>Result Expected:&nbsp;&nbsp;</b>
                        {proposal.result}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <b>Type of Project:&nbsp;&nbsp;</b>
                        {proposal.typeOfProject}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <b>Category of Project:&nbsp;&nbsp;</b>
                        {proposal.category}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <b>Appied On:&nbsp;&nbsp;</b>
                        {appliedDate.getDate()}/{appliedDate.getMonth() + 1}/
                        {appliedDate.getFullYear()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {approval.admin ? (
                        <Typography>
                          <b>Admin approval status:&nbsp;&nbsp;</b>
                          Approved
                        </Typography>
                      ) : (
                        <Typography>
                          <b>Admin approval status:&nbsp;&nbsp;</b>not approved
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      {approval.hod ? (
                        <Typography>
                          <b>HOD approval status:&nbsp;&nbsp;</b>
                          Approved
                        </Typography>
                      ) : (
                        <Typography>
                          <b>HOD approval status:&nbsp;&nbsp;</b>not approved
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          window.open(`${proposal.attachPrints}`);
                        }}
                      >
                        Show Uploaded Document
                      </Button>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>
      <Footer/>
      </React.Fragment>
    );
  } else return <LinearProgress />;
};

export default ViewProposal;
