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
import { Grid, Button } from "@material-ui/core";

let filled = false;
let Ad = null;
let Groups = null;

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

//axios get Request

class ControlledExpansionPanels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: null,
      adData: null,
      filled
    };
  }

  checkData() {
    axios({
      method: "get",
      url: SERVER_URL + "/getStudents?by=group",
      withCredentials: true
    })
      .then(res => {
        Ad = res.data.length;
        Groups = res.data;
        console.log(Ad);
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
        "content-type": "application/x-www-form-urlencoded;charset=utf-8"
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

    //call axios
    if (this.state.adData === null) {
      this.checkData();
    }
    if (this.state.filled === true && Ad !== 0) {
      return (
        <div>
          {Groups.map(group => {
            if (group.id === Group.id) {
              console.log(group.id, Group.id);
              let Proposals = group.proposals;
              console.log(Proposals);
              return (
                <div>
                  {Proposals.map((proposal, index) => {
                    const panel = proposal.title;
                    let approval = proposal.approval;
                    let pid = proposal._id;
                    let Gid = Group.id;
                    return (
                      <Accordion
                        expanded={expanded === panel}
                        onChange={this.handleChange(panel)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography className={classes.heading}>
                            <b>Proposal {index + 1}</b>
                          </Typography>
                          <Typography className={classes.secondaryHeading}>
                            {proposal.title}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ textAlign: "left" }}>
                          <Grid
                            container
                            className={classes.content}
                            spacing={1}
                          >
                            <Grid item xs={12}>
                              <Typography>
                                <b>Title:&nbsp;&nbsp;</b>
                                {proposal.title}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography>
                                <b>Details:&nbsp;&nbsp;</b>
                                {proposal.details}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography>
                                <b>Method:&nbsp;&nbsp;</b>
                                {proposal.method}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography>
                                <b>Requirements:&nbsp;&nbsp;</b>
                                {proposal.requirements}
                              </Typography>
                            </Grid>

                            <Grid item xs={12}>
                              <Typography>
                                <b>Specialization:&nbsp;&nbsp;</b>
                                {proposal.specialization}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography>
                                <b>Result:&nbsp;&nbsp;</b>
                                {proposal.result}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography>
                                <b>Appied On:&nbsp;&nbsp;</b>
                                {proposal.applied}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography>
                                <b>Attached Print:&nbsp;&nbsp;</b>
                                {proposal.attachPrints}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              {approval.admin ? (
                                <Typography>
                                  <b>Admin approval status:</b>Approved
                                </Typography>
                              ) : (
                                <Typography>
                                  <b>Admin approval status:</b>not approved
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
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </div>
              );
            } else return null;
          })}
        </div>
      );
    } else return <LinearProgress />;

    // return (
    //   <div className={classes.root}>

    //     <Accordion
    //       expanded={expanded === "panel1"}
    //       onChange={this.handleChange("panel1")}
    //     >
    //       <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    //         <Typography className={classes.heading}>
    //           General settings
    //         </Typography>
    //         <Typography className={classes.secondaryHeading}>
    //           I am an expansion panel
    //         </Typography>
    //       </AccordionSummary>
    //       <AccordionDetails>
    //         <Typography>
    //           Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
    //           feugiat. Aliquam eget maximus est, id dignissim quam.
    //         </Typography>
    //       </AccordionDetails>
    //     </Accordion>
    //   </div>
    // );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ControlledExpansionPanels);
