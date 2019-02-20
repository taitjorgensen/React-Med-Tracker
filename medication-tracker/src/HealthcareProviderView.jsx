import React from "react";
import Medication from "./Medication";

class HealthcareProvider extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <h2>Healthcare Provider view...</h2>
        <Medication />
      </div>
    );
  }
}

export default HealthcareProvider;
