import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import FacultyContent from "../components/Faculty-component/FacultyContent";
import axios from "axios";
import SERVER_URL from "./URL";
import { LinearProgress } from "@material-ui/core";
import Footer from "../components/Footer/Footer";

export default class Admin extends Component {
  constructor(props) {
    super();
    const token = localStorage.getItem("token");
    let loggedIn = false;
    if (token === "faculty") {
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
      withCredentials: true,
      headers : {
        Authorization : 'Bearer '+ localStorage.getItem("access_token") 
      }
    })
      .then(res => {
        this.setState({
          loggedIn: true,
          user: res.data
        });
      })
      .catch(err => {
        this.setState({
          loggedIn: false,
          user: "no user"
        });
        localStorage.removeItem("token");
      });
  };

  render() {
    if (this.state.user === "") {
      this.getStat();
      return <LinearProgress />;
    } else if (
      this.state.user.type === "ig" ||
      this.state.user.type === "pic"
    ) {
      return (
        <div>
          <React.Fragment>
            <FacultyContent />
            <footer>
              <Footer />
            </footer>
          </React.Fragment>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
