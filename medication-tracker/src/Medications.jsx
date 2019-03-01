import React, { Component } from "react";

class Medications extends Component {
  state = {
    counters: [
      {
        id: 1,
        quantity: 1,
        name: "Yellow Tablet",
        dosage: "50 mg",
        image: "./images/yellow.jpg",
        time: ""
      },
      {
        id: 2,
        quantity: 1,
        name: "Heart Medication",
        dosage: "100 mg",
        image: "./images/heart.jpg",
        time: ""
      },
      {
        id: 3,
        quantity: 2,
        name: "Neuro Inhibitor",
        dosage: "200 mg",
        image: "./images/neuro.jpg",
        time: ""
      },
      {
        id: 4,
        quantity: 3,
        name: "Vitamin b12",
        dosage: "250 mg",
        image: "./images/b12.jpg",
        time: ""
      },
      {
        id: 5,
        quantity: 1,
        name: "Lipitor",
        dosage: "20 mg",
        image: "./images/lipitor.jpg",
        time: ""
      }
    ],
    timeForMeds: [
      { _id: 1, value: "7:00 AM" },
      { _id: 2, value: "10:00 AM" },
      { _id: 3, value: "1:00 PM" },
      { _id: 4, value: "4:00 PM" },
      { _id: 5, value: "7:00 PM" }
    ],
    route: "medications",
    data: { name: "", dosage: "", quantity: "", image: "", time: "" },
    medicationTaken: false,
    issueSendAlert: false,
    errors: {}
  };

  constructor(props) {
    super(props);
    this.handleDataChange = this.handleDataChange.bind(this);
  }

  handleChange = event => {
    const errors = { ...this.state.errors };
    const input = event.target.value;
    console.log("Input  " + input);
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    let data = { ...this.state.data };
    data = input.value;
    this.setState({ data });
  };

  handleDataChange(e) {
    let data = this.state.data;
    data[e.target.name] = e.target.value;
    this.setState({ data });
  }

  render() {
    const totalCounters = this.state.counters.filter(c => c.quantity > 0)
      .length;

    return (
      <React.Fragment>
        <div>
          <span>
            <span
              className="fas fa-prescription-bottle-alt"
              style={{ fontSize: "50px" }}
            />
            <span style={{ fontSize: "50px" }}> Medications to Take: </span>
            <span
              className="badge badge-pill badge-primary"
              style={{ fontSize: "30px" }}
            >
              {totalCounters}
            </span>
            <span style={{ padding: "20px" }}>{"  "}</span>
            <button
              className="btn btn-primary"
              onClick={this.handleSubmit}
              style={{ fontSize: "30px" }}
            >
              Complete
            </button>
            {"   "}
            <button
              className="btn btn-danger"
              onClick={this.handleIssue}
              style={{ fontSize: "30px" }}
            >
              Issue
            </button>
            <div className="col col-2">
              <select
                name="timeToTake"
                id="timeToTake"
                className="form-control"
                style={{ fontSize: "20px" }}
                onChange={this.handleDataChange}
                value={this.input}
              >
                <option value="" />
                {this.state.timeForMeds.map(time => (
                  <option key={time.key} value={time.value}>
                    {time.value}
                  </option>
                ))}
              </select>
            </div>
          </span>
          <div className="container">{this.listMedications()}</div>
          <span />
        </div>
      </React.Fragment>
    );
  }

  listMedications = () => {
    return this.state.counters.map(counter => {
      return (
        <div className="container" style={{ marginTop: "40px" }}>
          <tr>
            <td>
              <span key={counter.id}>
                <h2>
                  <span />
                  <img
                    src={require(`${counter.image}`)}
                    alt="medication"
                    height="50"
                    width="50"
                  />
                  {counter.name}
                </h2>
              </span>
            </td>
            <td>
              <span className="btn btn-md m-2">
                <h2>{counter.quantity}</h2>
              </span>
            </td>
            <td>
              <span className="btn btn-md m-2">
                <h2>{counter.dosage}</h2>
              </span>
            </td>
          </tr>
        </div>
      );
    });
  };

  medicationTime = () => {
    return this.state.timeForMeds.map(time => {
      return (
        <div>
          <option value="" />
          <option key={time.key} value={time.value}>
            {time.value}
          </option>
        </div>
      );
    });
  };

  handleIssue = () => {
    this.setState({ issueSendAlert: true });
  };

  handleSubmit = () => {
    this.setState({ medicationTaken: true });
  };
}

export default Medications;
