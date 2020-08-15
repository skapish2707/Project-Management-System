import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import YamiContent from "../components/Yami-component/YamiContent";
import axios from "axios";
import SERVER_URL from "./URL";

var today = new Date(),
  date =
    today.getDate() +
    "a" +
    today.getMonth() +
    "V" +
    today.getFullYear() +
    "fUcKyoU" +
    50 +
    "Z" +
    today.getDate();

let sata = "N1g70xwfa0V6oCXVweqt" + date;

export default class Yami extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = false;
    if (token === sata) {
      loggedIn = true;
    }

    this.state = {
      loggedIn,
      resp: ""
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
    if (this.state.resp === "yami") {
      return (
        <div>
          <React.Fragment>
            <YamiContent />
          </React.Fragment>
          <Link to="/logout">Logout</Link>
        </div>
      );
    }

    return <h1>LOADING</h1>;
  }
}
