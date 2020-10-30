import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import SERVER_URL from "./URL";
import { LinearProgress } from "@material-ui/core";
import Footer from "../components/Footer/Footer";
import LoggedNavbar from "../components/Navbar/LoggedNavbar";


export default class Hod extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = false;
    if (token === "guide") {
      loggedIn = true;
    }
    this.state = {
      loggedIn,
      user: ""
    };
  }

  getStat = () => {
    axios({
      method: "get",
      url: SERVER_URL + "/user",
      withCredentials: true,
      headers : {
        Authorization : 'Bearer '+ localStorage.getItem("access_token") 
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
    //groups = this.state.Groups;
    if (this.state.user === "") {
      this.getStat();
      return <LinearProgress />;
    } else if (this.state.user.type === "guide") {
      return (
        <div>
          <React.Fragment>
            <LoggedNavbar />
            <h1>GUIDE PAGE!</h1>
          </React.Fragment>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
