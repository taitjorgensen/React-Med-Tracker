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
      { _id: 1, value: "7:00 AM", counter: 5 },
      { _id: 2, value: "10:00 AM", counter: 5 },
      { _id: 3, value: "1:00 PM", counter: 5 },
      { _id: 4, value: "4:00 PM", counter: 5 },
      { _id: 5, value: "7:00 PM", counter: 3 }
    ],
    counters7: [
      {
        id: 1,
        quantity: 2,
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
        quantity: 1,
        name: "Neuro Inhibitor",
        dosage: "200 mg",
        image: "./images/neuro.jpg",
        time: ""
      }
    ],
    route: "medications",
    data: { name: "", dosage: "", quantity: "", image: "", time: "" },
    timeSelection: null,
    medicationTaken: false,
    issueSendAlert: false,
    errors: {},
    totalCounters: null
  };

  constructor(props) {
    super(props);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
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
    console.log(e.target.value);
    this.setState({ data });
  }

  handleTimeChange(e) {
    let time = this.state.timeSelection;
    let counter = this.state.totalCounters;
    time = e.target.value;
    counter = e.target.counter;
    this.setState({ timeSelection: time, totalCounters: counter });
  }

  render() {
    // const totalCounters = this.state.counters.filter(c => c.quantity > 0)
    //   .length;
    if (this.state.issueSendAlert)
      return (
        <div>
          <h1>Alert sent to your HealthCare Provider and Care Taker.</h1>
          <p>
            Please contact your Care Provider if you need immediate assistance.
          </p>
        </div>
      );
    else if (this.state.medicationTaken)
      return (
        <div>
          <h2>You are up to date on your medications.</h2>
          <p>
            To view another time, please click the button below and you will be
            able to select the time you wish to view.
          </p>
          <button
            className="btn btn-primary"
            onClick={this.handleReset}
            style={{ fontSize: "30px" }}
          >
            Select New Time
          </button>
        </div>
      );
    else if (this.state.timeSelection === null)
      return (
        <div>
          <span>
            <h2>Select which time option to view medications to take:</h2>
            <form className="col col-2" onChange={this.handleTimeChange}>
              <select
                name="timeSelection"
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
            </form>
          </span>

          <span />
        </div>
      );
    else
      return (
        <div>
          <form className="col col-2" onChange={this.handleTimeChange}>
            <select
              name="timeSelection"
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
          </form>
          <span
            className="fas fa-prescription-bottle-alt"
            style={{ fontSize: "50px" }}
          />
          <span style={{ fontSize: "50px" }}>
            {" "}
            Medications to Take at {this.state.timeSelection}:{" "}
          </span>
          <span
            className="badge badge-pill badge-primary"
            style={{ fontSize: "30px" }}
          >
            {this.state.totalCounters}
          </span>
          <span style={{ padding: "20px" }}>{"  "}</span>

          <div>{this.listMedications()}</div>
          <button
            className="btn btn-success"
            onClick={this.handleComplete}
            style={{ fontSize: "30px", margin: "20px" }}
          >
            Complete
          </button>
          {"          "}
          <button
            className="btn btn-danger"
            onClick={this.handleIssue}
            style={{ fontSize: "30px", margin: "20px" }}
          >
            Issue
          </button>
        </div>
      );
  }

  listMedications = () => {
    if (this.state.timeSelection !== "7:00 PM")
      return this.state.counters.map(counter => {
        return (
          <div className="container" style={{ marginTop: "40px" }}>
            <tr>
              <td>
                <span key={counter.id}>
                  <img
                    src={require(`${counter.image}`)}
                    alt="medication"
                    height="60"
                    width="60"
                  />
                  <h2
                    className="badge badge-info"
                    style={{
                      borderRadius: "50%",
                      fontSize: "24px",
                      margin: "20px"
                    }}
                  >
                    {counter.quantity}
                  </h2>
                </span>
              </td>
              <td>
                <h2>{counter.name}</h2>
              </td>
              <td>
                <h2 style={{ margin: "20px" }}>{counter.dosage}</h2>
              </td>
            </tr>
          </div>
        );
      });
    else
      return this.state.counters7.map(counter => {
        return (
          <div className="container" style={{ marginTop: "40px" }}>
            <tr>
              <td>
                <span key={counter.id}>
                  <img
                    src={require(`${counter.image}`)}
                    alt="medication"
                    height="60"
                    width="60"
                  />
                  <h2
                    className="badge badge-info"
                    style={{
                      borderRadius: "50%",
                      fontSize: "24px",
                      margin: "20px"
                    }}
                  >
                    {counter.quantity}
                  </h2>
                </span>
              </td>
              <td>
                <h2>{counter.name}</h2>
              </td>
              <td>
                <h2 style={{ margin: "20px" }}>{counter.dosage}</h2>
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

  handleReset() {
    this.setState({ medicationTaken: false });
  }

  handleIssue = () => {
    this.setState({ issueSendAlert: true });
    this.props.issueAlert(true);
  };

  handleComplete = () => {
    this.setState({ medicationTaken: true });
  };
}

export default Medications;
