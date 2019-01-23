/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import Suggestions from './Suggestions';

import './app.css';
import './search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = { selectedOption: 'destiny', value: '' };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
  }

  handleOptionChange = e => {
    this.setState({
      selectedOption: e.target.value,
    });
  };

  handleCardChange(e) {
    this.setState({ value: e.target.value });
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
              {/* <Suggestions
                type="text"
                title="value"
                name="value"
                content={this.state.value}
                onChange={this.handleCardChange}
                placeholder="Search for card"
              /> */}
              <input
                type="text"
                title="value"
                name="value"
                content={this.state.value}
                onChange={this.handleCardChange}
                placeholder="Search for card"
              />
            </div>
          </div>
          <div className="columns is-centered">
            <div className="column is-4">
              <input
                type="submit"
                className="button is-fullwidth searchSubmit"
                value="Submit"
              />
              {/* <input
                className="button is-fullwidth searchSubmit"
                type="submit"
                value="Search"
              /> */}
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Search;
