import React from 'react';
// import PropTypes from 'prop-types';
import './app.css';
import Search from './Search';
import ResultList from './ResultList';

const results = [];

const App = () => (
  <div className="App">
    <Search />
    <ResultList results={results} />
  </div>
);

export default App;
