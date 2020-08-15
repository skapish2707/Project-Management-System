import React, { Component } from "react";
import "./UserDetails.css";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

class Preferences extends Component {
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
      ]
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
        //let pref=[...prefs[i]];
        prefs[i].selectedFile = e.target.value[0];
        // prefs[i]=pref;
        this.setState({ preferences: prefs });
      }
    }
    //console.log(this.state.preferences)
  };

  handleClick = (e, pn) => {
    e.preventDefault();
    let prefs = [...this.state.preferences];
    for (var i = 0; i < 3; i++) {
      if (i === pn - 1) {
        //let pref=[...prefs[i]];
        prefs[i].filled = true;
        // prefs[i]=pref;
        this.setState({ preferences: prefs });
      }
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    for (var i = 0; i < 3; i++) {
      if (this.state.preferences[i].filled === false) {
        alert("Please fill all preferences completely");
        break;
      } else {
        alert("Submitted");
        console.log(this.state.preferences);
        break;
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Project Preferences</h1>
        <br />
        <Tabs>
          <TabList>
            <Tab>First</Tab>
            <Tab>Second</Tab>
            <Tab>Third</Tab>
          </TabList>
          <div className="student-container">
            <form onSubmit={this.handleSubmit}>
              <TabPanel>
                <div className="form-title">
                  <h3>Preference 1</h3>
                </div>
                <label>Top : </label>
                <br />
                <input
                  id="Top"
                  name="Top"
                  type="text"
                  value={this.state.preferences[0].Top}
                  onChange={e => {
                    this.handleTopChange(e, this.state.preferences[0].prefno);
                  }}
                  required
                />
                <br />
                <br />
                <label>Dos : </label>
                <br />
                <input
                  id="Dos"
                  name="Dos"
                  type="text"
                  value={this.state.preferences[0].Dos}
                  onChange={e => {
                    this.handleDosChange(e, this.state.preferences[0].prefno);
                  }}
                  required
                />
                <br />
                <br />
                <label>Dsop : </label>
                <br />
                <input
                  id="Dsop"
                  name="Dsop"
                  type="text"
                  value={this.state.preferences[0].Dsop}
                  onChange={e => {
                    this.handleDsopChange(e, this.state.preferences[0].prefno);
                  }}
                  required
                />
                <br />
                <br />
                <label>Agency : </label>
                <br />
                <input
                  id="agency"
                  name="agency"
                  type="text"
                  value={this.state.preferences[0].Agency}
                  onChange={e => {
                    this.handleAgencyChange(
                      e,
                      this.state.preferences[0].prefno
                    );
                  }}
                  required
                />
                <br />
                <br />
                <label>Mtap : </label>
                <br />
                <input
                  id="Mtap"
                  name="Mtap"
                  type="text"
                  value={this.state.preferences[0].Mtap}
                  onChange={e => {
                    this.handleMtapChange(e, this.state.preferences[0].prefno);
                  }}
                  required
                />
                <br />
                <br />
                <label>Red : </label>
                <br />
                <input
                  id="Red"
                  name="Red"
                  type="text"
                  value={this.state.preferences[0].Red}
                  onChange={e => {
                    this.handleRedChange(e, this.state.preferences[0].prefno);
                  }}
                  required
                />
                <br />
                <br />
                <label>Shr : </label>
                <br />
                <input
                  id="Shr"
                  name="Shr"
                  type="text"
                  value={this.state.preferences[0].Shr}
                  onChange={e => {
                    this.handleShrChange(e, this.state.preferences[0].prefno);
                  }}
                  required
                />
                <br />
                <br />
                <label>File : </label>
                <br />
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={e => {
                    this.handleFileChange(e, this.state.preferences[0].prefno);
                  }}
                  required
                />
                <br />
                <br />
                {/* {console.log(this.state.preferences[0])} */}

                <button
                  onSubmit={e => {
                    this.handleClick(e, this.state.preferences[0].prefno);
                  }}
                >
                  Done
                </button>
              </TabPanel>
              <TabPanel>
                <div className="form-title">
                  <h3>Preference 2</h3>
                </div>
                <label>Top : </label>
                <br />
                <input
                  id="Top"
                  name="Top"
                  type="text"
                  value={this.state.preferences[1].Top}
                  onChange={e => {
                    this.handleTopChange(e, this.state.preferences[1].prefno);
                  }}
                  required
                />
                <br />
                <br />
                <label>Dos : </label>
                <br />
                <input
                  id="Dos"
                  name="Dos"
                  type="text"
                  value={this.state.preferences[1].Dos}
                  onChange={e => {
                    this.handleDosChange(e, this.state.preferences[1].prefno);
                  }}
                  required
                />
                <br />
                <br />
                <label>Dsop : </label>
                <br />
                <input
                  id="Dsop"
                  name="Dsop"
                  type="text"
                  value={this.state.preferences[1].Dsop}
                  onChange={e => {
                    this.handleDsopChange(e, this.state.preferences[1].prefno);
                  }}
                  required
                />
                <br />
                <br />
                <label>Agency : </label>
                <br />
                <input
                  id="agency"
                  name="agency"
                  type="text"
                  value={this.state.preferences[1].Agency}
                  onChange={e => {
                    this.handleAgencyChange(
                      e,
                      this.state.preferences[1].prefno
                    );
                  }}
                  required
                />
                <br />
                <br />
                <label>Mtap : </label>
                <br />
                <input
                  id="Mtap"
                  name="Mtap"
                  type="text"
                  value={this.state.preferences[1].Mtap}
                  onChange={e => {
                    this.handleMtapChange(e, this.state.preferences[1].prefno);
                  }}
                  required
                />
                <br />
                <br />
                <label>Red : </label>
                <br />
                <input
                  id="Red"
                  name="Red"
                  type="text"
                  value={this.state.preferences[1].Red}
                  onChange={e => {
                    this.handleRedChange(e, this.state.preferences[1].prefno);
                  }}
                  required
                />
                <br />
                <br />
                <label>Shr : </label>
                <br />
                <input
                  id="Shr"
                  name="Shr"
                  type="text"
                  value={this.state.preferences[1].Shr}
                  onChange={e => {
                    this.handleShrChange(e, this.state.preferences[1].prefno);
                  }}
                  required
                />
                <br />
                <br />
                <label>File : </label>
                <br />
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={e => {
                    this.handleFileChange(e, this.state.preferences[1].prefno);
                  }}
                  required
                />
                <br />
                <br />
                {/* {console.log(this.state.preferences[0])} */}

                <button
                  onSubmit={e => {
                    this.handleClick(e, this.state.preferences[1].prefno);
                  }}
                >
                  Done
                </button>
              </TabPanel>
              <TabPanel>
                <div className="form-container">
                  <div className="form-title">
                    <h3>Preference 3</h3>
                  </div>
                  <label>Top : </label>
                  <br />
                  <input
                    id="Top"
                    name="Top"
                    type="text"
                    value={this.state.preferences[2].Top}
                    onChange={e => {
                      this.handleTopChange(e, this.state.preferences[2].prefno);
                    }}
                    required
                  />
                  <br />
                  <br />
                  <label>Dos : </label>
                  <br />
                  <input
                    id="Dos"
                    name="Dos"
                    type="text"
                    value={this.state.preferences[2].Dos}
                    onChange={e => {
                      this.handleDosChange(e, this.state.preferences[2].prefno);
                    }}
                    required
                  />
                  <br />
                  <br />
                  <label>Dsop : </label>
                  <br />
                  <input
                    className="form-control"
                    id="Dsop"
                    name="Dsop"
                    type="text"
                    value={this.state.preferences[2].Dsop}
                    onChange={e => {
                      this.handleDsopChange(
                        e,
                        this.state.preferences[2].prefno
                      );
                    }}
                    required
                  />
                  <br />
                  <br />
                  <label>Agency : </label>
                  <br />
                  <input
                    id="agency"
                    name="agency"
                    type="text"
                    value={this.state.preferences[2].Agency}
                    onChange={e => {
                      this.handleAgencyChange(
                        e,
                        this.state.preferences[2].prefno
                      );
                    }}
                    required
                  />
                  <br />
                  <br />
                  <label>Mtap : </label>
                  <br />
                  <input
                    className="form-control"
                    id="Mtap"
                    name="Mtap"
                    type="text"
                    value={this.state.preferences[2].Mtap}
                    onChange={e => {
                      this.handleMtapChange(
                        e,
                        this.state.preferences[2].prefno
                      );
                    }}
                    required
                  />
                  <br />
                  <br />
                  <label>Red : </label>
                  <br />
                  <input
                    className="form-control"
                    id="Red"
                    name="Red"
                    type="text"
                    value={this.state.preferences[2].Red}
                    onChange={e => {
                      this.handleRedChange(e, this.state.preferences[2].prefno);
                    }}
                    required
                  />
                  <br />
                  <br />
                  <label>Shr : </label>
                  <br />
                  <input
                    className="form-control"
                    id="Shr"
                    name="Shr"
                    type="text"
                    value={this.state.preferences[2].Shr}
                    onChange={e => {
                      this.handleShrChange(e, this.state.preferences[2].prefno);
                    }}
                    required
                  />
                  <br />
                  <br />
                  <label>File : </label>
                  <br />
                  <input
                    className="form-control"
                    id="file"
                    name="file"
                    type="file"
                    onChange={e => {
                      this.handleFileChange(
                        e,
                        this.state.preferences[2].prefno
                      );
                    }}
                    required
                  />
                  <br />
                  <br />
                  {/* {console.log(this.state.preferences[0])} */}
                </div>
                <button
                  className="btn-secondary"
                  onSubmit={e => {
                    this.handleClick(e, this.state.preferences[2].prefno);
                  }}
                >
                  Done
                </button>
              </TabPanel>
              <input type="submit" value="submit" />
            </form>
          </div>
        </Tabs>
      </React.Fragment>
    );
  }
}

export default Preferences;
