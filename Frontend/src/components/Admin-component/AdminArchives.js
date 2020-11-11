import React, { Component } from "react";
import SideMenu from "./SideMenu";
import axios from "axios";
import SERVER_URL from "../../Pages/URL";
import { Redirect } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles, Grid, Card } from "@material-ui/core";
import { toFirstCharUppercase } from "../ToUpper";

let archData = null;

const useStyles = theme => ({
  root: {
    width: "100%"
  },
  mainAccor: {
    color: "#303030",
    margin: "auto"
  },
  mainAccorContainer: {
    width: "80%",
    margin: "2px auto",
    marginTop: "30px"
  },
  memberHolder: {
    width: "10%",
    backgroundColor: "#909090"
  },
  groupCard: {
    width: "100%",
    padding: "8px 0px",
    marginTop: "2px",
    textAlign: "left"
  },
  accorStyle: {
    backgroundColor: "#d3d3d3"
  },
  heading: {
    fontWeight: "bold"
  },
  deleteIconStyle: {
    cursor: "pointer",
    "&:hover": {
      color: "red"
    }
  },
  presCard: {
    width: "100%",
    padding: "8px 0px",
    marginTop: "2px",
    borderRadius: "0px",
    textAlign: "left"
  }
});

class AdminArchives extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = true;
    if (token === "admin") {
      loggedIn = true;
    }

    this.state = {
      loggedIn,
      user: "",
      expanded: false,
      archiveData: null
    };
  }

  //Get Archive Data
  getArchive = () => {
    axios({
      method: "get",
      url: SERVER_URL + "/archive",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(res => {
        console.log(res);
        archData = res.data.data;
        this.setState(
          {
            archiveData: res.data.data
          },
          console.log(this.state.archiveData)
        );
      })

      .catch(err => {
        console.log(err);
      });
  };

  getStat = () => {
    axios({
      method: "get",
      url: SERVER_URL + "/user",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(res => {
        this.setState({
          loggedIn: true,
          user: res.data
        });
      })

      .catch(err => {
        this.setState({
          loggedIn: false,
          user: "No User"
        });
        localStorage.removeItem("token");
      });
  };
  render() {
    console.log(this.state.archiveData);
    const { classes } = this.props;
    if (this.state.user === "" && this.state.archiveData === null) {
      this.getStat();
      this.getArchive();
      return <LinearProgress />;
    } else if (this.state.user.type === "admin") {
      return this.state.archiveData !== null ? (
        <React.Fragment>
          <SideMenu />
          <div
            style={{
              backgroundColor: "#fff",
              width: "80%",
              margin: "30px auto",
              boxShadow:
                "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)"
            }}
          >
            <Typography variant="h2">Archive</Typography>
          </div>
          {/* ACCORDION FOR GROUPDATA */}
          <div style={{ width: "80%", margin: "auto" }}>
            {archData
              ? archData.map(data => {
                  return (
                    <Accordion className={classes.accorStyle}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography variant="h6">{data.acadYear}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div style={{ width: "100%" }}>
                          {data.groups.map(group => {
                            return (
                              <Accordion>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Typography className={classes.heading}>
                                    {toFirstCharUppercase(group.name)}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <div style={{ width: "100%" }}>
                                    <Accordion className={classes.accorStyle}>
                                      <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                      >
                                        <Typography className={classes.heading}>
                                          Members
                                        </Typography>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        <React.Fragment>
                                          <div style={{ width: "100%" }}>
                                            <Card className={classes.groupCard}>
                                              <Grid container>
                                                <Grid item xs={1}></Grid>
                                                <Grid item xs={3}>
                                                  <Typography>
                                                    <b>Name</b>
                                                  </Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                  <Typography>
                                                    <b>Email</b>
                                                  </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                  <Typography>
                                                    <b>Rollno</b>
                                                  </Typography>
                                                </Grid>
                                                <Grid item xs={2}></Grid>
                                              </Grid>
                                            </Card>
                                            {group.members.map(member => {
                                              return (
                                                <Card
                                                  className={classes.groupCard}
                                                >
                                                  <Grid container>
                                                    <Grid item xs={1}></Grid>
                                                    <Grid item xs={3}>
                                                      <Typography>
                                                        {member.name}
                                                      </Typography>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                      <Typography>
                                                        {member.email}
                                                      </Typography>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                      <Typography>
                                                        {member.rollno}
                                                      </Typography>
                                                    </Grid>
                                                    <Grid item xs={2}></Grid>
                                                  </Grid>
                                                </Card>
                                              );
                                            })}
                                          </div>
                                        </React.Fragment>
                                      </AccordionDetails>
                                    </Accordion>
                                    <Accordion className={classes.accorStyle}>
                                      <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                      >
                                        <Typography className={classes.heading}>
                                          Proposals
                                        </Typography>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        <div className={classes.root}>
                                          {group.proposals.length === 3 ? (
                                            group.proposals.map(
                                              (proposal, index) => {
                                                let approval =
                                                  proposal.approval;
                                                let pid = proposal._id;

                                                return (
                                                  <Accordion
                                                    style={{
                                                      textAlign: "left"
                                                    }}
                                                  >
                                                    <AccordionSummary
                                                      expandIcon={
                                                        <ExpandMoreIcon />
                                                      }
                                                      aria-controls="panel1a-content"
                                                      id="panel1a-header"
                                                    >
                                                      <Typography
                                                        className={
                                                          classes.heading
                                                        }
                                                      >
                                                        Proposal {index + 1}
                                                      </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                      <Grid
                                                        container
                                                        className={
                                                          classes.content
                                                        }
                                                        spacing={1}
                                                      >
                                                        <Grid item xs={12}>
                                                          <Typography>
                                                            <b>
                                                              Title of
                                                              Proposal:&nbsp;&nbsp;
                                                            </b>
                                                            {proposal.title}
                                                          </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                          <Typography>
                                                            <b>
                                                              Detailed Statement
                                                              of
                                                              Problem:&nbsp;&nbsp;
                                                            </b>
                                                            {proposal.details}
                                                          </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                          <Typography>
                                                            <b>
                                                              Internal
                                                              Agency/External
                                                              Agency/CTL/Mastek/or
                                                              any
                                                              other:&nbsp;&nbsp;
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
                                                              Software/Hardware
                                                              Requirements:&nbsp;&nbsp;
                                                            </b>
                                                            {
                                                              proposal.requirements
                                                            }
                                                          </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                          <Typography>
                                                            <b>
                                                              Domain of
                                                              Specialization:&nbsp;&nbsp;
                                                            </b>
                                                            {
                                                              proposal.specialization
                                                            }
                                                          </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                          <Typography>
                                                            <b>
                                                              Result
                                                              Expected:&nbsp;&nbsp;
                                                            </b>
                                                            {proposal.result}
                                                          </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                          <Typography>
                                                            <b>
                                                              Appied
                                                              On:&nbsp;&nbsp;
                                                            </b>
                                                            {/* {proposal.applied.split("T")[0]} */}
                                                            {proposal.applied.substr(
                                                              0,
                                                              10
                                                            )}
                                                          </Typography>
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                          {approval.admin ? (
                                                            <Typography>
                                                              <b>
                                                                Admin approval
                                                                status:
                                                              </b>
                                                              Approved
                                                            </Typography>
                                                          ) : (
                                                            <Typography>
                                                              <b>
                                                                Admin approval
                                                                status:
                                                              </b>
                                                              not approved
                                                            </Typography>
                                                          )}
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                          {approval.hod ? (
                                                            <Typography>
                                                              <b>
                                                                HOD approval
                                                                status:
                                                              </b>
                                                              Approved
                                                            </Typography>
                                                          ) : (
                                                            <Typography>
                                                              <b>
                                                                HOD approval
                                                                status:
                                                              </b>
                                                              not approved
                                                            </Typography>
                                                          )}
                                                        </Grid>

                                                        <Grid
                                                          item
                                                          xs={12}
                                                          sm={6}
                                                          style={{
                                                            textAlign: "right"
                                                          }}
                                                        ></Grid>
                                                      </Grid>
                                                    </AccordionDetails>
                                                  </Accordion>
                                                );
                                              }
                                            )
                                          ) : (
                                            <Typography>
                                              Proposals Not filled yet
                                            </Typography>
                                          )}
                                        </div>
                                      </AccordionDetails>
                                    </Accordion>
                                  </div>
                                </AccordionDetails>
                              </Accordion>
                            );
                          })}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              : null}
          </div>
        </React.Fragment>
      ) : (
        <LinearProgress />
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
export default withStyles(useStyles)(AdminArchives);
