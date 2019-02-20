import React from "react";
import Medication from "./Medication";
import firebase from "firebase";

class HealthcareProvider extends React.Component {
  state = {
    route: "patients",
    patients: [],
    patientsPopulated: false
  };
  constructor(props) {
    super(props);
    let database = firebase.database();
    var childData;
    database.ref(this.state.route).once("value", snapshot => {
      var userPatients = [];
      let i = 0;
      snapshot.forEach(function(childSnapshot) {
        childData = {
          key: i,
          value: childSnapshot.val()
        };
        userPatients.push(childData);
        i++;
      });
      this.setState({ patients: userPatients });
      this.setState({ patientsPopulated: true });
    });
  }

  renderPatients() {
    const patients = this.state.patients;
    let i = 0;
    this.state.patients.forEach(function(patient) {
      const childData = {
        key: i,
        value: patient.value.name,
        name: patient.value.name,
        medications: patient.value.medications,
        schedule: patient.value.schedule
      };
      patients.push(childData);
      i++;
    });
    return patients.map(patient => {
      return <div key={patient.key}>{patient.name}</div>;
    });
  }

  render() {
    return (
      <div className="main">
        <h2>Healthcare Provider view...</h2>

        {this.renderPatients()}
        <br />
        <Medication />
      </div>
    );
  }
}

export default HealthcareProvider;
