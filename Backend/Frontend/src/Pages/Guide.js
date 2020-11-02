import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import SERVER_URL from "./URL";
import { LinearProgress } from "@material-ui/core";
import Footer from "../components/Footer/Footer";
import LoggedNavbar from "../components/Navbar/LoggedNavbar";
import GuideDetails from "../components/Guide Component/GuideDetail"
import GuideGroupList from "../components/Guide Component/GroupList";


let Groups=null;
export default class Hod extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = false;
    if (token === "guide") {
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
          user: "No User"
        });
        localStorage.removeItem("token");
      });
  };


  render() {
    if (this.state.user === "") {
      this.getStat();
      return <LinearProgress />;
    } else if (this.state.user.type === "guide") {
      return (
        <div>
          <React.Fragment>
            <LoggedNavbar />
            <GuideDetails userInfo={this.state.user} />
            <h1>GUIDE PAGE!</h1>
            <GuideGroupList userInfo={this.state.user} />
          </React.Fragment>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
