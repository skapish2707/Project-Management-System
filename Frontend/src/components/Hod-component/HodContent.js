import React, { Component } from "react";
import { withStyles, LinearProgress } from "@material-ui/core";
import Profile from "../Profile";
import HodProjectList from "./HodProjectList";
import axios from "axios";
import SERVER_URL from "../../Pages/URL";
import Footer from "../Footer/Footer";

const useStyles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "40vh"
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    marginTop: "auto"
  },
  paper: {
    marginTop: theme.spacing(8),
    width: "70%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "90%"
    },
    margin: "auto",
    alignItems: "center"
  },
  pape: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#fff"
  },

  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  fields: {
    backgroundColor: "#fff"
  },
  Input: {
    width: "90%",
    border: "1px solid #d1d1d1",
    padding: "4px 5px",
    borderRadius: "4px"
  },
  Inputfield: {
    width: "90%",
    padding: "0px"
  },
  gridField: {
    padding: "8px 0 !important"
  },
  InputTitle: {
    textAlign: "left",
    paddingLeft: "30px",
    fontSize: "16px",
    fontWeight: "600"
  }
});

let userInfo = [];
let Groups = null;
let academicYear=""
let Ad = null;
let filled = false;

class HodContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adData: null,
      filled
    };
  }

  getGroup = () => {
    axios({
      method: "get",
      url: SERVER_URL + "/getStudents?by=group",
      withCredentials: true
    })
      .then(res => {
        Ad = res.data.length;
        Groups = res.data;
        academicYear=Groups[0].acadYear
        //console.log(academicYear);
        this.setState({
          adData: "new",
          filled: true
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  render() {
    const { classes } = this.props;
    if (this.state.adData === null) {
      this.getGroup();
    }
    userInfo = this.props.userInfo;
    //console.log(userInfo);
    if (this.state.filled) {
      if (Ad !== 0) {
        return (
          <React.Fragment>
            <Profile academicYear={academicYear} userInfo={userInfo} />
            <div
              style={{
                width: "90%",
                margin: "auto",
                textAlign: "left",
                marginTop: "50px",
                boxShadow:
                  "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)"
              }}
              className={classes.root}
            >
              <HodProjectList Groups={Groups} Designation={userInfo.type}/>
            </div>
            <footer>
              <Footer />
            </footer>
          </React.Fragment>
        );
      }
    } else return <LinearProgress />;
  }
}

export default withStyles(useStyles)(HodContent);
