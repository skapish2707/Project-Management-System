import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    // minWidth: 275,
    textAlign: "left",
    // height: "220px",

    [theme.breakpoints.down("sm")]: {}
  },
  title: {
    fontSize: "20px",
    letterSpacing: "1px"
  },
  pos: {
    marginBottom: 12
  }
}));

export default function Profile(props) {
  const classes = useStyles();
  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{
        boxShadow: "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
        backgroundColor: "#fff",
        borderRadius: "6px"
      }}
    >
      <CardContent>
        <Typography variant="h3">Instructions -</Typography>
        <Typography className={classes.title}>
          1.Please fill the below form to create project list of your department
        </Typography>
        <Typography className={classes.title}>
          2.Project list file should be of .csv format
        </Typography>
        <Typography className={classes.title}>
          3.Adding email of respective authorities will give them access
          according to their designation
        </Typography>
        <Typography className={classes.title}>
          {" "}
          4.On submitting the form you will create a list mentioned in the file
          and will give authorities to emails mentioned by you
        </Typography>
      </CardContent>
    </Card>
  );
}
