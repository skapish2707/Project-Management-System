import React from "react";
import { useLocation } from "react-router-dom";
import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  grid: { padding: "10px" },
  gridContent: {
    textAlign: "left"
  },
  content: {
    backgroundColor: "#fff",
    padding: "20px"
  }
}));

const PrefPage = props => {
  //getting passed data via history
  const location = useLocation();
  const Group = location.state.Group;
  const Proposals = Group.proposals;
  console.log(Group);
  console.log(Proposals);
  console.log(Proposals[0].approval.admin);
  //initialize classes for material uI
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12}>
          <Typography variant="h3">
            <b>{Group.name}</b>
          </Typography>
        </Grid>
        {Proposals.map((proposal, index) => {
          let approval = proposal.approval;
          console.log(approval.admin);
          return (
            <Grid
              item
              xs={12}
              className={classes.gridContent}
              key={proposal._id}
            >
              <Grid container className={classes.content} spacing={1}>
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    style={{ textAlign: "center", marginBottom: "20px" }}
                  >
                    <b>Proposal {index + 1}</b>
                  </Typography>
                </Grid>
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
              </Grid>
            </Grid>
          );
        })}
        if
      </Grid>
    </div>
  );
};

export default PrefPage;
