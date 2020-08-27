import React, { Component } from "react";
import SERVER_URL from "../../Pages/URL";
import axios from "axios";
import qs from "qs";
import {Typography } from "@material-ui/core";

let Stu = null;
let filled = false;
let Proposals = null;

class StudentContent extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentStep: 1,
  //     email: "",
  //     department: "Computer Science",
  //     name: "",
  //     roll: "",
  //     seat: "",
  //     selectedFile: null
  //   };
  // }

  constructor(props) {
    super(props);
    this.state = {
      preferences: [
        {
          filled: false,
          prefno: 1,
          Top: "",
          Dos: "",
          Dsop: "",
          Agency: "",
          Mtap: "",
          Red: "",
          Shr: "",
          selectedFile: null
        },
        {
          filled: false,
          prefno: 2,
          Top: "",
          Dos: "",
          Dsop: "",
          Agency: "",
          Mtap: "",
          Red: "",
          Shr: "",
          selectedFile: null
        },
        {
          filled: false,
          prefno: 3,
          Top: "",
          Dos: "",
          Dsop: "",
          Agency: "",
          Mtap: "",
          Red: "",
          Shr: "",
          selectedFile: null
        }
      ],
      currentStep: 1,
      stuData: null,
      filled
    };
  }

  handleTopChange = (e, pn) => {
    let prefs = [...this.state.preferences];
    for (var i = 0; i < 3; i++) {
      //let prefno = prefs[i].prefno;
      if (i === pn - 1) {
        //let pref=[...prefs[i]];
        prefs[i].Top = e.target.value;
        //prefs[i]=pref;
        this.setState({ preferences: prefs });
        // console.log(this.state.preferences);
      }
    }
    //console.log(this.state.preferences)
  };

  handleDosChange = (e, pn) => {
    let prefs = [...this.state.preferences];
    for (var i = 0; i < 3; i++) {
      if (i === pn - 1) {
        //let pref=[...prefs[i]];
        prefs[i].Dos = e.target.value;
        // prefs[i]=pref;
        this.setState({ preferences: prefs });
      }
    }
    //console.log(this.state.preferences)
  };

  handleDsopChange = (e, cs) => {
    let prefs = [...this.state.preferences];
    for (var i = 0; i < 3; i++) {
      if (i === cs - 1) {
        //let pref=[...prefs[i]];
        prefs[i].Dsop = e.target.value;
        // prefs[i]=pref;
        this.setState({ preferences: prefs });
      }
    }
    //console.log(this.state.preferences)
  };

  handleAgencyChange = (e, cs) => {
    let prefs = [...this.state.preferences];
    for (var i = 0; i < 3; i++) {
      if (i === cs - 1) {
        //let pref=[...prefs[i]];
        prefs[i].Agency = e.target.value;
        // prefs[i]=pref;
        this.setState({ preferences: prefs });
      }
    }
    //console.log(this.state.preferences)
  };

  handleMtapChange = (e, cs) => {
    let prefs = [...this.state.preferences];
    for (var i = 0; i < 3; i++) {
      if (i === cs - 1) {
        //let pref=[...prefs[i]];
        prefs[i].Mtap = e.target.value;
        // prefs[i]=pref;
        this.setState({ preferences: prefs });
      }
    }
    //console.log(this.state.preferences)
  };

  handleRedChange = (e, cs) => {
    let prefs = [...this.state.preferences];
    for (var i = 0; i < 3; i++) {
      if (i === cs - 1) {
        //let pref=[...prefs[i]];
        prefs[i].Red = e.target.value;
        // prefs[i]=pref;
        this.setState({ preferences: prefs });
      }
    }
    //console.log(this.state.preferences)
  };

  handleShrChange = (e, cs) => {
    let prefs = [...this.state.preferences];
    for (var i = 0; i < 3; i++) {
      if (i === cs - 1) {
        //let pref=[...prefs[i]];
        prefs[i].Shr = e.target.value;
        // prefs[i]=pref;
        this.setState({ preferences: prefs });
      }
    }
    //console.log(this.state.preferences)
  };

  handleFileChange = (e, cs) => {
    let prefs = [...this.state.preferences];
    for (var i = 0; i < 3; i++) {
      if (i === cs - 1) {
        prefs[i].File = e.target.value[0];
        this.setState({ preferences: prefs });
      }
    }
  };

  handleClick = (e, pn) => {
    e.preventDefault();
    if (this.state.currentStep === 3) {
      let prefs = [...this.state.preferences];
      for (var i = 0; i < 3; i++) {
        if (i === pn - 1) {
          //let pref=[...prefs[i]];
          prefs[i].filled = true;
          // prefs[i]=pref;
          this.setState({ preferences: prefs });
          console.log(prefs[i].filled);
          this.handleSubmit(e);
        }
      }
    } else {
      let prefs = [...this.state.preferences];
      for (var i = 0; i < 3; i++) {
        if (i === pn - 1) {
          //let pref=[...prefs[i]];
          prefs[i].filled = true;
          // prefs[i]=pref;
          this.setState({ preferences: prefs });
          console.log(prefs[i].filled);
        }
      }
    }

    console.log(this.state.preferences);
  };

  handleSubmit = e => {
    e.preventDefault();
    let pref1 = this.state.preferences[0];
    let pref2 = this.state.preferences[1];
    let pref3 = this.state.preferences[2];
    //console.log(pref1);
    axios({
      method: "post",
      url: SERVER_URL + "/student",
      credentials: "include",
      withCredentials: true,
      data: qs.stringify({
        proposals: [
          {
            title: pref1.Top,
            specialization: pref1.Dos,
            details: pref1.Dsop,
            agency: pref1.Agency,
            method: pref1.Mtap,
            result: pref1.Red,
            requirements: pref1.Shr
          },
          {
            title: pref2.Top,
            specialization: pref2.Dos,
            details: pref2.Dsop,
            agency: pref2.Agency,
            method: pref2.Mtap,
            result: pref2.Red,
            requirements: pref2.Shr
          },
          {
            title: pref3.Top,
            specialization: pref3.Dos,
            details: pref3.Dsop,
            agency: pref3.Agency,
            method: pref3.Mtap,
            result: pref3.Red,
            requirements: pref3.Shr
          }
        ]
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    })
      .then(function (res) {})
      .catch(function (err) {
        if (err) throw err;
      });
    alert("Submitted");
    console.log(this.state.preferences);
  };

  checkData = () => {
    axios({
      method: "get",
      url: SERVER_URL + "/group",
      withCredentials: true
    })
      .then(res => {
        // console.log(res)
        Stu = res.data.proposals.length;
        Proposals = res.data.proposals;
        //console.log(Stu,Proposals)
        this.setState({
          stuData: "new",
          filled: true
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  _next = e => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });
    //console.log(currentStep);
    this.handleClick(e, currentStep - 1);
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  };

  /*
   * the functions for our button
   */
  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button className="btn-secondary" type="button" onClick={this._prev}>
          Previous
        </button>
      );
    }
    return null;
  }

  handleNext = e => {
    e.preventDefault();
    let currentStep = this.state.currentStep;
    let {
      filled,
      prefno,
      Top,
      Dos,
      Dsop,
      Agency,
      Mtap,
      Red,
      Shr,
      selectedFile
    } = this.state.preferences[currentStep - 1];
    if (
      Top === "" ||
      Dos === "" ||
      Dsop === "" ||
      Agency === "" ||
      Mtap === "" ||
      Red === "" ||
      Shr === "" ||
      selectedFile === null
    ) {
      alert("Please enter all the details of the preference");
    } else {
      console.log(this.state.preferences);
      this._next(e);
    }
  };

  // nextButton =() => {
  //   console.log();
  //   let currentStep = this.state.currentStep;
  //   if (currentStep < 3) {
  //     return (
  //       <button className="btn-primary" type="button" onClick={this._next}>
  //         Next
  //       </button>
  //     );
  //   }
  //   return null;
  // }

  render() {
    if (this.state.stuData === null) {
      this.checkData();
    }
    if (this.state.filled === true) {
      if (Stu == 0) {
        return (
          <React.Fragment>
            {/* {this.checkData()} */}
            <Typography variant="h1" style={{alignContent:"center"}}>Project Title</Typography>
            <p>Step {this.state.currentStep}</p>
            <form
              onSubmit={e => {
                this.handleClick(e, this.state.currentStep);
              }}
              className="form-group"
            >
              <Step1
                currentStep={this.state.currentStep}
                preferences={this.state.preferences}
                handleTopChange={this.handleTopChange}
                handleDosChange={this.handleDosChange}
                handleDsopChange={this.handleDsopChange}
                handleAgencyChange={this.handleAgencyChange}
                handleClick={this.handleClick}
                handleNext={this.handleNext}
                handleMtapChange={this.handleMtapChange}
                handleRedChange={this.handleRedChange}
                handleShrChange={this.handleShrChange}
              />
              <Step2
                currentStep={this.state.currentStep}
                preferences={this.state.preferences}
                handleTopChange={this.handleTopChange}
                handleDosChange={this.handleDosChange}
                handleDsopChange={this.handleDsopChange}
                handleAgencyChange={this.handleAgencyChange}
                handleClick={this.handleClick}
                handleNext={this.handleNext}
                handleMtapChange={this.handleMtapChange}
                handleRedChange={this.handleRedChange}
                handleShrChange={this.handleShrChange}
              />
              <Step3
                currentStep={this.state.currentStep}
                preferences={this.state.preferences}
                handleTopChange={this.handleTopChange}
                handleDosChange={this.handleDosChange}
                handleDsopChange={this.handleDsopChange}
                handleAgencyChange={this.handleAgencyChange}
                handleClick={this.handleClick}
                handleSubmit={this.handleSubmit}
                handleMtapChange={this.handleMtapChange}
                handleRedChange={this.handleRedChange}
                handleShrChange={this.handleShrChange}
              />
              {this.previousButton()}
              {/* {this.nextButton()} */}
            </form>
          </React.Fragment>
        );
      }
      if (Stu != 0) {
        return (
          <React-Fragment key={Proposals._id}>
            <h4>hod{"\t"}admin</h4>
            {Proposals.map(proposal => {
              // let apphod=proposal.approval.hod
              return (
                <div>
                  <p>
                    {String(proposal.approval.hod)}
                    {"\t"}
                    {String(proposal.approval.admin)}
                  </p>
                  <hr />
                </div>
              );
            })}
          </React-Fragment>
        );
      }
    }
    return <h1>loading</h1>;
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <React.Fragment>
      {/* <form onSubmit={this.handleSubmit}> */}
      <div>
        <h3>Preference 1</h3>
      </div>
      <label>Title of Preference : </label>
      <input
        id="Top"
        name="Top"
        type="text"
        value={props.preferences[0].Top}
        onChange={e => {
          props.handleTopChange(e, props.preferences[0].prefno);
        }}
        required
      />
      <br />
      <br />
      <label>Domain of Specialization : </label>
      <input
        id="Dos"
        name="Dos"
        type="text"
        value={props.preferences[0].Dos}
        onChange={e => {
          props.handleDosChange(e, props.preferences[0].prefno);
        }}
        required
      />
      <br />
      <br />
      <label>Detailed Statement of Problem : </label>
      <input
        id="Dsop"
        name="Dsop"
        type="text"
        value={props.preferences[0].Dsop}
        onChange={e => {
          props.handleDsopChange(e, props.preferences[0].prefno);
        }}
        required
      />
      <br />
      <br />
      <label>
        Internal agency / external agency / CTL / Mastek/or any other :{" "}
      </label>
      <input
        id="agency"
        name="agency"
        type="text"
        value={props.preferences[0].Agency}
        onChange={e => {
          props.handleAgencyChange(e, props.preferences[0].prefno);
        }}
        required
      />
      <br />
      <br />
      <label>Method/Technique/Algorithm proposed : </label>
      <input
        id="Mtap"
        name="Mtap"
        type="text"
        value={props.preferences[0].Mtap}
        onChange={e => {
          props.handleMtapChange(e, props.preferences[0].prefno);
        }}
        required
      />
      <br />
      <br />
      <label>Results Expected : </label>
      <input
        id="Red"
        name="Red"
        type="text"
        value={props.preferences[0].Red}
        onChange={e => {
          props.handleRedChange(e, props.preferences[0].prefno);
        }}
        required
      />
      <br />
      <br />
      <label>Software and Hardware requirements : </label>
      <input
        id="Shr"
        name="Shr"
        type="text"
        value={props.preferences[0].Shr}
        onChange={e => {
          props.handleShrChange(e, props.preferences[0].prefno);
        }}
        required
      />
      <br />
      <br />
      <label>IEEE / ACM / Springer Journal Paper : </label>
      <input
        id="file"
        name="file"
        type="file"
        onChange={e => {
          props.handleFileChange(e, props.preferences[0].prefno);
        }}
        required
      />
      <br />
      <br />
      <button onClick={props.handleNext}>
        Next
      </button>
    </React.Fragment>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <div className="student-container">
      {/* <form onSubmit={this.handleSubmit}> */}
      <div className="form-title">
        <h3>Preference 2</h3>
      </div>
      <label>Title of Preference : </label>
      <input
        id="Top"
        name="Top"
        type="text"
        value={props.preferences[1].Top}
        onChange={e => {
          props.handleTopChange(e, props.preferences[1].prefno);
        }}
        required
      />
      <br />
      <br />
      <label>Domain of Specialization : </label>
      <input
        id="Dos"
        name="Dos"
        type="text"
        value={props.preferences[1].Dos}
        onChange={e => {
          props.handleDosChange(e, props.preferences[1].prefno);
        }}
        required
      />
      <br />
      <br />
      <label>Detailed Statement of Problem : </label>
      <input
        id="Dsop"
        name="Dsop"
        type="text"
        value={props.preferences[1].Dsop}
        onChange={e => {
          props.handleDsopChange(e, props.preferences[1].prefno);
        }}
        required
      />
      <br />
      <br />
      <label>
        Internal agency / external agency / CTL / Mastek/or any other :{" "}
      </label>
      <input
        id="agency"
        name="agency"
        type="text"
        value={props.preferences[1].Agency}
        onChange={e => {
          props.handleAgencyChange(e, props.preferences[1].prefno);
        }}
        required
      />
      <br />
      <br />
      <label>Method/Technique/Algorithm proposed : </label>
      <input
        id="Mtap"
        name="Mtap"
        type="text"
        value={props.preferences[1].Mtap}
        onChange={e => {
          props.handleMtapChange(e, props.preferences[1].prefno);
        }}
        required
      />
      <br />
      <br />
      <label>Results Expected : </label>
      <input
        id="Red"
        name="Red"
        type="text"
        value={props.preferences[1].Red}
        onChange={e => {
          props.handleRedChange(e, props.preferences[1].prefno);
        }}
        required
      />
      <br />
      <br />
      <label>Software and Hardware requirements : </label>
      <input
        id="Shr"
        name="Shr"
        type="text"
        value={props.preferences[1].Shr}
        onChange={e => {
          props.handleShrChange(e, props.preferences[1].prefno);
        }}
        required
      />
      <br />
      <br />
      <label>IEEE / ACM / Springer Journal Paper : </label>
      <input
        id="file"
        name="file"
        type="file"
        onChange={e => {
          props.handleFileChange(e, props.preferences[1].prefno);
        }}
        required
      />
      <br />
      <br />
      <button className="btn-primary" onClick={props.handleNext}>
        Next
      </button>
    </div>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="student-container">
        {/* <form onSubmit={this.handleSubmit}> */}
        <div className="form-title">
          <h3>Preference 3</h3>
        </div>
        <label>Title of Preference : </label>
        <input
          id="Top"
          name="Top"
          type="text"
          value={props.preferences[2].Top}
          onChange={e => {
            props.handleTopChange(e, props.preferences[2].prefno);
          }}
          required
        />
        <br />
        <br />
        <label>Domain of Specialization : </label>
        <input
          id="Dos"
          name="Dos"
          type="text"
          value={props.preferences[2].Dos}
          onChange={e => {
            props.handleDosChange(e, props.preferences[2].prefno);
          }}
          required
        />
        <br />
        <br />
        <label>Detailed Statement of Problem : </label>
        <input
          id="Dsop"
          name="Dsop"
          type="text"
          value={props.preferences[2].Dsop}
          onChange={e => {
            props.handleDsopChange(e, props.preferences[2].prefno);
          }}
          required
        />
        <br />
        <br />
        <label>
          Internal agency / external agency / CTL / Mastek/or any other :{" "}
        </label>
        <input
          id="agency"
          name="agency"
          type="text"
          value={props.preferences[2].Agency}
          onChange={e => {
            props.handleAgencyChange(e, props.preferences[2].prefno);
          }}
          required
        />
        <br />
        <br />
        <label>Method/Technique/Algorithm proposed : </label>
        <input
          id="Mtap"
          name="Mtap"
          type="text"
          value={props.preferences[2].Mtap}
          onChange={e => {
            props.handleMtapChange(e, props.preferences[2].prefno);
          }}
          required
        />
        <br />
        <br />
        <label>Results Expected : </label>
        <input
          id="Red"
          name="Red"
          type="text"
          value={props.preferences[2].Red}
          onChange={e => {
            props.handleRedChange(e, props.preferences[2].prefno);
          }}
          required
        />
        <br />
        <br />
        <label>Software and Hardware requirements : </label>
        <input
          id="Shr"
          name="Shr"
          type="text"
          value={props.preferences[2].Shr}
          onChange={e => {
            props.handleShrChange(e, props.preferences[2].prefno);
          }}
          required
        />
        <label>IEEE / ACM / Springer Journal Paper : </label>
        <input
          id="file"
          name="file"
          type="file"
          onChange={e => {
            props.handleFileChange(e, props.preferences[2].prefno);
          }}
        />
        <br />
        <br />

        {/* {console.log(this.state.preferences[0])} */}

        <input type="submit" value="submit" />
      </div>
    </React.Fragment>
  );
}

export default StudentContent;
