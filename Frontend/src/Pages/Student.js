import React, { Component } from "react";
import {  Redirect } from "react-router-dom";
import LoggedNavbar from "../components/Navbar/LoggedNavbar";
import StudentContent from "../components/Student-component/StudentContent";

export default class Admin extends Component {
  constructor(props) {
    super();
    const token = localStorage.getItem("token");
    let loggedIn = false;
    if (token === "student") {
      loggedIn = true;
    }
    this.state = {
      loggedIn
    };
  }
  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <LoggedNavbar />
        {/* <Preferences /> */}
        <StudentContent />
      </div>
    );
  }
}
