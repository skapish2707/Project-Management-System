import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import LoggedNavbar from "../components/Navbar/LoggedNavbar";

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
        <h1>Student Page page....Only for Auth People</h1>
        <Link to="/logout">Logout</Link>
      </div>
    );
  }
}
