import React from "react";
import firebase from "firebase";
import MedicationCounters from "./MedicationCounters";

class HealthcareProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: "patients",
      patients: [
        { key: "PeterParker", name: "Peter Parker" },
        { key: "PeterQuill", name: "Peter Quill" }
      ],
      patientsPopulated: false,
      name: "Steven Strange",
      patient: "",
      medications: [
        {
          id: 1,
          quantity: 0,
          name: "Yellow Tablet",
          dosage: "50 mg",
          image: "./images/yellow.jpg",
          time: ""
        },
        {
          id: 2,
          quantity: 0,
          name: "Heart Medication",
          dosage: "100 mg",
          image: "./images/heart.jpg",
          time: ""
        },
        {
          id: 3,
          quantity: 0,
          name: "Neuro Inhibitor",
          dosage: "200 mg",
          image: "./images/neuro.jpg",
          time: ""
        },
        {
          id: 4,
          quantity: 0,
          name: "Vitamin b12",
          dosage: "250 mg",
          image: "./images/b12.jpg",
          time: ""
        },
        {
          id: 5,
          quantity: 0,
          name: "Lipitor",
          dosage: "20 mg",
          image: "./images/lipitor.jpg",
          time: ""
        }
      ]
    };
    this.renderPatients = this.renderPatients.bind(this);
    this.selectMedicationView = this.selectMedicationView.bind(this);
    this.viewMedications = this.viewMedications.bind(this);
  }

  // retrievePatients = () => {
  // componentWillMount() {
  //   let database = firebase.database();
  //   var childData;
  //   var route = this.state.route;
  //   database.ref(route).once("value", snapshot => {
  //     var userPatients = [];
  //     let i = 0;
  //     snapshot.forEach(function(childSnapshot) {
  //       childData = {
  //         key: i,
  //         value: childSnapshot.val()
  //       };
  //       if (childData.healthcareProvider === this.state.name)
  //         userPatients.push(childData) && i++;
  //       else i++;
  //     });
  //     this.setState({ patients: userPatients, patientsPopulated: true });
  //   });
  // }

  renderPatients() {
    let patientHtml = this.state.patients.map(patient => {
      return (
        <option key={patient.key} value={patient}>
          {patient.name}
        </option>
      );
    });
    return patientHtml;
  }

  selectMedicationView() {
    return <MedicationCounters />;
  }

  viewMedications = () => {
    return this.state.medications.map(medication => {
      return (
        <ul>
          <div key={medication.id}>
            <img
              src={medication.image}
              alt="medication"
              height="50px"
              width="50px"
            />{" "}
            {"  "} {medication.name} {"  "} {medication.dosage}
          </div>
        </ul>
      );
    });
  };

  handleDataChange(e) {
    let patient = this.state.patient;
    patient = e.target.value.name;
    this.setState({ patient });
  }

  render() {
    console.log(this.state.patient);
    // this.retrievePatients();
    if (this.state.patient === "" && this.state.patients !== null)
      return (
        <React.Fragment>
          <div className="main">
            <h2>Healthcare Provider view...</h2>
            <form className="select patient" onChange={this.handleDataChange}>
              <select
                name="patient"
                id="patient"
                className="form-control"
                style={{ marginTop: 5 }}
                onChange={this.handleDataChange.bind(this)}
                value={this.input}
              >
                <option value="" />

                {this.renderPatients()}
              </select>
            </form>
            <br />
            {/* <Medication /> */}
          </div>
        </React.Fragment>
      );
    else if (this.state.patient === "")
      return <div className="loading">Patient List is Loading...</div>;
    else
      return (
        <React.Fragment>
          <div>
            <h2>{this.state.patient}</h2>
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
            <br />
            {this.viewMedications()}
          </div>
        </React.Fragment>
      );
  }
}

export default HealthcareProvider;
