import React from "react";
import {
  makeStyles,
  Typography,
  Grid,
  Paper,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  typo1: {
    textAlign: "left",
    fontWeight: "Medium"
  },
  typo2: {
    textAllign: "right",
    fontWeight: "Light"
  }
}));

const THEME = createMuiTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});

const AdminCommentPage = props => {
  const classes = useStyles();
  const comments = props.Comments;
  if (comments.length === 0) {
    return (
      <React.Fragment>
        <Typography variant="h4">No comments have been added</Typography>
      </React.Fragment>
    );
  } else {
    return (
      <ThemeProvider theme={THEME}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Paper
              style={{
                backgroundColor: "#fff",
                borderRadius: "0px",
                marginTop: "50px",
                marginBottom: "50px"
              }}
            >
              <Paper style={{ borderRadius: "0" }}>
                <Typography
                  variant="h3"
                  style={{ fontWeight: "400", textAlign: "left" }}
                >
                  &nbsp;Previous Comments:
                </Typography>
              </Paper>
              {comments
                .slice(0)
                .reverse()
                .map(comment => {
                  let d = new Date(comment.time);
                  return (
                    <React.Fragment key={comment._id}>
                      <Paper style={{ borderRadius: "0" }}>
                        <Grid
                          container
                          style={{
                            margin: "auto",
                            marginTop: "5px",
                            marginBottom: "5px"
                          }}
                          spacing={2}
                        >
                          <Grid
                            className={classes.typo1}
                            item
                            xs={12}
                            sm={12}
                            md={8}
                          >
                            <Typography
                              style={{
                                fontWeight: "400",
                                fontSize: 16,
                                fontStyle: "Arial"
                              }}
                            >
                              Author : {comment.author}
                            </Typography>
                          </Grid>
                          <Grid className={classes.typo2} item xs={2}>
                            <Typography
                              style={{
                                fontWeight: "200",
                                fontSize: 14,
                                fontStyle: "Roboto",
                                textAlign: "left"
                              }}
                            >
                              Date : {d.toString().substr(4, 12)}
                            </Typography>
                          </Grid>
                          <Grid className={classes.typo2} item xs={2}>
                            <Typography
                              style={{
                                fontWeight: "200",
                                fontSize: 14,
                                fontStyle: "Helvetica Neue",
                                textAlign: "left"
                              }}
                            >
                              Time : {d.toString().slice(15, 24)}
                            </Typography>
                          </Grid>
                          <Grid className={classes.typo1} item xs={12}>
                            <Typography
                              style={{
                                fontWeight: "400",
                                fontSize: 18,
                                fontStyle: "Arial"
                              }}
                            >
                              Comment : {comment.text}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </React.Fragment>
                  );
                  // }else{return null}
                })}
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
};

export default AdminCommentPage;
