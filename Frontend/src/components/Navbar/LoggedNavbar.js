import React, { Component } from "react";
import MenuAppBar from "./MenuAppBar";

class LoggedNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <MenuAppBar />
      </React.Fragment>
    );
  }
}

export default LoggedNavbar;
