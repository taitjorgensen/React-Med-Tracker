import React from "react";

import Medications from "./Medications";

class Patient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {/* <h2>{this.props.user.name}'s</h2> */}
        <Medications />
        {/* <PatientMedications /> */}
        {/* <MedicationCounters /> */}
      </div>
    );
  }
}

export default Patient;
