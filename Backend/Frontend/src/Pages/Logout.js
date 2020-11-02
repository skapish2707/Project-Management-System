import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Logout extends Component {
  constructor(props) {
    super(props);
    localStorage.removeItem("token");
    localStorage.removeItem("access_token")
  }

  render() {
    return (
      <div>
        <h1>You Have been Logged out</h1>
        <button onClick={() => {window.location.reload(false)}}><Link to="/">Login Again</Link></button>
        
      </div>
    );
  }
}
