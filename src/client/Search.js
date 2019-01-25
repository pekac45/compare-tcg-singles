/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import Suggestions from './Suggestions';
import SingleInput from './SingleInput';

import './app.css';
import './search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = { selectedOption: 'destiny', value: '', temperature: '' };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSingleInput = this.handleSingleInput.bind(this);
  }

  handleOptionChange = e => {
    this.setState({
      selectedOption: e.target.value,
    });
  };

  handleSingleInput(e) {
    console.log('typing');
    this.setState({ value: e.target });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const formPayload = {
      game: this.state.selectedOption,
      value: this.state.value,
    };

    console.log('Send this in a POST request:', formPayload);
    console.log(formPayload);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div className="radioSelectors">
            <input
              id="destiny"
              type="radio"
              name="game"
              value="destiny"
              checked={this.state.selectedOption === 'destiny'}
              onChange={this.handleOptionChange}
            />
            <label className="radioSelector destiny" htmlFor="destiny" />
            <input
              id="champions"
              type="radio"
              name="game"
              value="champions"
              checked={this.state.selectedOption === 'champions'}
              onChange={this.handleOptionChange}
            />
            <label className="radioSelector champions" htmlFor="champions" />
          </div>
          <div className="columns is-centered searchBar">
            <div className="column is-4">
              {/* <Suggestions /> */}
              {/* THIS WORKS */}
              {/* <input
                type="text"
                title="value"
                card="value"
                content={this.state.value}
                onChange={this.handleCardChange}
                placeholder="Search for card"
              /> */}

              <SingleInput onChange={this.handleSingleInput} />
            </div>
          </div>
          <div className="columns is-centered">
            <div className="column is-4">
              <input
                type="submit"
                className="button is-fullwidth searchSubmit"
                value="Submit"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Search;
