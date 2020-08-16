import React, { Component } from "react";
import "./AdminContent.css";
import LoggedNavbar from "../Navbar/LoggedNavbar";
import SERVER_URL from "../../Pages/URL";
import axios from "axios";

let Ad = null;
let filled = false;
let Groups = null;

class AdminContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hod: "",
      student_file: null,
      pic: "",
      ig: "",
      adData: null,
      filled
    };
  }

  hodHandler = e => {
    this.setState({ hod: e.target.value });
  };

  picHandler = e => {
    this.setState({ pic: e.target.value });
  };
  igHandler = e => {
    this.setState({ ig: e.target.value });
  };
  // studentfileHandler = e => {
  //   this.fileValidation(e);
  // };

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    var formData = new FormData();
    formData.append("hod", this.state.hod);
    formData.append("ig", this.state.ig);
    formData.append("pic", this.state.pic);
    formData.append("student_file", this.state.student_file);
    axios({
      method: "post",
      url: SERVER_URL + "/admin",
      credentials: "include",
      withCredentials: true,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(function (res) {})
      .catch(function (err) {
        if (err) throw err;
      });
    this.setState({ hod: "", student_file: null, pic: "", ig: "" });
  };

  fileValidation = e => {
    var fileInput = document.getElementById("file");

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.csv)$/i;

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      return false;
    } else {
      this.setState(
        { student_file: e.target.files[0] },
        console.log(this.state.student_file)
      );
    }
  };

  checkData() {
    axios({
      method: "get",
      url: SERVER_URL + "/getStudents?by=group",
      withCredentials: true
    })
      .then(res => {
        Ad = res.data.length;
        Groups = res.data;
        console.log(Ad);
        console.log("Groups:", Groups);

        this.setState(
          {
            adData: "new",
            filled: true
          },
          console.log(this.state.adData, this.state.filled)
        );
      })
      // .then(() => {
      //   localStorage.setItem("data", "set");
      // })

      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    if (this.state.adData === null) {
      this.checkData();
    }

    if (this.state.filled === true) {
      if (Ad == 0) {
        return (
          <div>
            <LoggedNavbar />
            <div className="admin-container" encType="multipart/form-data">
              <form onSubmit={this.submitHandler}>
                <div className="admin-title">
                  <label>Create Project Class</label>
                </div>
                <label className="admin-label">HOD Email:</label>
                <br />
                <br />
                <input
                  type="email"
                  name="hod"
                  placeholder="HOD email"
                  value={this.state.hod}
                  onChange={this.hodHandler}
                  required
                />
                <br />
                <br />
                <label className="admin-label">PIC Email:</label>
                <br />
                <br />
                <input
                  type="email"
                  name="pic"
                  placeholder="PIC email"
                  value={this.state.pic}
                  onChange={this.picHandler}
                  required
                />
                <br />
                <br />
                <label className="admin-label">IG Email:</label>
                <br />
                <br />
                <input
                  type="email"
                  name="ig"
                  placeholder="IG email"
                  value={this.state.ig}
                  onChange={this.igHandler}
                  required
                />
                <br />
                <br />
                <label className="admin-label">Student Data File:</label>
                <br />
                <br />
                <input
                  style={
                    ({ border: "1px solid #303030" }, { marginBottom: "40px" })
                  }
                  type="file"
                  id="file"
                  name="student_file"
                  onChange={this.fileValidation}
                  required
                />
                <input type="submit" value="Upload" />
              </form>
            </div>
          </div>
        );
      }
      if (Ad != 0) {
        return (
          <React.Fragment>
            <LoggedNavbar />
            <div>
              {Groups.map(group => {
                let members = group.members;
                return (
                  <div className="group-container" key={group.name}>
                    <h1>{group.name}</h1>
                    <hr className="hor" />
                    <div>
                      <h1 className="member-title">Members</h1>
                      {members.map(member => {
                        return (
                          <h1 className="membertag" key={member}>
                            {member}
                          </h1>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        );
      }
    } else return <h1>LOADING</h1>;
  }
}

export default AdminContent;
