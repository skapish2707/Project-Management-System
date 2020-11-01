import React, { Component } from 'react'
import SideMenu from './SideMenu'
import axios from "axios";
import SERVER_URL from "../../Pages/URL";
import { Redirect } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";

export default class AdminGuidePage extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = true;
    if (token === "admin") {
      loggedIn = true;
    }

    this.state = {
      loggedIn,
      user: "",
      groupDetails:null
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
  checkData() {
    axios({
      method: "get",
      url: SERVER_URL + "/getStudents?by=group",
      withCredentials: true,
      headers : {
        Authorization : 'Bearer '+ localStorage.getItem("access_token") 
      }
    })
      .then(res => {
        console.log(res.data)
        this.setState({
          groupDetails:res.data
          
        },console.log(this.state.groupDetails));
      })

      .catch(function (err) {
        console.log(err);
      });
      
  }
  render() {
    if (this.state.groupDetails === null){
      this.checkData();
    } 
    if (this.state.user === "") {
      this.getStat();
      return <LinearProgress />;
    } else if (this.state.user.type === "admin") {
      return (
        <div>
         <SideMenu/>
        <h1>GROUPS</h1>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
      }
}

