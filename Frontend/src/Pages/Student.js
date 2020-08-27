import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import LoggedNavbar from "../components/Navbar/LoggedNavbar";
import axios from "axios";
import SERVER_URL from "./URL";
import StudentWholePage from "../components/Student-component/studentWholePage"
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
      resp: ""
    };
  }

  getStat = () => {
    axios({
      method: "get",
      url: SERVER_URL + "/user",
      withCredentials: true
    })
      .then(res => {
        console.log(res.data.type);
        this.setState({
          loggedIn: true,
          resp: res.data.type
        });
      })

      .catch(function (err) {
        console.log(err);
      });
  };

  render() {
    if (this.state.resp === "") {
      this.getStat();
    }

    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    if (this.state.resp === "student") {
      return (
        <div>
          <LoggedNavbar />
          <StudentWholePage />
        </div>
      );
    }

    return <h1>LOADING</h1>;
  }
}
