/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import './app.css';
import './search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = { selectedOption: 'destiny' };
  }

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value,
    });
  };

  render() {
    return (
      <div>
        <form method="get">
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
              <input
                className="input"
                type="text"
                name="card"
                placeholder="Enter Card Name"
              />
            </div>
          </div>
          <div className="columns is-centered searchSubmit">
            <div className="column is-4">
              <input
                className="button is-fullwidth"
                type="submit"
                value="Search"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Search;
