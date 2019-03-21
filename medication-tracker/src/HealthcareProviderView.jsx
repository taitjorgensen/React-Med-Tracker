import React from "react";
import MedicationCounters from "./MedicationCounters";
import PatientMedication from "./PatientMedication";
import AddMedication from "./components/AddMedication";

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
      name: "",
      patient: "",
      addMedication: false,
      editMedications: false,
      viewMedications: false,
      alert: { exists: true, patient: "Peter Parker" },
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
    this.handleDataChange = this.handleDataChange.bind(this);
    this.viewMedications = this.viewMedications.bind(this);
  }

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

  editMedications = () => {
    this.setState({
      editMedications: true,
      viewMedications: false,
      addMedication: false
    });
  };

  viewMedications = () => {
    this.setState({
      viewMedications: true,
      editMedications: false,
      addMedication: false
    });
  };

  addMedication = () => {
    this.setState({
      addMedication: true,
      editMedications: false,
      viewMedications: false
    });
  };

  openModal = () => {
    return true;
  };

  renderMedicationView = () => {
    if (this.state.editMedications)
      return (
        <div>
          <MedicationCounters />
        </div>
      );
    else if (this.state.viewMedications)
      return (
        <div>
          <PatientMedication />
        </div>
      );
    else if (this.state.addMedication)
      return (
        <div>
          <AddMedication openModal={this.openModal} />
        </div>
      );
    else
      return (
        <div>
          <h2>Select view</h2>
        </div>
      );
  };

  getAlerts = () => {
    if (this.state.alert.exists)
      return (
        <div>
          <h2 style={{ color: "red" }}>
            Please follow up with {this.state.alert.patient}
          </h2>
        </div>
      );
    else
      return (
        <div>
          <h3>No alerts at this time.</h3>
        </div>
      );
  };
  resetAlert = () => {
    var alert = { exists: false, patient: null };
    this.setState({ alert: alert });
  };

  handleDataChange(e) {
    let patient = this.state.patient;
    patient = e.target.value.name;
    this.setState({ patient });
  }

  render() {
    console.log(this.state.alert);
    // this.retrievePatients();
    if (this.state.patient === "" && this.state.patients !== null)
      return (
        <React.Fragment>
          <div className="main">
            <h2>Patient alerts: {this.getAlerts()}</h2>
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
            <h2>Patient alerts: {this.getAlerts()}</h2>
            <button
              className="btn btn-warning btn-md m-2"
              onClick={this.resetAlert}
            >
              Reset Alert
            </button>
            <h2>{this.state.patient}</h2>
            <br />
            <button
              className="btn btn-primary btn-md m-2"
              onClick={this.viewMedications}
            >
              View Patient Medications
            </button>
            <span>{"  "}</span>
            <button
              className="btn btn-primary btn-md m-2"
              onClick={this.editMedications}
            >
              Edit Medication Schedule
            </button>
            <button
              className="btn btn-primary btn-md m-2"
              onClick={this.addMedication}
            >
              Add Medication
            </button>
            <br />
            {this.renderMedicationView()}
          </div>
        </React.Fragment>
      );
  }
}

export default HealthcareProvider;
