import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import YamiContent from "../components/Yami-component/YamiContent";
import axios from "axios";
import SERVER_URL from "./URL";

export default class Yami extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : null,
    };
  }

  getStat = () => {
    axios({
      method: "get",
      url: SERVER_URL + "/user",
      withCredentials: true
    })
      .then(res => {
        this.setState({user : res.data});
      })
      .catch(err => {
        this.setState({ user : 'None'});
        localStorage.removeItem("token");
      });
  };

  render() {
    if (this.state.user === null){
      this.getStat();
      return <h1>LOADING</h1>;
    }
    else if (this.state.user.type === "yami") {
      return (
        <div>
          <React.Fragment>
            <YamiContent />
          </React.Fragment>
        </div>
      );
    }
    else{
      return <Redirect to="/" />;
    }      
  }
}
