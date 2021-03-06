import React from "react";
import Modal from "react-modal";
import firebase from "firebase";
import patient from "../Patient";

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
      route: "users",
      data: {
        email: "",
        password: "",
        role: "",
        name: "",
        phoneNumber: "",
        patientName: ""
      },
      errors: {},
      id: "Register New User",
      instructions: "Please enter information to register"
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDataSelect = this.handleDataSelect.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
  }

  // async componentDidMount() {
  //   const { value } = await firebase.database().ref(this.state.route);
  //   this.setState({ data: value });
  // }

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
    var error = "Invalid input. Please try again.";
    if (input === "banana") return error;
    else return null;
  }

  handleDataSelect(e) {
    let data = this.state.data;
    data[e.target.id] = e.target.value;
    this.setState({ data });
  }

  handleDataChange(e) {
    let data = this.state.data;
    data[e.target.name] = e.target.value;
    this.setState({ data });
  }

  render() {
    let options = [
      { key: 1, id: "role", value: "patient", name: "Patient" },
      {
        key: 2,
        id: "role",
        value: "healthcareProvider",
        name: "Healthcare Provider"
      },
      { key: 3, id: "role", value: "careTaker", name: "Care Taker" }
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
            id="Register-Modal"
          >
            <h2 ref={subtitle => (this.subtitle = subtitle)}>
              {this.state.id}
            </h2>
            <center>
              <div>{this.state.instructions}</div>

              <form id="register-form" onSubmit={this.handleSubmit}>
                <div id="firebaseui-auth-container">
                  <select
                    name="role"
                    id="role"
                    className="form-control"
                    style={{ marginTop: 5 }}
                    onChange={this.handleDataSelect.bind(this)}
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
                    name="email"
                    id="email"
                    style={{ marginTop: 5 }}
                    placeholder="Email"
                    type="text"
                    value={this.input}
                    onChange={this.handleDataChange.bind(this)}
                  />{" "}
                  <br />
                  <input
                    name="password"
                    id="password"
                    style={{ marginTop: 5 }}
                    placeholder="Password"
                    type="text"
                    value={this.input}
                    onChange={this.handleDataChange.bind(this)}
                  />{" "}
                  <br />
                  <input
                    name="name"
                    id="name"
                    style={{ marginTop: 5 }}
                    placeholder="Name"
                    type="text"
                    value={this.input}
                    onChange={this.handleDataChange.bind(this)}
                  />{" "}
                  <br />
                  <input
                    name="phoneNumber"
                    id="phoneNumber"
                    style={{ marginTop: 5 }}
                    placeholder="Phone Number"
                    type="text"
                    value={this.input}
                    onChange={this.handleDataChange.bind(this)}
                  />{" "}
                  <br />
                  <input
                    name="patientName"
                    id="patientName"
                    style={{ marginTop: 5 }}
                    placeholder="Patient Name or NA"
                    type="text"
                    value={this.input}
                    onChange={this.handleDataChange.bind(this)}
                  />{" "}
                  <br />
                  <button
                    className="btn btn-primary btn-md m-2"
                    onClick={this.handleSubmit}
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

  addUserToDb = data => {
    console.log(data);
    firebase
      .database()
      .ref(this.state.route)
      .push()
      .set({
        role: data.role,
        email: data.email,
        password: data.password,
        name: data.name,
        phoneNumber: data.phoneNumber,
        patientName: data.patientName
      });
  };

  handleRegister(email, password) {
    var newUser;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {
        newUser = cred.user;
        console.log(newUser);
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        return errorCode && errorMessage;
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.closeModal();
    var newUser = {};
    newUser = event.target.value;
    this.setState({ data: newUser });
    this.handleRegister(this.state.data.email, this.state.data.password);
    this.addUserToDb(this.state.data);
    var user = (newUser.name, newUser.role);
    this.props.handleLogin(user);
    if (this.state.data.role === "patient")
      patient.createNewPatient(this.state.data.name, this.state.data.email);
  };
}

export default Register;
