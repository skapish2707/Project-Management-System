import React, { Component } from "react";
import SideMenu from "./SideMenu";
import axios from "axios";
import SERVER_URL from "../../Pages/URL";
import { Redirect } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import Archive from "@material-ui/icons/Archive";
import {
  Card,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField
} from "@material-ui/core";
import qs from "qs";
import { toFirstCharUppercase } from "../ToUpper";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

let department = null;
let Gname = null;
let Groupid = null;
let deleteMemberEmail = null;
let groupData = [];

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

class AdminGroupsPage extends Component {
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
      groupDetails: null,
      deleteMemberOpen: false,
      addMemberOpen: false,
      memberName: "",
      memberEmail: "",
      memberRollno: "",
      deleteProposalsOpen: false,
      deleteAllUserDialog: false,
      archive: false,
      loading: false,
      archiveSuccess: false
    };
  }

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
        groupData = res.data;
        this.setState({
          groupDetails: res.data
        });
      })

      .catch(function (err) {
        console.log(err);
      });
  }

  //DELETE MEMBERS---------------------------------------------
  handleDeleteMemberDialogOpen = (id, email) => {
    deleteMemberEmail = email;
    Groupid = id;
    this.setState({
      deleteMemberOpen: true
    });
  };
  handleDeleteMemberDialogClose = () => {
    this.setState({
      deleteMemberOpen: false
    });
  };
  handleDeleteMember = (gid, email) => {
    this.handleDeleteMemberDialogClose();
    axios({
      method: "post",
      url: SERVER_URL + "/deleteUser?type=student",
      credentials: "include",
      withCredentials: true,
      data: qs.stringify({
        gid: gid,
        email: email
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(res => {
        deleteMemberEmail = null;
        Groupid = null;
        window.location.reload(false);
      })

      .catch(err => {
        console.log(err);
      });
  };

  //DELETE PROPOSALS SECTION--------------------------------
  handleDeleteProposalsDialogOpen(e, gid) {
    e.stopPropagation();
    e.preventDefault();
    Groupid = gid;
    this.setState({
      deleteProposalsOpen: true
    });
  }
  handleDeleteProposalsDialogClose = () => {
    this.setState({
      deleteProposalsOpen: false
    });
  };
  handleDeleteProposals = gid => {
    this.handleDeleteProposalsDialogClose();
    axios({
      method: "post",
      url: SERVER_URL + "/deleteProposal",
      credentials: "include",
      withCredentials: true,
      data: qs.stringify({
        gid: gid
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(res => {
        Groupid = null;
        window.location.reload(false);
      })

      .catch(err => {
        console.log(err);
      });
  };

  handleDeleteAllUser = () => {
    this.setState({ loading: true });
    axios({
      method: "post",
      url: SERVER_URL + "/deleteAllUsers",
      credentials: "include",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(res => {
        this.setState({ loading: false, deleteAllUserDialog: false });
        window.location.reload();
      })
      .catch(err => {
        this.setState({ loading: false, deleteAllUserDialog: false });
        console.log(err);
      });
  };
  // handleArchieve = () => {
  //   this.setState({ loading: true });
  //   axios({
  //     method: "post",
  //     url: SERVER_URL + "/archive",
  //     credentials: "include",
  //     withCredentials: true,
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("access_token")
  //     }
  //   })
  //     .then(res => {
  //       this.setState({ loading: false, archive: false, archiveSuccess: true });
  //     })
  //     .catch(err => {
  //       this.setState({ loading: false, archive: false });
  //       console.log(err);
  //     });
  // };
  //ADD MEMBER SECTION ------------------------------------
  handleAddMemberDialogOpen = (gid, dept, gname) => {
    Groupid = gid;
    department = dept;
    Gname = gname;
    this.setState({
      addMemberOpen: true
    });
  };
  handleAddMemberDialogClose = () => {
    this.setState({
      addMemberOpen: false
    });
  };

  handleMemberNameChange = e => {
    this.setState({
      memberName: e.target.value
    });
  };

  handleMemberEmailChange = e => {
    this.setState({
      memberEmail: e.target.value
    });
  };
  handleMemberRollnoChange = e => {
    this.setState({
      memberRollno: e.target.value
    });
  };

  handleAddMember = (id, department, groupName) => {
    if (
      this.state.memberName === "" ||
      this.state.memberEmail === "" ||
      this.state.memberRollno === ""
    ) {
      alert("Member name,email or rollno cannot be empty");
    } else {
      axios({
        method: "post",
        url: SERVER_URL + "/addmember",
        credentials: "include",
        withCredentials: true,
        data: qs.stringify({
          id: id,
          name: this.state.memberName,
          email: this.state.memberEmail,
          rollno: this.state.memberRollno,
          department: department,
          groupName: groupName
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
        .then(res => {
          Groupid = null;
          department = null;
          Gname = null;
          this.setState({
            memberEmail: "",
            memberRollno: "",
            memberName: "",
            addMemberOpen: false
          });

          window.location.reload(false);
        })

        .catch(err => {
          alert("Member not added");
          this.setState({
            addHodOpen: false
          });
          console.log(err);
        });
    }
  };

  handleChildClick = e => {
    e.stopPropagation();
  };

  render() {
    const { classes } = this.props;
    if (this.state.loading) return <LinearProgress />;
    if (this.state.groupDetails === null) {
      this.checkData();
      return <LinearProgress />;
    }
    if (this.state.user === "") {
      this.getStat();
      return <LinearProgress />;
    } else if (this.state.user.type === "admin") {
      const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        this.setState({ archiveSuccess: false });
      };
      return (
        <React.Fragment>
          <SideMenu />

          {/* Dialog box for delete MEMBER confirmation*/}
          <div>
            <Dialog
              open={this.state.deleteMemberOpen}
              onClose={this.handleDeleteMemberDialogClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete Member"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this Member? You need to
                  assign another student after deleting this one
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={this.handleDeleteMemberDialogClose}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() =>
                    this.handleDeleteMember(Groupid, deleteMemberEmail)
                  }
                  color="primary"
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          {/*------------------------ ADD MEMBER DIALOG ---------------------*/}
          <div>
            <Dialog
              open={this.state.addMemberOpen}
              onClose={() => this.handleAddMemberDialogClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add Member</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please add name,email and Rollno of Student
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="MemberName"
                  label="Member Name"
                  type="text"
                  value={this.state.memberName}
                  onChange={this.handleMemberNameChange}
                  fullWidth
                  required
                />
                <TextField
                  margin="dense"
                  id="MemberEmail"
                  label="Member Email"
                  type="text"
                  value={this.state.memberEmail}
                  onChange={this.handleMemberEmailChange}
                  fullWidth
                  required
                />
                <TextField
                  margin="dense"
                  id="MemberRoll"
                  label="Member Roll"
                  type="text"
                  value={this.state.memberRollno}
                  onChange={this.handleMemberRollnoChange}
                  fullWidth
                  required
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={this.handleAddMemberDialogClose}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() =>
                    this.handleAddMember(Groupid, department, Gname)
                  }
                  color="primary"
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          {/* -----------------DELETE PROPOSALS DIALOG---------------------- */}
          <div>
            <Dialog
              open={this.state.deleteProposalsOpen}
              onClose={this.handleDeleteProposalsDialogClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete Proposals"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete Submitted Proposals? If you
                  delete the Proposals then student will have to fill the
                  proposals again
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={this.handleDeleteProposalsDialogClose}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => this.handleDeleteProposals(Groupid)}
                  color="primary"
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          {/* -----------------DELETE ALL USER DIALOG---------------------- */}
          <div>
            <Dialog
              open={this.state.deleteAllUserDialog}
              onClose={() => {
                this.setState({ deleteAllUserDialog: false });
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete ALL User"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete All users and groups? All the
                  students,HOD,guides will be removed from the database as well
                  as the details of all groups will also be deleted before
                  deleting make sure you have archived the groups
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    this.setState({ deleteAllUserDialog: false });
                  }}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button onClick={this.handleDeleteAllUser} color="primary">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          {/* -----------------ARCHIEVE---------------------- */}
          {/* <div>
            <Dialog
              open={this.state.archive}
              onClose={() => {
                this.setState({ archive: false });
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Archive Groups"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Archiving will save all the groups data in the archive
                  section.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    this.setState({ archive: false });
                  }}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button onClick={this.handleArchieve} color="primary">
                  Archive
                </Button>
              </DialogActions>
            </Dialog>
          </div> */}
          {/* <Snackbar
            open={this.state.archiveSuccess}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              Archived Groups Data Successfully
            </Alert>
          </Snackbar> */}

          {/* -----------------------MEMBER ACCORDION------------------------*/}
          {groupData.length !== 0 ? (
            <div className={classes.mainAccorContainer}>
              <br />
              <Grid container style={{ padding: "5px" }}>
                <Grid item xs={12} sm={6} style={{ margin: "auto" }}>
                  <Typography variant="h3" style={{ marginBottom: "18px" }}>
                    Manage Groups
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={{ textAlign: "right", margin: "auto" }}
                >
                  {/* <Button
                    endIcon={<Archive />}
                    variant="contained"
                    onClick={() => {
                      this.setState({ archive: true });
                    }}
                    color="primary"
                    style={{ margin: "5px 5px" }}
                  >
                    Archive
                  </Button> */}
                  <Button
                    endIcon={<DeleteIcon />}
                    variant="contained"
                    onClick={() => {
                      this.setState({ deleteAllUserDialog: true });
                    }}
                    color="primary"
                  >
                    Delete All Users
                  </Button>
                </Grid>
              </Grid>

              {groupData.map(group => {
                let proposal1Stat = null;
                let proposal2Stat = null;
                let proposal3Stat = null;
                if (group.proposals.length === 3) {
                  proposal1Stat = group.proposals[0].approval.admin;
                  proposal2Stat = group.proposals[1].approval.admin;
                  proposal3Stat = group.proposals[2].approval.admin;
                }

                let gid = group.id;
                let dept = group.department;
                let gname = group.name;
                return (
                  <Accordion className={classes.mainAccor} key={group.name}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        <b>{toFirstCharUppercase(group.name)}</b>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <React.Fragment>
                        {/* MEMBERS ACCORDON */}
                        <div className={classes.root}>
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
                                    <Grid item xs={2}>
                                      {group.members.length < 3 ? (
                                        <Button
                                          onClick={() =>
                                            this.handleAddMemberDialogOpen(
                                              gid,
                                              dept,
                                              gname
                                            )
                                          }
                                          variant="contained"
                                          color="primary"
                                        >
                                          Add Member
                                        </Button>
                                      ) : null}
                                    </Grid>
                                  </Grid>
                                </Card>
                                {group.members.map(member => {
                                  let dmemberEmail = member.email;
                                  return (
                                    <Card
                                      className={classes.groupCard}
                                      key={member.email}
                                    >
                                      <Grid container>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={3}>
                                          <Typography>{member.name}</Typography>
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
                                        <Grid item xs={2}>
                                          <DeleteIcon
                                            className={classes.deleteIconStyle}
                                            onClick={() =>
                                              this.handleDeleteMemberDialogOpen(
                                                gid,
                                                dmemberEmail
                                              )
                                            }
                                          />
                                        </Grid>
                                      </Grid>
                                    </Card>
                                  );
                                })}
                              </div>
                            </AccordionDetails>
                          </Accordion>

                          {/* PROPOSAL ACCORDION */}
                          <Accordion className={classes.accorStyle}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                            >
                              <Typography className={classes.heading}>
                                Proposals
                              </Typography>
                              {group.proposals.length !== 0 &&
                              !proposal1Stat &&
                              !proposal2Stat &&
                              !proposal3Stat ? (
                                <Button
                                  onClick={e => {
                                    this.handleDeleteProposalsDialogOpen(
                                      e,
                                      gid
                                    );
                                  }}
                                  variant="outlined"
                                  color="primary"
                                >
                                  Delete All Proposals
                                </Button>
                              ) : null}
                            </AccordionSummary>
                            <AccordionDetails>
                              <div className={classes.root}>
                                {group.proposals.length === 3 ? (
                                  group.proposals.map((proposal, index) => {
                                    let approval = proposal.approval;
                                    // let pid = proposal._id;

                                    return (
                                      <Accordion
                                        style={{ textAlign: "left" }}
                                        key={index}
                                      >
                                        <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                        >
                                          <Typography
                                            className={classes.heading}
                                          >
                                            Proposal {index + 1}
                                          </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <Grid
                                            container
                                            className={classes.content}
                                            spacing={1}
                                          >
                                            <Grid item xs={12}>
                                              <Typography>
                                                <b>
                                                  Title of Proposal:&nbsp;&nbsp;
                                                </b>
                                                {proposal.title}
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                              <Typography>
                                                <b>
                                                  Detailed Statement of
                                                  Problem:&nbsp;&nbsp;
                                                </b>
                                                {proposal.details}
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                              <Typography>
                                                <b>
                                                  Internal Agency/External
                                                  Agency/CTL/Mastek/or any
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
                                                {proposal.requirements}
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                              <Typography>
                                                <b>
                                                  Domain of
                                                  Specialization:&nbsp;&nbsp;
                                                </b>
                                                {proposal.specialization}
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                              <Typography>
                                                <b>
                                                  Result Expected:&nbsp;&nbsp;
                                                </b>
                                                {proposal.result}
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                              <Typography>
                                                <b>Appied On:&nbsp;&nbsp;</b>
                                                {/* {proposal.applied.split("T")[0]} */}
                                                {proposal.applied.substr(0, 10)}
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                              <Typography>
                                                <b>
                                                  Attached Print:&nbsp;&nbsp;
                                                </b>
                                                {proposal.attachPrints}
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                              {approval.admin ? (
                                                <Typography>
                                                  <b>Admin approval status:</b>
                                                  Approved
                                                </Typography>
                                              ) : (
                                                <Typography>
                                                  <b>Admin approval status:</b>
                                                  not approved
                                                </Typography>
                                              )}
                                            </Grid>
                                            <Grid item xs={12}>
                                              {approval.hod ? (
                                                <Typography>
                                                  <b>HOD approval status:</b>
                                                  Approved
                                                </Typography>
                                              ) : (
                                                <Typography>
                                                  <b>HOD approval status:</b>not
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
                                            ></Grid>
                                          </Grid>
                                        </AccordionDetails>
                                      </Accordion>
                                    );
                                  })
                                ) : (
                                  <Typography>
                                    Proposals Not filled yet
                                  </Typography>
                                )}
                              </div>
                            </AccordionDetails>
                          </Accordion>

                          {/* PRESENTATION ACCORDION */}
                          <Accordion className={classes.accorStyle}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel3a-content"
                              id="panel3a-header"
                            >
                              <Typography className={classes.heading}>
                                Presentation
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div style={{ width: "100%" }}>
                                <Card className={classes.presCard}>
                                  <Grid container>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={3}>
                                      <Typography>
                                        Presentation
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                      <Typography>
                                        Date
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                      <Typography>
                                        Time
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                      <Typography>
                                        Marks
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Card>
                                {group.presentation.map((pres, index) => {
                                  return (
                                    <Card
                                      className={classes.presCard}
                                      key={index}
                                    >
                                      <Grid container>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={3}>
                                          <Typography>
                                            Presentation {index + 1}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                          <Typography>
                                            {pres.scheduled_date.split("T")[0]}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                          <Typography>
                                            {pres.scheduled_date.slice(11, 16)}
                                          </Typography>
                                        </Grid>
                                        {pres.filled === false ? (
                                          <Grid item xs={3}>
                                            Not assigned
                                          </Grid>
                                        ) : (
                                          <Grid item xs={3}>
                                            <Typography>
                                              {pres.orgMarks +
                                              pres.subKnowMarks +
                                              pres.EODMarks +
                                              pres.timeMarks}/10
                                            </Typography>
                                          </Grid>
                                        )}
                                      </Grid>
                                    </Card>
                                  );
                                })}
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </React.Fragment>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </div>
          ) : (
            <Typography variant="h3" style={{ marginBottom: "18px" }}>
              No Groups
            </Typography>
          )}
        </React.Fragment>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default withStyles(useStyles)(AdminGroupsPage);
