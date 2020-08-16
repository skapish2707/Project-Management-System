import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SERVER_URL from "../URL";
import axios from "axios";
import qs from "qs";
import "./Login.css";
import Navbar from "../../components/Navbar/Navbar";
import DataFilledAdmin from "../../components/Admin-component/DataFilledAdmin";

let Data = "";
let Ad = [];
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

export default class Login extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = true;

    if (token == null) {
      loggedIn = false;

      console.log("token is null");
    }
    this.state = {
      username: "",
      password: "",
      loggedIn,
      user: "",
      msg: ""
    };
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitForm(e) {
    e.preventDefault();
    const { username, password } = this.state;
    //Login Logic

    axios({
      method: "post",
      url: SERVER_URL + "/login",
      credentials: "include",
      withCredentials: true,
      data: qs.stringify({
        email: username,
        password: password
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    })
      .then(
        function (response) {
          console.log(response.data);
          Data = response.data.type;

          this.setState({
            user: response.data.type,
            loggedIn: true,
            msg: "set"
          });
          console.log(this.state.msg, this.state.user);
          // localStorage.setItem("token", response.data.type);
        }.bind(this)
      )

      .catch(function (err) {
        console.log(err);
      });

    this.checkData();
  }

  checkData() {
    axios({
      method: "get",
      url: SERVER_URL + "/getStudents?by=group",
      withCredentials: true
    })
      .then(function (res) {
        Ad = res.data;
        console.log(Ad);
      })
      // .then(() => {
      //   localStorage.setItem("data", "set");
      // })

      .catch(function (err) {
        console.log(err);
      });
  }

  getToken() {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.setState({
        loggedIn: false
      });
      console.log(this.state.loggedIn);
    }
  }

  render() {
    if (Data === "admin") {
      this.checkData();
    }
    if (Data === "yami") {
      localStorage.setItem("token", "N1g70xwfa0V6oCXVweqt" + date);
    }
    if (Data === "admin") {
      localStorage.setItem("token", "admin");
      Data = "";
    }

    if (Data === "ig") {
      localStorage.setItem("token", "faculty");
      Data = "";
    }
    if (Data === "pic") {
      localStorage.setItem("token", "faculty");
      Data = "";
    }
    if (Data === "hod") {
      localStorage.setItem("token", "faculty");
      Data = "";
    }
    if (Data === "student") localStorage.setItem("token", "student");
    Data = "";
    if (this.state.loggedIn) {
      const token = localStorage.getItem("token");

      if (token === "N1g70xwfa0V6oCXVweqt" + date)
        return <Redirect to="/yami" exact />;
      if (token === "admin") return <Redirect to="/admin" exact />;
      if (token === "student") return <Redirect to="/student" exact />;
      if (token === "faculty") return <Redirect to="/faculty" exact />;
    }

    // if (this.state.loggedIn) {
    //   return <Redirect to="/admin" />;
    // }
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <form onSubmit={this.submitForm}>
            <div className="login-title">
              <label>Login</label>
            </div>
            <br />
            <br />
            <input
              type="email"
              name="username"
              value={this.state.username}
              placeholder="username"
              onChange={this.onChange}
              required
            />
            <br />
            <br />
            <input
              type="password"
              name="password"
              value={this.state.password}
              placeholder="password"
              onChange={this.onChange}
              required
            />
            <br />
            <br />

            <input type="submit" value="Submit" />
          </form>
        </div>
      </React.Fragment>
    );
  }
}
