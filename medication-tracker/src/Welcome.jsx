import React from "react";

class Welcome extends React.Component {
  state = {};
  render() {
    return (
      <center>
        <div className="col col-8">
          <h1>Welcome to MyRx</h1>
          <h3>
            Medication tracking to provide a safer daily patient experience.
          </h3>
          <br />
          <p>
            Everyday, millions of people take medications, vitamins, and
            supplements to help improve and maintain their health.
          </p>
          <p>
            For some, that process alone can be a difficult task. MyRx is a way
            to help track those medications throughout the day and ensure proper
            dosing, while giving peace of mind to patients, healthcare
            providers, and care takers alike.
          </p>
        </div>
      </center>
    );
  }
}

export default Welcome;
