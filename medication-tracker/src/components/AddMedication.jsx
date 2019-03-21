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

Modal.setAppElement("#root");

class AddMedication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: this.props.openModal,
      route: "medications",
      data: {
        name: "",
        dosage: "",
        image: ""
      },
      errors: {},
      id: "Add Medication",
      instructions: "Please enter information to add medication"
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
      {
        key: 1,
        id: "b12",
        value: "b12",
        image: "../images/b12.jpg",
        name: "B12"
      },
      {
        key: 2,
        id: "heart",
        value: "heart",
        image: "../images/heart.jpg",
        name: "Heart Medication"
      },
      {
        key: 3,
        id: "lipitor",
        value: "lipitor",
        image: "../images/lipitor.jpg",
        name: "Lipitor"
      },
      {
        key: 4,
        id: "neuro",
        value: "neuro",
        image: "../images/neuro.jpg",
        name: "Neuro Inhibitor"
      },
      {
        key: 5,
        id: "yellow",
        value: "yellow",
        image: "../images/yellow.jpg",
        name: "Yellow Tablet"
      }
    ];

    return (
      <div>
        <div>
          {/* <h3
            onClick={this.openModal}
            style={{ marginRight: 20, cursor: "pointer" }}
          >
            {this.state.id}
          </h3> */}

          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            onChange={this.handleChange}
            style={customStyles}
            contentLabel="MyRx Modal"
            onSubmit={this.handleSubmit}
            id="AddMedication-Modal"
          >
            <h2 ref={subtitle => (this.subtitle = subtitle)}>
              {this.state.id}
            </h2>
            <center>
              <div>{this.state.instructions}</div>

              <form id="addMedication-form" onSubmit={this.handleSubmit}>
                <div id="firebase-auth-container">
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
                      <option key={option.key} value="Select Image File">
                        {option.image}
                      </option>
                    ))}
                  </select>
                  <input
                    name="name"
                    id="name"
                    style={{ marginTop: 5 }}
                    placeholder="Name of Medication"
                    type="text"
                    value={this.input}
                    onChange={this.handleDataChange.bind(this)}
                  />{" "}
                  <br />
                  <input
                    name="dosage"
                    id="dosage"
                    style={{ marginTop: 5 }}
                    placeholder="Dosage in mg"
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

  addMedToDb = data => {
    console.log(data);
    firebase
      .database()
      .ref(this.state.route)
      .push()
      .set({
        name: data.name,
        dosage: data.dosage,
        image: data.image
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.closeModal();
    var newMed = {};
    newMed = event.target.value;
    this.setState({ data: newMed });
    this.addMedToDb(this.state.data);
  };
}

export default AddMedication;
