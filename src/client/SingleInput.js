/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

class SingleInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleCardChange = event => {
    this.setState({ card: event.target.value });
  };

  render() {
    return (
      <input
        type="text"
        placeholder="Search for card"
        value={this.state.card}
        onChange={this.handleCardChange}
      />
    );
  }
}

export default SingleInput;
