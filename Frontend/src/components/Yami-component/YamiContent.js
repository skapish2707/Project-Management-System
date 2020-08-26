import React, { Component } from "react";

import LoggedNavbar from "../Navbar/LoggedNavbar";
import axios from "axios";
import SERVER_URL from "../../Pages/URL";
import qs from "qs";

import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      width: "100%"
    },
    margin: "auto",
    alignItems: "center"
  },

  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },

  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  fields: {
    backgroundColor: "#fff"
  },
  Input: {
    border: "1px solid #d1d1d1",
    padding: "4px 5px",
    width: "55%",
    marginBottom: "20px",
    marginTop: "15px",
    float: "right",
    borderRadius: "4px"
  },
  deptLabel : {
    marginTop: "25px",
    marginBottom: "15px",
    float : "left",
  }
});

class YamiContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name:"",
      mail: "",
      dept: "Computer Science"
    };
  }

  mailHandler = event => {
    this.setState({ mail: event.target.value });
  };
  nameHandler = event => {
    this.setState({ name: event.target.value });
  };
  deptHandler = event => {
    this.setState({ dept: event.target.value });
  };

  submitHandler = event => {
    event.preventDefault();
    const {name, mail, dept } = this.state;

    axios({
      method: "post",
      url: SERVER_URL + "/yami",
      credentials: "include",
      withCredentials: true,
      data: qs.stringify({
        name : name,
        email: mail,
        department: dept
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    })
      .then(function (response) {
        console.log(response);
      })

      .catch(function (err) {
        console.log(err);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <LoggedNavbar />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div
            className={classes.paper}
            style={{
              boxShadow:
                "0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
              backgroundColor: "#fff",
              borderRadius: "6px"
            }}
          >
           
            <form
              className={classes.form}
              onSubmit={this.submitHandler}
              noValidate
            >
              <Typography variant="h4" style={{ marginTop:'15px',marginBottom:'15px'}}>
                Create Admin
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="admin"
                label="admin name"
                value={this.state.name}
                onChange={this.nameHandler}
                autoFocus/>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="admin"
                label="admin email"
                value={this.state.mail}
                onChange={this.mailHandler}
                />
              <InputLabel
              className = {classes.deptLabel}> Select Department</InputLabel>
              <Select
                value={this.state.dept}
                onChange={this.deptHandler}
                label="Department"
                fullWidth
              >
                <MenuItem value="Computer Science">Computer Science</MenuItem>
                <MenuItem value="Information Technology">Information Technology</MenuItem>
                <MenuItem value="Electronics and Telecommunication">Electronics and Telecommunication</MenuItem>
                <MenuItem value="Electronics">Electronics</MenuItem>
              </Select>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{
                  padding: "10px",
                  fontSize: "18px",
                  fontWeight: "bolder",
                  backgroundColor: "#1877f2",
                  marginBottom: "25px"
                }}
              >
                Create
              </Button>
            </form>
          </div>
        </Container>
      </div>

        
        // <Container maxWidth="xs">

           
            
        //   </Container>
      

       

      
      /// <div>
      //   <LoggedNavbar />
      //   <div className="yami-container">
      //     <form onSubmit={this.submitHandler}>
      //       <div className="yami-title">
      //         <label>Create Admin</label>
      //       </div>
      //       <label className="yami-label">Admin Email:</label>
      //       <br />
      //       <br />
      //       <input
      //         type="email"
      //         name="email"
      //         placeholder="enter email"
      //         value={this.state.mail}
      //         onChange={this.mailHandler}
      //         required
      //       />
      //       <br />
      //       <br />
      //       <label className="yami-label">Select Department</label>
      //       <br />
      //       <br />
      //       <div>
      //         <select onChange={this.deptHandler} value={this.state.dept}>
      //           <option value="Computer Science">Computer Science</option>
      //           <option value="Information Technology">
      //             Information Technology
      //           </option>
      //           <option value="Electronics And Telecommunication">
      //             Electronics And Telecommunication
      //           </option>
      //           <option value="Electronics">Electronics</option>
      //         </select>
      //       </div>
      //       <input type="submit" value="Submit" />
      //     </form>
      //   </div>
      // </div>
    );
  }
}
export default withStyles(useStyles)(YamiContent);

