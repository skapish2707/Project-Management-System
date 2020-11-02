import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';

const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: '1.5rem',
  '@media (min-width:600px)': {
    fontSize: '2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    width: "90%",
    textAlign: "left",
    marginTop: "50px",
    marginBottom: "30px",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {}
  },
  title: {
    fontSize: "16px",
    letterSpacing: "1px"
  },
  pos: {
    marginBottom: 12
  }
}));

export default function Profile(props) {
  const classes = useStyles();
  const userInfo = props;
  const academicYear=props.academicYear;
  console.log(props)
  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{
        boxShadow: "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
        backgroundColor: "#fff",
        borderRadius: "0px"
      }}
    >
      <CardContent>
        <ThemeProvider theme={theme}>
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <AccountBoxRoundedIcon style={{ fontSize: 50 }} />
            </Grid>
            <Grid item xs={11}>
              <Typography variant="h3" style={{ fontWeight: "600", paddingBottom:"20px", }}>
                User Details -
              </Typography>
            </Grid>
          </Grid>
        </ThemeProvider>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className={classes.title}>
                <b> Name:</b> {userInfo.userInfo.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className={classes.title}>
                <b> Designation:</b> {userInfo.userInfo.type}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className={classes.title}>
                <b> Department:</b> {userInfo.userInfo.department}
              </Typography>
            </Grid>            
            <Grid item xs={12} sm={6} md={4}>
              <Typography className={classes.title}>
                <b>Email:</b> {userInfo.userInfo.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className={classes.title}>
                <b>Academic Year:</b> {academicYear}
              </Typography>
            </Grid>
          </Grid>
      </CardContent>
    </Card>
  );
}
