import React, { Component } from "react";
import "./LoggedNavbar.css";
import { Link } from "react-router-dom";
import SERVER_URL from "../../Pages/URL";
import axios from "axios";

export default class LoggedNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  kickUser() {
    axios({
      method: "get",
      url: SERVER_URL + "/logout",
      withCredentials: true
    })
      .then(function (res) {
        console.log(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <header className="header">
          <nav className="header-links">
            <ul>
              <a href="#">Profile</a>
              <Link to="/logout" onClick={this.kickUser}>
                Logout
              </Link>
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}
