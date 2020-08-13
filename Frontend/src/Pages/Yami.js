import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import YamiContent from "../components/Yami-component/YamiContent";

export default class Yami extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = false;
    if (token === "yami") {
      loggedIn = true;
    }

    this.state = {
      loggedIn
    };
  }
  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <YamiContent />
      </React.Fragment>
    );
  }
}
