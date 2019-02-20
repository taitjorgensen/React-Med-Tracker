import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById("#popup"));

class ModalTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      data: { props }
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
      <input id={{ ...this.props.data }} style={{ marginRight: 20 }} />
    );
    return input;
  }

  render() {
    return (
      <div>
        <h3
          onClick={this.openModal}
          style={{ marginRight: 20, cursor: "pointer" }}
        >
          {this.props.id}
        </h3>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="MyRx Modal"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>{this.props.id}</h2>

          <div>{this.props.instructions}</div>
          <form>
            <input id={this.props.input} placeholder="Email" /> <br />
            <input
              id={this.props.input}
              style={{ marginTop: 5 }}
              placeholder="Password"
            />{" "}
            <br />
            <button
              className="btn btn-primary btn-md m-2"
              onClick={this.closeModal}
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
    );
  }
}

// ReactDOM.render(
//   <ModalTemplate {...props} />,
//   document.getElementById("register")
// );
export default ModalTemplate;
