import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: "600",
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.text.secondary
  },
  accor: {
    width: "100%",
    margin: "auto"
  },
  accordet: {
    width: "100%",
    margin: "auto"
  }
}));

export default function ControlledAccordions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  console.log(props.Groups);
  const Groups = props.Groups;

  return (
    <div className={classes.root}>
      {Groups.map(Group => {
        let members = Group.members;
        console.log(members);
        let Gname = Group.name;
        return (
          <Accordion
            expanded={expanded === Gname}
            onChange={handleChange(Gname)}
            className={classes.accor}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>{Group.name}</Typography>
              {members.map(member => {
                return (
                  <Typography className={classes.secondaryHeading}>
                    {member.name}&nbsp;&nbsp;&nbsp;&nbsp;
                  </Typography>
                );
              })}
            </AccordionSummary>
            <AccordionDetails className={classes.accordet}>
              <Grid container>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography style={{ fontWeight: "600" }}>
                        Name
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography style={{ fontWeight: "600" }}>
                        Email
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography style={{ fontWeight: "600" }}>
                        Rollno
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {members.map(member => {
                    return (
                      <Grid container>
                        <Grid item xs={4}>
                          <Typography>{member.name}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography>{member.email}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography>{member.rollno}</Typography>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
