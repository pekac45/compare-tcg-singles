import React from 'react';
// import PropTypes from 'prop-types';
import './app.css';
import Search from './Search';
import ResultList from './ResultList';

const results = [];

const Footer = () => (
  <div>
    <ul>
      <li>Todo:</li>
      <li>change from table to list</li>
      <li>add bootstrap and make pretty</li>
      <li>add spinner</li>
      <li>add autosuggest to search</li>
      <li>implement champions</li>
      <li>add real footer</li>
    </ul>
  </div>
);

const App = () => (
  <div className="App">
    <Search />
    <ResultList results={results} />
    <Footer />
  </div>
);

export default App;
