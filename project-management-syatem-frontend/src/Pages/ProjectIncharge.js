import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

export default class Admin extends Component {
  constructor(props) {
    super();
    const token = localStorage.getItem("token");
    let loggedIn = false;

    if (token == "pic") {
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
        <h1>Project Incharge page....Only for Auth People</h1>
        <Link to="/logout">Logout</Link>
      </div>
    );
  }
}
