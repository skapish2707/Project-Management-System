import React, { Component } from "react";
import "./UserDetails.css";

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
          Shr: ""
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
          Shr: ""
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
          Shr: ""
        }
      ],
      currentStep: 1
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
        //let pref=[...prefs[i]];
        prefs[i].selectedFile = e.target.value[0];
        // prefs[i]=pref;
        this.setState({ preferences: prefs });
      }
    }
    //console.log(this.state.preferences)
  };

  handleClick = (e, pn) => {
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
    console.log(this.state.preferences);
  };

  handleSubmit = e => {
    e.preventDefault();

    alert("Submitted");
    console.log(this.state.preferences);
  };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   const { email, department, name, roll, seat, file } = this.state;
  //   alert(`Your registration detail: \n
  //          Email: ${email} \n
  //          Department: ${department} \n
  //          name: ${name} \n
  //          roll: ${roll} \n
  //          seat: ${seat} \n
  //          file:${file} \n
  //          `);
  // };

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });
    this.handleClick();
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

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 3) {
      return (
        <button className="btn-primary" type="button" onClick={this._next}>
          Next
        </button>
      );
    }
    return null;
  }

  render() {
    return (
      <React.Fragment>
        <h1>Project Title</h1>
        <p>Step {this.state.currentStep}</p>

        <form onSubmit={this.handleSubmit} className="form-group">
          {/* 
      render the form steps and pass required props in
    */}
          <Step1
            currentStep={this.state.currentStep}
            preferences={this.state.preferences}
            handleTopChange={this.handleTopChange}
            handleDosChange={this.handleDosChange}
            handleDsopChange={this.handleDsopChange}
            handleAgencyChange={this.handleAgencyChange}
            handleClick={this.handleClick}
            handleFileChange={this.handleFileChange}
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
            handleFileChange={this.handleFileChange}
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
            handleFileChange={this.handleFileChange}
            handleMtapChange={this.handleMtapChange}
            handleRedChange={this.handleRedChange}
            handleShrChange={this.handleShrChange}
          />
          {this.previousButton()}
          {this.nextButton()}
        </form>
      </React.Fragment>
    );
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <div className="student-container">
      {/* <form onSubmit={this.handleSubmit}> */}
      <div className="form-title">
        <h3>Preference 1</h3>
      </div>
      <label>Top : </label>
      <br />
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
      <label>Dos : </label>
      <br />
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
      <label>Dsop : </label>
      <br />
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
      <label>Agency : </label>
      <br />
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
      <label>Mtap : </label>
      <br />
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
      <label>Red : </label>
      <br />
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
      <label>Shr : </label>
      <br />
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
      <label>File : </label>
      <br />

      <br />
      <br />
      {/* {console.log(this.state.preferences[0])} */}

      <button
      // onSubmit={e => {
      //   this.handleClick(e, this.state.preferences[0].prefno);
      // }}
      >
        Done
      </button>
    </div>
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
        <h3>Preference 1</h3>
      </div>
      <label>Top : </label>
      <br />
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
      <label>Dos : </label>
      <br />
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
      <label>Dsop : </label>
      <br />
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
      <label>Agency : </label>
      <br />
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
      <label>Mtap : </label>
      <br />
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
      <label>Red : </label>
      <br />
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
      <label>Shr : </label>
      <br />
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
      <label>File : </label>
      <br />

      <br />
      <br />
      {/* {console.log(this.state.preferences[0])} */}

      <button
      // onSubmit={e => {
      //   this.handleClick(e, this.state.preferences[0].prefno);
      // }}
      >
        Done
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
        <label>Top : </label>
        <br />
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
        <label>Dos : </label>
        <br />
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
        <label>Dsop : </label>
        <br />
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
        <label>Agency : </label>
        <br />
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
        <label>Mtap : </label>
        <br />
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
        <label>Red : </label>
        <br />
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
        <label>Shr : </label>
        <br />
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
        <br />
        <br />
        <label>File : </label>
        <br />

        <br />
        <br />
        {/* {console.log(this.state.preferences[0])} */}

        <button
        // onSubmit={e => {
        //   this.handleClick(e, this.state.preferences[0].prefno);
        // }}
        >
          Done
        </button>
        <input type="submit" value="submit" />
      </div>
    </React.Fragment>
  );
}

export default StudentContent;
