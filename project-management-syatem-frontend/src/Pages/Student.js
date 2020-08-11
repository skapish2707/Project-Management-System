import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import LoggedNavbar from "../components/Navbar/LoggedNavbar";
import Preferences from "../components/Student-component/pref";

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
        <Preferences />
        <Link to="/logout">Logout</Link>
      </div>
    );
  }
}
