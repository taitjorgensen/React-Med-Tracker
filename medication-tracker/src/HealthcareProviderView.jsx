import React from "react";
import firebase from "firebase";
import MedicationCounters from "./MedicationCounters";

class HealthcareProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: "patients",
      patients: [],
      patientsPopulated: false,
      name: "Steven Strange",
      patient: ""
    };
    this.renderPatients = this.renderPatients.bind(this);
    this.selectMedicationView = this.selectMedicationView.bind(this);
    this.viewMedications = this.viewMedications.bind(this);
  }

  retrievePatients = () => {
    let database = firebase.database();
    var childData;
    var route = this.state.route;
    database.ref(route).once("value", snapshot => {
      var userPatients = [];
      let i = 0;
      snapshot.forEach(function(childSnapshot) {
        childData = {
          key: i,
          value: childSnapshot.val()
        };
        if (childData.healthcareProvider === this.state.name)
          userPatients.push(childData) && i++;
        else i++;
      });
      this.setState({ patients: userPatients, patientsPopulated: true });
    });
  };

  renderPatients() {
    let patientHtml = this.state.patients.map(patient => {
      return (
        <option key={patient.name} value={patient}>
          {patient.name}
        </option>
      );
    });
    return patientHtml;
  }

  selectMedicationView() {
    return <MedicationCounters />;
  }

  viewMedications() {
    return this.state.medications.map(medication => {
      return <div key={medication.key}>{medication.name}</div>;
    });
  }

  handleDataChange(e) {
    let patient = this.state.patient;
    patient[e.target.name] = e.target.value;
    this.setState({ patient });
    this.viewMedications();
  }

  render() {
    this.retrievePatients();
    if (this.state.patients !== null)
      return (
        <React.Fragment>
          <div className="main">
            <h2>Healthcare Provider view...</h2>
            <div className="select patient" onChange={this.handleDataChange}>
              <select
                name="patient"
                id="patient"
                className="form-control"
                style={{ marginTop: 5 }}
                onChange={this.handleDataChange}
                value={this.input}
              >
                <option value="" />
                {this.renderPatients()}
              </select>
            </div>
            <br />
            <button
              className="btn btn-primary btn-md m-2"
              onClick={e => this.viewMedications.bind(e)}
            >
              View Patient Medications
            </button>
            <span>{"  "}</span>
            <button
              className="btn btn-primary btn-md m-2"
              onClick={e => this.selectMedicationView.bind(e)}
            >
              Edit Medication Schedule
            </button>
            {this.viewMedications()}
            {/* <Medication /> */}
          </div>
        </React.Fragment>
      );
    return <div className="loading">Patient List is Loading...</div>;
  }
}

export default HealthcareProvider;
