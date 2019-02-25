import React from "react";
import firebase from "firebase";
import Image from "react-bootstrap/Image";
import Counters from "./Counters";

class Medication extends React.Component {
  // state = {
  //   route: "medications",
  //   data: { name: "", dosage: "", image: "" },
  //   medications: [{}],
  //   patientMedications: [],
  //   medicationPopulated: false,
  //   patient: ""
  // };

  constructor(props) {
    super(props);
    this.state = {
      route: "medications",
      data: { name: "", dosage: "", image: "" },
      medications: [],
      patientMedications: [],
      medicationPopulated: false,
      patient: ""
    };
    let database = firebase.database();

    var childData;
    database.ref("medications").once("value", snapshot => {
      var medicationOptions = [];
      let i = 0;
      snapshot.forEach(function(childSnapshot) {
        childData = {
          key: i,
          value: childSnapshot.val()
        };
        medicationOptions.push(childData);
        i++;
      });
      this.setState({ medications: medicationOptions });
      this.setState({ medicationPopulated: true });
      console.log(this.state.medications);
    });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
  }

  awaitMedications() {
    if (this.state.medicationPopulated === true)
      return this.renderSelect(
        "medications",
        "Select Medication",
        this.state.medications
      );
    else return <div>Loading</div>;
  }

  handleDataChange(e) {
    let data = this.state.data;
    data[e.target.name] = e.target.value.name;
    this.setState({ data });
    console.log(this.state.data);
  }

  handleUpdate = async medication => {
    await firebase
      .database()
      .ref(this.state.route + "/" + medication.id, medication);
    const medications = [...this.state.medications];
    const index = medications.indexOf(medication);
    medications[index] = { ...medication };
    this.setState({ medications });
  };

  handleSubmit = event => {
    event.preventDefault();
    var newMedication = {};
    newMedication = event.target.value;
    this.setState({ data: newMedication });
    this.state.patientMedications.push(this.state.data);

    console.log(this.state.patientMedications);
  };

  renderSelect(name, label, options) {
    const medications = this.state.medications;

    if (medications)
      return (
        <div className="form-group">
          <center>
            <label className="col col-4">{label}</label>
          </center>
          <select
            name={name}
            id={name}
            className="form-control"
            style={{ marginTop: 5 }}
            onChange={this.handleDataChange}
            value={this.input}
          >
            <option value="" />
            {options.map(option => (
              <React.Fragment>
                <option key={option.key} value={option.value}>
                  {
                    <Image
                      src={option.value.image}
                      alt="medication"
                      height="50px"
                      width="50px"
                    />
                  }{" "}
                  {option.value.name} {"  "} {option.value.dosage}
                </option>
                {
                  <img
                    className="thumbnail-image"
                    src={option.value.image}
                    alt="medication"
                    height="30px"
                    width="30px"
                  />
                }
              </React.Fragment>
            ))}
          </select>
        </div>
      );
    else return <div id="loading">Loading...</div>;
  }

  render() {
    const totalMedications = this.state.patientMedications.length;

    return (
      <React.Fragment>
        <div>
          <span>
            <span
              className="fas fa-prescription-bottle-alt"
              style={{ fontSize: "50px" }}
            />
            <span style={{ fontSize: "50px" }}> Medications to take: </span>
            <span
              className="badge badge-pill badge-primary"
              style={{ fontSize: "30px" }}
            >
              {totalMedications}
            </span>
            <br />

            <form
              className="form-control"
              onSubmit={() => this.handleSubmit(this)}
            >
              {this.awaitMedications()}
              <br />
              <center>
                <button
                  // disabled={this.validate()}
                  onClick={e => this.handleSubmit(e)}
                  className="btn btn-success btn-md m-2"
                >
                  Submit
                </button>
              </center>
            </form>
          </span>
        </div>
        <br />
        <div className="col col-6">
          <center>
            <table className="container">
              <Counters
                counters={this.state.data.counters}
                onReset={this.handleReset}
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement}
                onDelete={this.handleDelete}
              />
              {/* <PatientMedications /> */}
            </table>
          </center>
        </div>
      </React.Fragment>
    );
  }
}

export default Medication;
