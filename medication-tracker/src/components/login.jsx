import React from "react";
import Modal from "react-modal";

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

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById("#root"));

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
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
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false, data: this });
  }

  renderInput() {
    var input = (
      <input id={{ ...this.state.data }} style={{ marginRight: 20 }} />
    );
    return input;
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
            id="Login"
          >
            <h2 ref={subtitle => (this.subtitle = subtitle)}>
              {this.state.id}
            </h2>

            <div>{this.state.instructions}</div>
            <form>
              <input id={this.state.data.email} placeholder="Email" /> <br />
              <input
                id={this.state.data.password}
                style={{ marginTop: 5 }}
                placeholder="Password"
              />{" "}
              <br />
              <button
                className="btn btn-primary btn-md m-2"
                onClick={this.closeModal.bind(this)}
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
