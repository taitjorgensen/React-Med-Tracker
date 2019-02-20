import React from "react";
import firebase from "firebase";

class Patient extends React.Component {
  state = {
    route: "patients",
    data: {
      name: "",
      medications: [],
      schedule: [],
      careTaker: "",
      healthcareProvider: ""
    }
  };
  constructor(props) {
    super(props);
  }

  createNewPatient = (name, email) => {
    firebase
      .database()
      .ref(this.state.route)
      .set({
        name: name,
        email: email,
        medications: this.state.medications,
        schedule: this.state.schedule,
        careTaker: this.state.careTaker,
        healthcareProvider: this.state.healthcareProvider
      });
  };

  render() {
    return <div className="patient">{this.state.data.name}</div>;
  }
}

export default Patient;
