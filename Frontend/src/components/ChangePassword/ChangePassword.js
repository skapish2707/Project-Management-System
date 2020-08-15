import React, { Component } from "react";
import axios from "axios";
import "./ChangePassword.css";
import SERVER_URL from "../../Pages/URL";
import qs from "qs";

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPassword: "",
      confirmPassword: ""
    };
  }

  pushPassword = () => {
    axios({
      method: "post",
      url: SERVER_URL + "/changePassword",
      credentials: "include",
      withCredentials: true,
      data: qs.stringify({
        newPassword: this.state.newPassword,
        confirmPassword: this.state.confirmPassword
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    })
      .then(function (res) {
        console.log(res);
      })

      .catch(function (err) {
        console.log(err);
      });
  };

  newpasswordHandler = e => {
    this.setState({ newPassword: e.target.value });
  };

  confirmpasswordHandler = e => {
    this.setState({ confirmPassword: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.newpassword !== this.state.confirmpassword) {
      console.log(this.state);
      alert("Please enter same password in both fields");
      this.setState({ newPassword: "", confirmPassword: "" });
    } else {
      console.log(this.state);
      alert("Both fields are same");
      this.pushPassword();
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="changepassword-form">
        <div className="changepassword-title">
          <label>Change Password</label>
        </div>
        <label className="changepassword-label">New Password : </label>
        <br />
        <br />
        <input
          className="changepassword-input"
          type="password"
          name="password"
          value={this.state.newPassword}
          onChange={this.newpasswordHandler}
          required
        />
        <br />
        <br />
        <label className="changepassword-label">Confirm Password : </label>
        <br />
        <br />
        <input
          className="changepassword-input"
          type="password"
          name="password"
          value={this.state.confirmPassword}
          onChange={this.confirmpasswordHandler}
          required
        />
        <br />
        <br />
        <button className="changepassword-btn">Confirm</button>
      </form>
    );
  }
}

export default ChangePassword;
