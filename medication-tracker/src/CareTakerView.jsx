import React from "react";
import MedicationCounters from "./MedicationCounters";
import PatientMedication from "./PatientMedication";

class CareTaker extends React.Component {
  state = {
    alert: { exists: true, patient: "Peter Parker" },
    viewMedications: false,
    editMedications: false,
    patient: "Peter Parker"
  };

  editMedications = () => {
    this.setState({ editMedications: true, viewMedications: false });
  };

  viewMedications = () => {
    this.setState({ viewMedications: true, editMedications: false });
  };

  resetAlert = () => {
    var alert = { exists: false, patient: null };
    this.setState({ alert: alert });
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
    else return <div>Select view</div>;
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

  render() {
    return (
      <div>
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
            <br />
            {this.renderMedicationView()}
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default CareTaker;
