import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import SERVER_URL from "../../Pages/URL";
import qs from "qs";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  Grid,
  Button,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  ThemeProvider,
  Paper,
  TableBody,
  createMuiTheme,
  responsiveFontSizes
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { toFirstCharUppercase } from "../ToUpper";
import Navbar from "../Navbar/Navbar";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import HodCommentPage from "./HodCommentPage";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

let filled = false;
let Ad = null;
let Groups = null;

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
  },
  tableContainer: {
    marginTop: "10px",
    marginBottom: "50px"
  },
  table: {
    minWidth: 650
  }
});

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

class HodPrefPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
      adData: null,
      filled,
      comment: "",
      openSuccess: false,
      openFailure: false
    };
  }

  commentHandler = e => {
    let comment = e.target.value;
    this.setState(
      {
        comment: comment
      }
      // function () {
      //   console.log(this.state.comment);
      // }
    );
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
          console.log(response);
          this.setState({
            comment: "",
            adData: null
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

  handleApprove = (pid, id) => {
    console.log(pid, id);
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
        console.log(response);
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
    let Presentations = Group.presentation;
    Presentations.sort((a, b) =>
      new Date(a.scheduled_date).getTime() >
      new Date(b.scheduled_date).getTime()
        ? 1
        : -1
    );

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
                let Comments = group.comments;
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
                                {proposal.approval.admin ? (
                                  <div>
                                    {!proposal.approval.hod ? (
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
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                      >
                                        Approved
                                      </Button>
                                    )}
                                  </div>
                                ) : (
                                  <div>
                                    {!proposal.approval.hod ? (
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                      >
                                        Not Approved
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                      >
                                        Another Proposal has been approved
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
                    {Presentations.length !== 0 ? (
                      <React.Fragment>
                        <ThemeProvider theme={theme}>
                          <Typography
                            style={{ marginTop: "20px" }}
                            variant="h4"
                          >
                            Presentation Details
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
                                  <TableCell align="center">No.</TableCell>
                                  <TableCell align="center">Date</TableCell>
                                  <TableCell align="center">Day</TableCell>
                                  <TableCell align="center">Time</TableCell>
                                  <TableCell align="center">Marks</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {Presentations.map((Presentation, index) => (
                                  <TableRow key={Presentation._id}>
                                    <TableCell align="center">
                                      {index + 1}
                                    </TableCell>
                                    <TableCell align="center">
                                      {new Date(
                                        Presentation.scheduled_date
                                      ).getDate()}
                                      /
                                      {new Date(
                                        Presentation.scheduled_date
                                      ).getMonth() + 1}
                                      /
                                      {new Date(
                                        Presentation.scheduled_date
                                      ).getFullYear()}
                                    </TableCell>
                                    <TableCell align="center">
                                      {
                                        days[
                                          new Date(
                                            Presentation.scheduled_date
                                          ).getDay()
                                        ]
                                      }
                                    </TableCell>
                                    {new Date(
                                      Presentation.scheduled_date
                                    ).getHours() > 12 ? (
                                      <TableCell align="center">
                                        {new Date(
                                          Presentation.scheduled_date
                                        ).getHours() - 12}
                                        :
                                        {new Date(
                                          Presentation.scheduled_date
                                        ).getMinutes()}{" "}
                                        pm
                                      </TableCell>
                                    ) : (
                                      <TableCell align="center">
                                        {new Date(
                                          Presentation.scheduled_date
                                        ).getHours()}
                                        :
                                        {new Date(
                                          Presentation.scheduled_date
                                        ).getMinutes()}{" "}
                                        am
                                      </TableCell>
                                    )}
                                    {Presentation.marks === null ? (
                                      <React.Fragment>
                                        {new Date(
                                          Presentation.scheduled_date
                                        ).getTime() > Date.now() ? (
                                          <TableCell align="center">
                                            Presentation Not conducted
                                          </TableCell>
                                        ) : (
                                          <TableCell align="center">
                                            <Typography
                                              style={{ fontSize: "12" }}
                                              color="secondary"
                                            >
                                              Presentation Missing
                                            </Typography>
                                          </TableCell>
                                        )}
                                      </React.Fragment>
                                    ) : (
                                      <TableCell align="center">
                                        {Presentation.marks}
                                      </TableCell>
                                    )}
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </ThemeProvider>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Typography style={{ marginTop: "20px" }} variant="h4">
                          Presentations
                        </Typography>
                        <Typography>
                          No Presentations have been scheduled.
                        </Typography>
                      </React.Fragment>
                    )}
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
                        <Grid item xs={12} style={{ marginBottom: "30px" }}>
                          <Typography
                            variant="h2"
                            style={{ textAlign: "left", fontWeight: "400" }}
                          >
                            Comments
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
                          <HodCommentPage Comments={Comments} />
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                );
              } else return null;
            })}
          </div>
        </React.Fragment>
      );
    } else return <LinearProgress />;
  }
}

HodPrefPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HodPrefPage);
