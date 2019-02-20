import React from "react";
import firebase from "firebase";

class Patient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: "patients",
      data: {
        name: "",
        medications: [],
        schedule: [],
        careTaker: "",
        healthcareProvider: ""
      }
    };
  }

  createNewPatient = (name, email) => {
    console.log(name, email);
    firebase
      .database()
      .ref(this.state.route)
      .push()
      .set({
        name: name,
        email: email,
        medications: this.state.data.medications,
        schedule: this.state.data.schedule,
        careTaker: this.state.data.careTaker,
        healthcareProvider: this.state.data.healthcareProvider
      });
  };

  render() {
    return <div className="patient">{this.state.data.name}</div>;
  }
}
const patient = new Patient();
export default patient;
