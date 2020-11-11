import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LoggedNavbar from "../components/Navbar/LoggedNavbar";
import axios from "axios";
import SERVER_URL from "./URL";
import StudentWholePage from "../components/Student-component/studentWholePage";
import { LinearProgress } from "@material-ui/core";

//import StudentContent from "../components/Student-component/StudentContent";

export default class Admin extends Component {
  constructor(props) {
    super();
    const token = localStorage.getItem("token");
    let loggedIn = false;
    if (token === "student") {
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
        //console.log(res.data);
        this.setState({
          loggedIn: true,
          user: res.data
        });
      })
      .catch(err => {
        this.setState({ user: "NO user" });
        localStorage.removeItem("token");
        localStorage.removeItem("access_token");
      });
  };

  render() {
    if (this.state.user === "") {
      this.getStat();
      return <LinearProgress />;
    } else if (this.state.user.type === "student") {
      return (
        <div>
          <LoggedNavbar />
          <StudentWholePage userInfo={this.state.user} />
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
