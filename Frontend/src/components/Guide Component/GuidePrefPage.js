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
  CircularProgress,
  Card
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { toFirstCharUppercase } from "../ToUpper";
import Navbar from "../Navbar/Navbar";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import HodCommentPage from "../Hod-component/HodCommentPage";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

let filled = false;
let Ad = null;
let Groups = null;
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
// const months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
// let pd= new Date()

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

class HodPrefPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
      adData: null,
      filled,
      comment: "",
      openSuccess: false,
      openFailure: false,
      scheduleLoading: false,
      dateTime: "",
      marks: "",
      totalMarks: ""
    };
  }

  sche_pres = (e, id) => {
    let dt = new Date(this.state.dateTime);
    console.log(dt.toISOString());
    console.log(this.state.dateTime);
    this.setState({ scheduleLoading: true });
    axios({
      method: "post",
      url: SERVER_URL + "/presentation",
      withCredentials: true,
      data: qs.stringify({
        datetime: dt.toISOString(),
        gid: id
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(res => {
        console.log("SCHEDULED");
        this.setState({ scheduleLoading: false });
      })

      .catch(function (err) {
        console.log(err);
        this.setState({ scheduleLoading: false });
      });
  };

  handleDateTimeChange = e => {
    this.setState({ dateTime: e.target.value });
    //console.log(dateTime)
  };

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
      url: SERVER_URL + "/guideGroup",
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

  handleMarkSubmit = (e, groupID, presentationID) => {
    console.log(this.state.marks);
    console.log(this.state.totalMarks);
    if (parseInt(this.state.marks, 10) > parseInt(this.state.totalMarks, 10)) {
      alert("Marks obtained cannot be greater than max marks");
      this.setState({ marks: "", totalMarks: "" });
    } else {
      axios({
        method: "post",
        url: SERVER_URL + "/presentationMarks",
        credentials: "include",
        withCredentials: true,
        data: qs.stringify({
          gid: groupID,
          pid: presentationID,
          marks: this.state.marks + "/" + this.state.totalMarks
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
        .then(response => {
          console.log("Marks submitted");
          this.setState({ marks: "", totalMarks: "" });
          window.location.reload();
        })
        .catch(err => {
          this.setState({ marks: "", totalMarks: "" });
          console.log(err);
        });
    }
  };

  handleMarks = e => {
    this.setState({ marks: e.target.value });
  };
  handleTotalMarks = e => {
    this.setState({ totalMarks: e.target.value });
  };

  handleDeletePresentation = (e, PID, GID) => {
    axios({
      method: "post",
      url: SERVER_URL + "/deletePresentation",
      withCredentials: true,
      data: qs.stringify({
        pid: PID,
        gid: GID
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(res => {
        console.log("Deleted");
        window.location.reload();
      })

      .catch(function (err) {
        console.log(err);
      });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    if (this.state.adData === null) {
      this.checkData();
    }
    if (this.state.filled === true && Ad !== 0) {
      return (
        <React.Fragment>
          <Navbar />
          <div style={{ width: "90%", margin: "auto" }}>
            {Groups.map(group => {
              let Gid = group.id;
              if (group.id === this.props.match.params.id) {
                let Presentations = group.presentation;
                let Proposals = group.proposals;
                let Comments = group.comments;
                Presentations.sort((a, b) =>
                  new Date(a.scheduled_date).getTime() >
                  new Date(b.scheduled_date).getTime()
                    ? 1
                    : -1
                );
                return (
                  <div key={group.id}>
                    <Grid container spacing={2} className={classes.grid}>
                      <Grid item xs={12}>
                        <Typography variant="h3">
                          <b>{toFirstCharUppercase(group.name)}</b>
                        </Typography>
                      </Grid>
                    </Grid>
                    {Proposals.map((proposal, index) => {
                      const panel = proposal.title;
                      let approval = proposal.approval;
                      let pid = proposal._id;
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
                                      `http://localhost:8000/${proposal.attachPrints}`
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
                    <Card
                      style={{
                        marginTop: "50px",
                        backgroundColor: "#e0e0e0",
                        padding: "20px"
                      }}
                    >
                      <Grid style={{ marginTop: "20px" }} container>
                        <Grid item xs={4}>
                          <Typography
                            style={{ marginBottom: "20px" }}
                            variant="h3"
                          >
                            Presentation
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <form
                            onSubmit={e => {
                              this.sche_pres(e, Gid);
                            }}
                          >
                            <Grid container>
                              <Grid item xs={3}></Grid>
                              <Grid
                                item
                                xs={6}
                                style={{
                                  padding: "5px",
                                  backgroundColor: "#fff"
                                }}
                              >
                                {" "}
                                <TextField
                                  id="datetime-local"
                                  label="Next Presentation"
                                  type="datetime-local"
                                  defaultValue={new Date().toISOString()}
                                  className={classes.textField}
                                  required
                                  InputLabelProps={{
                                    shrink: true
                                  }}
                                  onChange={this.handleDateTimeChange}
                                  style={{
                                    padding: "5px 20px",
                                    borderRadius: "2px"
                                  }}
                                />
                              </Grid>
                              <Grid
                                item
                                xs={3}
                                style={{
                                  padding: "5px",
                                  textAlign: "left",
                                  backgroundColor: "#fff"
                                }}
                              >
                                {" "}
                                {!this.state.scheduleLoading ? (
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{ margin: "10px" }}
                                  >
                                    Schedule
                                  </Button>
                                ) : (
                                  <CircularProgress />
                                )}
                              </Grid>
                            </Grid>
                          </form>
                        </Grid>
                        <Grid item xs={12}>
                          {Presentations.length !== 0 ? (
                            <React.Fragment>
                              {Presentations.map((presentation, index) => {
                                const panel = presentation._id;
                                let d = new Date(presentation.scheduled_date);
                                return (
                                  <Accordion
                                    key={presentation._id}
                                    expanded={expanded === panel}
                                    onChange={this.handleChange(panel)}
                                  >
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1bh-content"
                                      id="panel1bh-header"
                                    >
                                      <Grid container>
                                        <Grid item xs={3}>
                                          <Typography variant="h6">
                                            <b>Presentation {index + 1}</b>
                                          </Typography>
                                        </Grid>
                                        {presentation.marks === null ? (
                                          <React.Fragment>
                                            {d.getTime() > Date.now() ? (
                                              <React.Fragment>
                                                <Grid item xs={6} />
                                                <Grid item xs={3}>
                                                  <Typography>
                                                    Presentation Not conducted
                                                  </Typography>
                                                </Grid>
                                              </React.Fragment>
                                            ) : (
                                              <React.Fragment>
                                                <Grid item xs={6} />
                                                <Grid item xs={3}>
                                                  <Typography color="secondary">
                                                    Presentation missed
                                                  </Typography>
                                                </Grid>
                                              </React.Fragment>
                                            )}
                                          </React.Fragment>
                                        ) : (
                                          <React.Fragment>
                                            <Grid item xs={6} />
                                            <Grid item xs={3}>
                                              <Typography
                                                style={{ color: "green" }}
                                              >
                                                Presentation conducted
                                              </Typography>
                                            </Grid>
                                          </React.Fragment>
                                        )}
                                      </Grid>
                                    </AccordionSummary>
                                    <AccordionDetails
                                      style={{ textAlign: "left" }}
                                    >
                                      <Grid
                                        container
                                        className={classes.content}
                                        spacing={1}
                                        style={{
                                          padding: "0px"
                                        }}
                                      >
                                        <Grid
                                          item
                                          xs={2}
                                          style={{
                                            textAlign: "left",
                                            backgroundColor: "#d3d3d3"
                                          }}
                                        >
                                          <React.Fragment>
                                            {d.getHours() > 12 ? (
                                              <Typography variant="h5">
                                                {d.getHours() - 12}:
                                                {d.getMinutes()} pm
                                              </Typography>
                                            ) : (
                                              <Typography variant="h5">
                                                {d.getHours()}:{d.getMinutes()}{" "}
                                                am
                                              </Typography>
                                            )}
                                            {days[d.getDay()]} {d.getDate()}/
                                            {d.getMonth() + 1}/{d.getFullYear()}
                                          </React.Fragment>
                                        </Grid>
                                        {presentation.marks === null &&
                                        d.getTime() <= Date.now() ? (
                                          <Grid
                                            item
                                            xs={10}
                                            style={{
                                              backgroundColor: "#fff",
                                              padding: "0px",
                                              margin: "0px 0px",
                                              border: "4px solid #d3d3d3"
                                            }}
                                          >
                                            <Grid container>
                                              <Grid
                                                item
                                                xs={4}
                                                style={{ textAlign: "right" }}
                                              >
                                                <TextField
                                                  size="small"
                                                  type="number"
                                                  value={this.state.marks}
                                                  variant="outlined"
                                                  label="Marks obtained"
                                                  onChange={this.handleMarks}
                                                  style={{
                                                    margin: "10px 0px",
                                                    backgroundColor: "#fff"
                                                  }}
                                                />
                                              </Grid>
                                              <Grid item xs={4}>
                                                <TextField
                                                  size="small"
                                                  type="number"
                                                  value={this.state.totalMarks}
                                                  variant="outlined"
                                                  label="Total Marks"
                                                  onChange={
                                                    this.handleTotalMarks
                                                  }
                                                  style={{
                                                    margin: "10px 0px",
                                                    backgroundColor: "#fff"
                                                  }}
                                                />
                                              </Grid>
                                              <Grid item xs={4}>
                                                <Button
                                                  size="large"
                                                  variant="contained"
                                                  color="primary"
                                                  onClick={e => {
                                                    this.handleMarkSubmit(
                                                      e,
                                                      Gid,
                                                      presentation._id
                                                    );
                                                  }}
                                                  style={{ margin: "10px 0px" }}
                                                >
                                                  Submit Marks
                                                </Button>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        ) : null}
                                        {presentation.marks !== null ? (
                                          <React.Fragment>
                                            <Grid
                                              item
                                              xs={3}
                                              style={{
                                                border: "4px solid #d3d3d3",
                                                padding: "12px"
                                              }}
                                            >
                                              <Typography variant="h6">
                                                Marks Obtained:&nbsp;
                                                {presentation.marks}
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              xs={7}
                                              style={{ textAlign: "right" }}
                                            >
                                              <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={e => {
                                                  this.handleDeletePresentation(
                                                    e,
                                                    presentation._id,
                                                    Gid
                                                  );
                                                }}
                                              >
                                                Delete presentation
                                              </Button>
                                            </Grid>
                                          </React.Fragment>
                                        ) : (
                                          <Grid
                                            item
                                            xs={12}
                                            style={{ textAlign: "right" }}
                                          >
                                            <Button
                                              variant="contained"
                                              color="secondary"
                                              onClick={e => {
                                                this.handleDeletePresentation(
                                                  e,
                                                  presentation._id,
                                                  Gid
                                                );
                                              }}
                                            >
                                              Delete presentation
                                            </Button>
                                          </Grid>
                                        )}
                                      </Grid>
                                    </AccordionDetails>
                                  </Accordion>
                                );
                              })}
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <Typography>No presentation scheduled</Typography>
                            </React.Fragment>
                          )}
                        </Grid>
                      </Grid>
                    </Card>
                    <Grid container className={classes.comment}>
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
                          <Alert onClose={this.handleClose} severity="success">
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
