import React from "react";
import PatientMedications from "./PatientMedications";
import MedicationCounters from "./MedicationCounters";

class Patient extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <h2>Patient View</h2>
        <MedicationCounters />
        {/* <PatientMedications /> */}
      </div>
    );
  }
}

export default Patient;
