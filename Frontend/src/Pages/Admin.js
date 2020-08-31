import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import AdminContent from "../components/Admin-component/AdminContent";
import axios from "axios";
import SERVER_URL from "./URL";
import { LinearProgress } from "@material-ui/core";
import Footer from "../components/Footer/Footer";

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
      loggedIn,
      user: ""
    };
  }

  getStat = () => {
    axios({
      method: "get",
      url: SERVER_URL + "/user",
      withCredentials: true
    })
      .then(res => {
        console.log(res.data);
        console.log(res.data.type);
        this.setState({
          loggedIn: true,
          user: res.data
        });
      })

      .catch(err => {
        this.setState({
          loggedIn: false,
          user: "No User"
        });
        localStorage.removeItem("token");
      });
  };
  render() {
    if (this.state.user === "") {
      this.getStat();
      return <LinearProgress />;
    } else if (this.state.user.type === "admin") {
      return (
        <div>
          <React.Fragment>
            <AdminContent userInfo={this.state.user} />
          </React.Fragment>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
