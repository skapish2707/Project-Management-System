import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Logout extends Component {
  constructor(props) {
    super(props);
    localStorage.removeItem("token");
    this.state = {
      Token: "a"
    };
  }

  render() {
    return (
      <div>
        <h1>You Have been Logged out</h1>
        <Link to="/">Login Again</Link>
      </div>
    );
  }
}
