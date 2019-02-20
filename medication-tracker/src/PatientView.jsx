import React from "react";
import PatientMedications from "./PatientMedications";

class Patient extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <h2>Patient View</h2>
        <PatientMedications />
      </div>
    );
  }
}

export default Patient;
