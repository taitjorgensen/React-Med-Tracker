import React from "react";

import Medications from "./Medications";

class Patient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false
    };
  }
  issueAlert = alert => {
    this.setState({ alert: alert });
    this.props.sendAlert(true);
  };

  render() {
    return (
      <div>
        {/* <h2>{this.props.user.name}'s</h2> */}
        <Medications issueAlert={this.issueAlert} />
        {/* <PatientMedications /> */}
        {/* <MedicationCounters /> */}
      </div>
    );
  }
}

export default Patient;
