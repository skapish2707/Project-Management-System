import React from "react";
import {
  makeStyles,
  Typography,
  CircularProgress,
  Grid,
  Paper,
  TableCell,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableContainer
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  typo: {
    textAlign: "Left"
  }
}));

let Group = null;

const StudentWeeklyLog = props => {
  Group = props.Group;
  const classes = useStyles();

  if (Group === null) {
    return (
      <div style={{ margin: "auto" }}>
        <CircularProgress />
      </div>
    );
  } else {
    const { weeklyMeetLog } = Group;
    if (weeklyMeetLog.length === 0) {
      return (
        <React.Fragment>
          <Typography>You have not reported to your guide even once</Typography>
        </React.Fragment>
      );
    } else {
      return weeklyMeetLog.map(wML => {
        let dt = new Date(wML.weeklyLogDate);
        let logdata = wML.weeklyLogData;
        return (
          <React.Fragment key={wML._id}>
            <Paper style={{ backgroundColor: "#e0e0e0", margin: "15px 5px" }}>
              <Grid style={{ margin: "10px 35px" }} container spacing={2}>
                <Grid className={classes.typo} item xs={6} sm={6}>
                  <Typography>
                    <b>Date</b> : {dt.getDate()}/{dt.getMonth() + 1}/{dt.getFullYear()}
                  </Typography>
                </Grid>
                {/* {dt.getHours() >= 12 ? (
                  <React.Fragment>
                    {dt.getHours() === 12 ? (
                      <Grid className={classes.typo} item xs={12} sm={6}>
                        <Typography>
                          <b>Time</b> : {dt.getHours()}:{dt.getMinutes()}&nbsp;pm
                        </Typography>
                      </Grid>
                    ) : (
                      <Grid className={classes.typo} item xs={12} sm={6}>
                        <Typography>
                          <b>Time</b> : {dt.getHours()}:{dt.getMinutes()}&nbsp;pm
                        </Typography>
                      </Grid>
                    )}
                  </React.Fragment>
                ) : (
                  <Grid className={classes.typo} item xs={12} sm={6}>
                    <Typography>
                      <b>Time</b> : {dt.getHours()}:{dt.getMinutes()}&nbsp;am
                    </Typography>
                  </Grid>
                )} */}
              </Grid>

              <TableContainer
                style={{ backgroundColor: "inherit" }}
                className={classes.tableContainer}
                component={Paper}
              >
                <Table className={classes.table} style={{ width: "100%" }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" style={{ width: "25%" }}>
                        Roll-No.
                      </TableCell>
                      <TableCell align="left" style={{ width: "75%" }}>
                        Remark
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {logdata &&
                      logdata.map(l => {
                        return (
                          <TableRow key={l._id}>
                            <TableCell align="left" style={{ width: "25%" }}>
                              <Typography>{l.rollno}</Typography>
                            </TableCell>
                            <TableCell align="left" style={{ width: "75%" }}>
                              <Typography>{l.logMsg}</Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </React.Fragment>
        );
      });
    }
  }
};

export default StudentWeeklyLog;
