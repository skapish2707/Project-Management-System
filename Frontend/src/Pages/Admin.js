import React, { Component } from "react";
import {  Redirect } from "react-router-dom";
import AdminContent from "../components/Admin-component/AdminContent";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = false;
    if (token === "admin") {
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
        <AdminContent />
      </React.Fragment>
    );
  }
}
