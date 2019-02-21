import React, { Component } from "react";
import Counter from "./Counter";

class Counters extends Component {
  render() {
    const {
      onReset,
      counters,
      onDelete,
      onIncrement,
      onDecrement
    } = this.props;
    return (
      <React.Fragment>
        <span>
          {counters.map(counter => (
            <Counter
              key={counter.id}
              onReset={onReset}
              onDelete={onDelete}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              counter={counter}
            />
          ))}
        </span>
      </React.Fragment>
    );
  }
}

export default Counters;
