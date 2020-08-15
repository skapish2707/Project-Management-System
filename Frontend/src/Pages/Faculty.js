import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import FacultyContent from "../components/Faculty-component/FacultyContent";
import axios from "axios";
import SERVER_URL from "./URL";

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
    if (
      this.state.resp === "ig" ||
      this.state.resp === "pic" ||
      this.state.resp === "hod"
    ) {
      return (
        <div>
          <React.Fragment>
            <FacultyContent />
            <Link to="/logout">Logout</Link>
          </React.Fragment>
        </div>
      );
    }

    return <h1>LOADING</h1>;
  }
}
