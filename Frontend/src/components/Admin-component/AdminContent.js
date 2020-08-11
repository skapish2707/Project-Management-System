import React, { Component } from "react";
import "./AdminContent.css";
import LoggedNavbar from "../Navbar/LoggedNavbar";
import SERVER_URL from "../../Pages/URL";
import axios from "axios";

class AdminContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hod: "",
      student_file: null,
      pic: "",
      ig: ""
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

  render() {
    return (
      <div>
        <LoggedNavbar />
        <div className="admin-container" enctype="multipart/form-data">
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
}

export default AdminContent;
