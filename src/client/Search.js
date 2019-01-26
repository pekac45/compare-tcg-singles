/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Suggestions from './Suggestions';

import './app.css';
import './search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: 'destiny', card: '' };
  }

  // This one works with radio buttons
  handleOptionChange = e => {
    this.setState({
      selectedOption: e.target.value,
    });
  };

  // This one works with form
  handleCardName = e => {
    this.setState({ card: e });
  };

  // This one works with submit button
  handleFormSubmit = e => {
    e.preventDefault();

    const formPayload = {
      game: this.state.selectedOption,
      card: this.state.card,
    };
    this.props.onSelectPayload(formPayload);
  };

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
              <Suggestions onSelectCard={this.handleCardName} />
            </div>
          </div>
          <div className="columns is-centered">
            <div className="column is-4">
              <input
                type="submit"
                className="button is-fullwidth searchSubmit"
                value="Search"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  onSelectPayload: PropTypes.func.isRequired,
};

export default Search;
