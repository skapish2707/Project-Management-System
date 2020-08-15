import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import AdminContent from "../components/Admin-component/AdminContent";
import axios from "axios";
import SERVER_URL from "./URL";

var today = new Date(),
  date = today.getDate();

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
    if (this.state.resp === "admin") {
      return (
        <div>
          <React.Fragment>
            {/* <AdminContent /> */}
            <AdminContent />
          </React.Fragment>
          <Link to="/logout">Logout</Link>
        </div>
      );
    }

    return <h1>LOADING</h1>;
  }
}
