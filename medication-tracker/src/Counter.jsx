import React, { Component } from "react";
import firebase from "firebase";
import axios from "axios";

class Counter extends Component {
  state = {
    route: "counter",
    medications: []
  };
  render() {
    return (
      <tr>
        <td>
          <span className={this.getMedicationName()}>
            <h2>
              <span />
              <img
                src={require(`${this.props.counter.image}`)}
                alt="medication"
                height="50"
                width="50"
              />
              {this.formatName()}
            </h2>
          </span>
        </td>
        <td>
          <span className="btn btn-md m-2">
            <h2>{this.getDosage()}</h2>
          </span>
        </td>
        <td>
          <span className={this.getBadgeClasses()}>
            <h2>{this.formatCount()}</h2>
          </span>
        </td>
        <td>
          <button
            onClick={() => this.props.onIncrement(this.props.counter)}
            className="btn btn-success btn-md m-2"
          >
            <span className="fas fa-plus" />
          </button>
        </td>
        <td>
          <button
            onClick={() => this.props.onDecrement(this.props.counter)}
            className="btn btn-warning btn-md m-2"
          >
            <span className="fas fa-minus" />
          </button>
        </td>
        <td>
          <button
            onClick={() => this.props.onReset(this.props.counter)}
            className="btn btn-primary btn-md m-2"
          >
            Reset
          </button>
        </td>
        <td>
          <button
            onClick={() => this.props.onDelete(this.props.counter.id)}
            className="btn btn-danger btn-md m-2"
          >
            Remove
          </button>
        </td>
      </tr>
    );
  }

  async componentDidMount() {
    const { data: medications } = await axios.get(
      firebase.database().ref(this.state.route)
    );
    this.setState({ medications });
  }

  getMedicationName() {
    let name = "badge m-3 badge-alert";
    name += this.props.counter.name;
    return name;
  }

  formatName() {
    const { name } = this.props.counter;
    return name;
  }

  getDosage() {
    const { dosage } = this.props.counter;
    return dosage;
  }

  getBadgeClasses() {
    let classes = "btn btn-";
    classes +=
      this.props.counter.quantity === 0 ? "info btn-md m-2" : "info btn-md m-2";
    return classes;
  }

  formatCount() {
    const { quantity } = this.props.counter;
    return quantity === 0 ? "0" : quantity;
  }
}

export default Counter;
