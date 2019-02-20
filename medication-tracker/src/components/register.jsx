import React from "react";
import Modal from "react-modal";
import firebase from "firebase";
import Patient from "../Patient";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "PowderBlue"
  }
};

Modal.setAppElement("#root");

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      data: {
        username: "",
        password: "",
        role: "Select Role",
        name: "",
        phoneNumber: "",
        patientName: ""
      },
      errors: {},
      id: "Register New User",
      instructions: "Please enter information to register",
      route: "users"
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
  }

  async componentDidMount() {
    const { data: value } = await firebase.database().ref(this.state.route);
    this.setState({ value });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  renderInput() {
    var input = (
      <input id={{ ...this.state.data }} style={{ marginRight: 20 }} />
    );
    return input;
  }

  validateProperty(input) {
    if (input === "banana") return "Invalid input. Please try again.";
    else return null;
  }

  handleDataChange(e) {
    let data = this.state.data;
    data[e.target.name] = e.target.value;
    this.setState({ data });
  }

  render() {
    let options = [
      { key: 1, id: "Patient", value: "patient", name: "Patient" },
      {
        key: 2,
        id: "HealthcareProvider",
        value: "healthcareWorker",
        name: "Healthcare Provider"
      },
      { key: 3, id: "CareTaker", value: "careTaker", name: "Care Taker" }
    ];
    return (
      <div>
        <div>
          <h3
            onClick={this.openModal}
            style={{ marginRight: 20, cursor: "pointer" }}
          >
            {this.state.id}
          </h3>

          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            onChange={this.handleChange}
            style={customStyles}
            contentLabel="MyRx Modal"
            onSubmit={this.handleSubmit}
          >
            <h2 ref={subtitle => (this.subtitle = subtitle)}>
              {this.state.id}
            </h2>
            <center>
              <div>{this.state.instructions}</div>

              <form id="registration" onSubmit={this.handleSubmit}>
                <div id="firebaseui-auth-container">
                  <select
                    name="role"
                    id="role"
                    className="form-control"
                    style={{ marginTop: 5 }}
                    onChange={this.handleDataChange}
                    value={this.input}
                  >
                    <option value="" />
                    {options.map(option => (
                      <option key={option.key} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  <input
                    name="username"
                    id="username"
                    style={{ marginTop: 5 }}
                    placeholder="Email"
                    type="text"
                    value={this.input}
                    onChange={this.handleDataChange}
                  />{" "}
                  <br />
                  <input
                    name="password"
                    id="password"
                    style={{ marginTop: 5 }}
                    placeholder="Password"
                    type="text"
                    value={this.input}
                    onChange={this.handleDataChange}
                  />{" "}
                  <br />
                  <input
                    name="name"
                    id="name"
                    style={{ marginTop: 5 }}
                    placeholder="Name"
                    type="text"
                    value={this.input}
                    onChange={this.handleDataChange}
                  />{" "}
                  <br />
                  <input
                    name="phoneNumber"
                    id="phoneNumber"
                    style={{ marginTop: 5 }}
                    placeholder="Phone Number"
                    type="text"
                    value={this.input}
                    onChange={this.handleDataChange}
                  />{" "}
                  <br />
                  <input
                    name="patient"
                    id="patient"
                    style={{ marginTop: 5 }}
                    placeholder="Patient Name or NA"
                    type="text"
                    value={this.input}
                    onChange={this.handleDataChange}
                  />{" "}
                  <br />
                  <button
                    className="btn btn-primary btn-md m-2"
                    onClick={e => this.handleSubmit(e)}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-danger btn-md m-2"
                    onClick={this.closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </center>
          </Modal>
        </div>
      </div>
    );
  }

  handleRegister(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return errorCode && errorMessage;
      });
    firebase
      .database()
      .ref(this.state.route)
      .push()
      .set({
        username: this.state.data.name,
        email: email,
        password: password,
        role: this.state.data.role,
        phoneNumber: this.state.data.phoneNumber,
        patient: this.state.data.patientName
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.closeModal();
    var newUser = {};
    newUser = event.target.value;
    this.setState({ data: newUser });
    console.log(this.state.data);
    this.handleRegister(this.state.data.username, this.state.data.password);
    if (this.state.data.role === "patient")
      Patient.createNewPatient(this.state.data.name, this.state.data.email);
  };
}

export default Register;
