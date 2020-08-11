import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import FacultyContent from "../components/Faculty-component/FacultyContent";

export default class Admin extends Component {
  constructor(props) {
    super();
    const token = localStorage.getItem("token");
    let loggedIn = false;
    if (token === "faculty") {
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
      <React.Fragment>
        <FacultyContent />
        <Link to="/logout">Logout</Link>
      </React.Fragment>
    );
  }
}
