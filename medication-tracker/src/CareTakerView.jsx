import React from "react";
import Medication from "./Medication";

class CareTaker extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <h2>Care Taker View...</h2>
        <Medication />
      </div>
    );
  }
}

export default CareTaker;
