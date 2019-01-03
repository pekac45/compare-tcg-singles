/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './app.css';
import Search from './Search';
import ResultList from './ResultList';

const results = [];

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search />
        <ResultList results={results} />
      </div>
    );
  }
}

export default App;
