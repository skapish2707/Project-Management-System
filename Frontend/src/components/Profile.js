import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: "50%",
    margin: "auto",
    marginTop: "20px",
    textAlign: "left"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: "30px"
  },
  pos: {
    marginBottom: 12
  }
});

export default function Profile(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const userInfo = props;
  console.log(userInfo);
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h3">User Details</Typography>
        <Typography className={classes.title}>
          name: {userInfo.userInfo.name}
        </Typography>
        <Typography className={classes.title}>
          designation:{userInfo.userInfo.type}
        </Typography>
        <Typography className={classes.title}>
          department:{userInfo.userInfo.department}
        </Typography>
        <Typography className={classes.title}>
          email:{userInfo.userInfo.email}
        </Typography>
      </CardContent>
    </Card>
  );
}
