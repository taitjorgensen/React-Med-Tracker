import React from "react";
import Modal from "react-modal";
import firebase from "firebase";

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

Modal.setAppElement(document.getElementById("#login-form"));

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      isLoggedIn: false,
      user: {
        name: "",
        role: ""
      },
      data: {
        email: "",
        password: ""
      },
      id: "Login",
      instructions: "Please enter information to login"
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
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

  handleDataChange(e) {
    let data = this.state.data;
    data[e.target.id] = e.target.value;
    this.setState({ data });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.closeModal();
    this.setState({ data: event.target.value });
    console.log(this.state.data);
    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.state.data.email,
        this.state.data.password
      )
      .then(value => {
        console.log("value", value);
        this.setState({ isLoggedIn: true });
        console.log("state", this.state);
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + errorMessage);
        this.displayError(errorMessage);
        return errorCode && errorMessage;
      });
  };

  displayError(error) {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Please try again or Register as New User"
        id="warning"
      >
        <div className="error">{error}</div>
        <button className="btn btn-danger btn-md m-2" onClick={this.closeModal}>
          Close
        </button>
      </Modal>
    );
  }

  render() {
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
            style={customStyles}
            contentLabel="MyRx Modal"
            id="Login-Modal"
          >
            <h2 ref={subtitle => (this.subtitle = subtitle)}>
              {this.state.id}
            </h2>

            <div>{this.state.instructions}</div>
            <form onSubmit={this.handleSubmit} id="login-form">
              <input
                id="email"
                onChange={this.handleDataChange}
                placeholder="Email"
                required
              />{" "}
              <br />
              <input
                id="password"
                style={{ marginTop: 5 }}
                onChange={this.handleDataChange}
                placeholder="Password"
                required
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
            </form>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Login;
