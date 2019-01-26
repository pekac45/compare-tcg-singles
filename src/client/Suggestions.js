/* eslint-disable react/destructuring-assignment */
import Autosuggest from 'react-autosuggest';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './suggestions.css';

// Our list of cards to autosuggest.
import cards from './cards';

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : cards.filter(
        card => card.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion =>
  suggestion.subtitle === ''
    ? `${suggestion.name}`
    : `${suggestion.name} - ${suggestion.subtitle}`;

// Renders suggestion as suggestion name or
// suggestion + subtitle if there is subtitle.
const renderSuggestion = suggestion =>
  suggestion.subtitle === '' ? (
    <div>{suggestion.name}</div>
  ) : (
    <div>{`${suggestion.name} - ${suggestion.subtitle}`}</div>
  );

class Suggestions extends Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
    };
  }

  // This moves state 1 level up
  handleCardChange = () => {
    const card = this.state.value;
    this.props.onSelectCard(card);
  };

  onChange = (event, { newValue }) => {
    this.setState(
      {
        // This updates Autosuggest
        value: newValue,
      },
      // This makes input works
      this.handleCardChange
    );
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions, theme } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      value,
      onChange: this.onChange,
      className: 'input',
      type: 'text',
      name: 'card',
      placeholder: 'Enter Card Name',
    };

    return (
      <Autosuggest
        theme={theme}
        suggestions={suggestions}
        highlightFirstSuggestion
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

Suggestions.propTypes = {
  onSelectCard: PropTypes.func.isRequired,
};

export default Suggestions;
