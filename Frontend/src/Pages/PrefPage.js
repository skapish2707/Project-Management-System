import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import SERVER_URL from "./URL";
import qs from "qs";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Grid, Button, TextField, Paper, Card, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, createMuiTheme, responsiveFontSizes, ThemeProvider } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { toFirstCharUppercase } from "../components/ToUpper";
import Navbar from "../components/Navbar/Navbar";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import AdminCommentPage from "../components/Admin-component/AdminCommentPage";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

let filled = false;
let Ad = null;
let Groups = null;
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const styles = theme => ({
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
  }
});

//axios get Request

class ControlledExpansionPanels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: null,
      adData: null,
      filled,
      comment: "",
      approved: false,
      openSuccess: false,
      openFailure: false,
      shareDialog: false,
      shareEmail: ""
    };
  }

  shareDialogOpen = e => {
    this.setState({
      shareDialog: true
    });
  };
  shareDialogClose = e => {
    this.setState({
      shareDialog: false
    });
  };

  shareEmailClose = e => {
    e.preventDefault();
    if (this.state.shareEmail === "") {
      alert("Please enter and email address");
    } else {
      console.log(this.state.shareEmail);
      this.setState({
        shareDialog: false
      });
    }
  };

  commentHandler = e => {
    let comment = e.target.value;
    this.setState({
      comment: comment
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      openSuccess: false,
      openFailure: false,
      adData: null
    });
  };

  //axios request to send comments
  sendComment(Gid) {
    const { comment } = this.state;
    if (comment === "") {
      this.setState({
        openFailure: true
      });
    } else {
      axios({
        method: "post",
        url: SERVER_URL + "/comment",
        credentials: "include",
        withCredentials: true,
        data: qs.stringify({
          id: Gid,
          msg: comment
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
        .then(response => {
          this.setState({ openSuccess: true, loading: false });
          this.setState({
            adData: null,
            comment: ""
          });
        })

        .catch(err => {
          this.setState({ openFailure: true, loading: false });
          console.log(err);
        });
    }
  }

  checkData() {
    axios({
      method: "get",
      url: SERVER_URL + "/getStudents?by=group",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(res => {
        Ad = res.data.length;
        Groups = res.data;

        this.setState({
          adData: "new",
          filled: true
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  //axios post request to "/approve"
  handleApprove = (pid, id) => {
    axios({
      method: "post",
      url: SERVER_URL + "/approve",
      credentials: "include",
      withCredentials: true,
      data: qs.stringify({
        id: id,
        pid: pid
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(response => {
        this.setState({
          adData: null,
          filled: false,
          Ad: null
        });
      })

      .catch(err => {
        console.log(err);
      });
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { location } = this.props;
    const { classes } = this.props;
    const { expanded } = this.state;
    const Group = location.state.Group;
    const Gid = Group.id;
    let Ad = Group.addtionalDocuments;
    console.log(Ad);
    //call axios
    if (this.state.adData === null) {
      this.checkData();
    }
    if (this.state.filled === true && Ad !== 0) {
      return (
        <React.Fragment>
          <Navbar />
          <div style={{ width: "90%", margin: "auto" }}>
            {Groups.map(group => {
              if (group.id === Group.id) {
                let Proposals = group.proposals;
                let Proposal1 = Proposals[0];
                let Proposal2 = Proposals[1];
                let Proposal3 = Proposals[2];
                let Comments = group.comments;
                let Presentations = group.presentation;
                let implementation = group.implementation;
                let report = group.report;
                let members = group.members;
                const handleCopyText = () => {
                  navigator.clipboard.writeText(
                    window.location.origin+`/viewProposal/${group.id}`
                  );
                  this.shareDialogClose();
                };
                return (
                  <div key={group.id}>
                    <Grid container spacing={2} className={classes.grid}>
                      <Grid item xs={12}>
                        <Typography variant="h3">
                          <b>{toFirstCharUppercase(Group.name)}</b>
                        </Typography>
                      </Grid>
                    </Grid>
                    {Proposals.map((proposal, index) => {
                      const panel = proposal.title;
                      let approval = proposal.approval;
                      let pid = proposal._id;
                      let Gid = Group.id;
                      let appliedDate = new Date(proposal.applied);
                      return (
                        <Accordion
                          key={proposal._id}
                          expanded={expanded === panel}
                          onChange={this.handleChange(panel)}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            {proposal.approval.admin ? (
                              <Typography
                                className={classes.heading}
                                style={{ color: "#03ac13" }}
                              >
                                <b>Proposal {index + 1}</b>
                              </Typography>
                            ) : (
                              <Typography className={classes.heading}>
                                <b>Proposal {index + 1}</b>
                              </Typography>
                            )}

                            <Typography className={classes.secondaryHeading}>
                              {proposal.title}
                            </Typography>
                            {proposal.approval.admin ? (
                              <Typography
                                style={{
                                  color: "#03ac13",
                                  margin: "auto"
                                }}
                              >
                                <DoneIcon size="large" />
                              </Typography>
                            ) : (
                              <Typography
                                style={{ color: "red", margin: "auto" }}
                              >
                                <ClearIcon size="large" />
                              </Typography>
                            )}
                          </AccordionSummary>
                          <AccordionDetails style={{ textAlign: "left" }}>
                            <Grid
                              container
                              className={classes.content}
                              spacing={1}
                            >
                              <Grid item xs={12}>
                                <Typography>
                                  <b>Title of Proposal:&nbsp;&nbsp;</b>
                                  {proposal.title}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography>
                                  <b>
                                    Detailed Statement of Problem:&nbsp;&nbsp;
                                  </b>
                                  {proposal.details}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography>
                                  <b>
                                    Internal Agency/External
                                    Agency/CTL/Mastek/or any other:&nbsp;&nbsp;
                                  </b>
                                  {proposal.agency}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography>
                                  <b>
                                    Methods/Technique/Algorithm
                                    proposed:&nbsp;&nbsp;
                                  </b>
                                  {proposal.method}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography>
                                  <b>
                                    Software/Hardware Requirements:&nbsp;&nbsp;
                                  </b>
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
                                  {appliedDate.getDate()}/
                                  {appliedDate.getMonth() + 1}/
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
                                    <b>Admin approval status:&nbsp;&nbsp;</b>not
                                    approved
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
                                    <b>HOD approval status:&nbsp;&nbsp;</b>not
                                    approved
                                  </Typography>
                                )}
                              </Grid>
                              <Grid item xs={12}>
                                {approval.hod ? (
                                  <Typography>
                                    <b>HOD approval status:</b>Approved
                                  </Typography>
                                ) : (
                                  <Typography>
                                    <b>HOD approval status:</b>not approved
                                  </Typography>
                                )}
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  onClick={() => {
                                    window.open(
                                      `${SERVER_URL}/${proposal.attachPrints}`
                                    );
                                  }}
                                >
                                  Show Uploaded Document
                                </Button>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                style={{ textAlign: "right" }}
                              >
                                {!proposal.approval.admin &&
                                !Proposal1.approval.hod &&
                                !Proposal2.approval.hod &&
                                !Proposal3.approval.hod ? (
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={() => {
                                      this.handleApprove(pid, Gid);
                                    }}
                                  >
                                    Approve Proposal
                                  </Button>
                                ) : (
                                  <div>
                                    {proposal.approval.hod ? (
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                      >
                                        This Proposal is Selected
                                      </Button>
                                    ) : proposal.approval.admin ? (
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                      >
                                        Waiting For Hod Approval
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                      >
                                        Approved Another Proposal
                                      </Button>
                                    )}
                                  </div>
                                )}
                              </Grid>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                    <div style={{ width: "100%", margin: "auto" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                          <div>
                            <Button
                              onClick={this.shareDialogOpen}
                              style={{
                                margin: "20px 0px 0px 0px",
                                position: "relative",
                                float: "right"
                              }}
                              size="large"
                              variant="contained"
                              color="primary"
                            >
                              Get Shareable Link
                            </Button>
                            <Dialog
                              style={{ minWidth: "100px" }}
                              open={this.state.shareDialog}
                              onClose={this.shareDialogClose}
                              aria-labelledby="form-dialog-title"
                            >
                              <DialogTitle id="form-dialog-title">
                                Send proposals to other faculty members
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText>
                                  Copy this Link to Share Proposals
                                  <br />
                                  <a
                                    href={window.location.origin+`/viewProposal/${group.id}`}
                                    target="_blank"
                                  >{window.location.origin+`/viewProposal/${group.id}`}</a>
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={this.shareDialogClose}
                                  color="primary"
                                >
                                  Cancel
                                </Button>
                                {
                                  <React.Fragment>
                                    <Button
                                      onClick={() => {
                                        handleCopyText();
                                      }}
                                    >
                                      Copy Link
                                    </Button>
                                  </React.Fragment>
                                }
                              </DialogActions>
                            </Dialog>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                    <Card
                      style={{
                        backgroundColor: "#d8d8d8",
                        padding: "0px 30px",
                        margin: "50px auto"
                      }}
                    >
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="h4" style={{margin:"10px 0px 5px 5px", float:"left"}}>
                            <b>Additional Documents</b>
                          </Typography>
                        </Grid>
                      </Grid>
                      <div
                        style={{
                          backgroundColor: "#fff",
                          margin: "10px 0px 15px 0px",
                          boxShadow:
                            "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)"
                        }}
                      >
                        <React.Fragment>
                          {Ad.length === 0 ? (
                            <Typography style={{padding:"5px"}}>
                              No Additional Document Uploaded
                            </Typography>
                          ) : (
                            <React.Fragment>
                              
                              <Grid
                                container
                                style={{
                                  backgroundColor: "#fff",
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
                                <Grid item xs={6}>
                                  <Typography>
                                    <b>Description</b>
                                  </Typography>
                                </Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={2} style={{ textAlign: "centre" }}>
                                  <Typography>
                                    <b>File Link</b>
                                  </Typography>
                                </Grid>
                              </Grid>
                              {Ad.map(ad => {
                                return (
                                  <Grid
                                    container
                                    key={ad._id}
                                    style={{
                                      backgroundColor: "#fff",
                                      padding: "12px",
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
                                    <Grid item xs={6}>
                                      <Typography>{ad.desc}</Typography>
                                    </Grid>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={2}>
                                      <Typography>
                                        <a
                                          href={ad.doclink}
                                          style={{ textDecoration: "none" }}
                                          target="_blank"
                                        >
                                          <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                          >
                                            Show Document
                                          </Button>
                                        </a>
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                );
                              })}
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      </div>
                    </Card>
                    <div>
                      <Card
                        style={{
                          backgroundColor: "#d8d8d8",
                          padding: "0px 30px",
                          margin: "50px auto"
                        }}
                      >
                        <Grid container>
                          <Grid
                            item
                            xs={12}
                            style={{
                              textAlign: "left",
                              margin: "20px 0px 0px 20px"
                            }}
                          >
                            <Typography variant="h4">
                              <b>Report Marks</b>
                            </Typography>
                          </Grid>
                          <Grid item xs={12} style={{ margin: "20px 0px" }}>
                            {report.length !== 0 ? (
                              <ThemeProvider theme={theme}>
                                <TableContainer
                                  style={{ backgroundColor: "#fff" }}
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
                                        <TableCell align="center">
                                          Roll No.
                                        </TableCell>
                                        <TableCell align="center">
                                          Organizational and writing style
                                        </TableCell>
                                        <TableCell align="center">
                                          Engineering Theory and Analysis
                                        </TableCell>
                                        <TableCell align="center">
                                          Use of Bibliography
                                        </TableCell>
                                        <TableCell align="center">
                                          Spelling and Grammar
                                        </TableCell>
                                        <TableCell align="center">
                                          Graphs/Diagrams
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {report.map((report, index) => (
                                        <TableRow key={report._id}>
                                          <TableCell align="center">
                                            {report.rollno}
                                          </TableCell>
                                          <TableCell align="center">
                                            <Typography>
                                              {report.orgAndWriting}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="center">
                                            <Typography>
                                              {report.enggTheoryAnaly}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="center">
                                            <Typography>
                                              {report.biblogrpahy}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="center">
                                            <Typography>
                                              {report.spellAndGrammar}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="center">
                                            <Typography>
                                              {report.diagrams}
                                            </Typography>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </ThemeProvider>
                            ) : (
                              <Card
                                style={{
                                  borderRadius: "0px",
                                  padding: "10px",
                                  margin: "2px 0px"
                                }}
                              >
                                <Typography>
                                  Report marks have not been added by the guide.
                                </Typography>
                              </Card>
                            )}
                          </Grid>
                        </Grid>
                      </Card>
                    </div>
                    <div>
                      <Card
                        style={{
                          backgroundColor: "#d8d8d8",
                          padding: "0px 30px",
                          margin: "50px auto"
                        }}
                      >
                        <Grid container>
                          <Grid
                            item
                            xs={12}
                            style={{
                              textAlign: "left",
                              margin: "20px 0px 0px 20px"
                            }}
                          >
                            <Typography variant="h4">
                              <b>Implementation Marks</b>
                            </Typography>
                          </Grid>
                          <Grid item xs={12} style={{ margin: "20px 0px" }}>
                            {implementation.length !== 0 ? (
                            <ThemeProvider theme={theme}>
                              <TableContainer
                                style={{ backgroundColor: "#fff" }}
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
                                      <TableCell align="center">
                                        Roll No.
                                      </TableCell>
                                      <TableCell align="center">
                                        Problem Statement
                                      </TableCell>
                                      <TableCell align="center">
                                        Concepts
                                      </TableCell>
                                      <TableCell align="center">
                                        Innovation
                                      </TableCell>
                                      <TableCell align="center">
                                        Teamwork
                                      </TableCell>
                                      <TableCell align="center">
                                        Project Management and Finance
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {implementation.map(
                                      (implementation, index) => (
                                        <TableRow key={implementation._id}>
                                          <TableCell align="center">
                                            {implementation.rollno}
                                          </TableCell>
                                          <TableCell align="center">
                                            <Typography>
                                              {implementation.probStatment}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="center">
                                            <Typography>
                                              {implementation.concept}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="center">
                                            <Typography>
                                              {implementation.innovation}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="center">
                                            <Typography>
                                              {implementation.teamwork}
                                            </Typography>
                                          </TableCell>
                                          <TableCell align="center">
                                            <Typography>
                                              {implementation.pmf}
                                            </Typography>
                                          </TableCell>
                                        </TableRow>
                                      )
                                    )}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </ThemeProvider>
                            ) : (
                              <Card
                                style={{
                                  borderRadius: "0px",
                                  padding: "10px",
                                  margin: "2px 0px"
                                }}
                              >
                                <Typography>
                                  Implementation marks have not been added by the guide.
                                </Typography>
                              </Card>
                            )}
                          </Grid>
                        </Grid>
                      </Card>
                    </div>
                    <div
                      style={{
                        backgroundColor: "#e0e0e0",
                        padding: "0px 30px",
                        margin: "50px auto",
                        boxShadow:
                          "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)"
                      }}
                    >
                      <Grid container className={classes.comment}>
                        <Grid item xs={12} style={{margin:"5px"}}>
                          <Typography
                            variant="h4"
                            style={{ textAlign: "left"}}
                          >
                            <b>Comments</b>
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={3}
                          className={classes.comTitle}
                        >
                          <Typography>
                            <b>Add Comments:</b>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField
                            className={classes.comField}
                            variant="outlined"
                            component={"span"}
                            multiline
                            inputProps={{ style: { fontSize: 14 } }}
                            rows={3}
                            id="comment"
                            name="comment"
                            type="text"
                            value={this.state.comment}
                            onChange={this.commentHandler}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={3}
                          className={classes.comButton}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              this.sendComment(Gid);
                            }}
                          >
                            Send Comment
                          </Button>
                          <Snackbar
                            open={this.state.openSuccess}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                          >
                            <Alert
                              onClose={this.handleClose}
                              severity="success"
                            >
                              Successful comment
                            </Alert>
                          </Snackbar>
                          <Snackbar
                            open={this.state.openFailure}
                            autoHideDuration={6000}
                            onClose={this.handleClose}
                          >
                            <Alert onClose={this.handleClose} severity="error">
                              Unsuccessful. Comment cannot be empty
                            </Alert>
                          </Snackbar>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <AdminCommentPage Comments={Comments} />
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                );
              } else return null;
            })}
          </div>
          <div style={{ height: "150px" }}></div>
        </React.Fragment>
      );
    } else return <LinearProgress />;
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ControlledExpansionPanels);
