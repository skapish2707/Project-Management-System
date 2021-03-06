import React, { Component } from "react";
import ASideMenu from "../components/Admin-component/SideMenu";
import HSideMenu from "../components/Hod-component/HodSideMenu"
import axios from "axios";
import SERVER_URL from "./URL";
import { Redirect } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles, Grid, Card } from "@material-ui/core";
import { toFirstCharUppercase } from "../../src/components/ToUpper";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import qs from "qs";

let dArchiveId = null;
let archData = null;

const useStyles = theme => ({
 
});

class AdminArchives extends Component {
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
      expanded: false,
      archiveData: null,
      deleteDialogOpen: false
    };
  }
 
  //Get Archive Data
  getArchive = () => {
    axios({
      method: "get",
      url: SERVER_URL + "/archive",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(res => {
        archData = res.data.data;
        this.setState(
          {
            archiveData: res.data.data
          },
        );
      })

      .catch(err => {
        console.log(err);
      });
  };

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
  render() {
    const { classes } = this.props;
    console.log(archData)
    if (this.state.user === "" && this.state.archiveData === null) {
      this.getStat();
      this.getArchive();
      return <LinearProgress />;
    } else if (this.state.user.type === "admin" || this.state.user.type === "hod") {
      return this.state.archiveData !== null ? (
        <React.Fragment>
        {this.state.user.type === "admin"?<ASideMenu/>:<HSideMenu/>}
          <Typography>Welcome {this.state.user.type} to Archives Page</Typography>
        </React.Fragment>
      ) : (
        <LinearProgress />
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
export default withStyles(useStyles)(AdminArchives);
