import React from 'react';
// import PropTypes from 'prop-types';
import './app.css';
import Search from './Search';
import ResultList from './ResultList';
import Footer from './Footer';
import Header from './Header';

const results = [];

const App = () => (
  <div className="container-fluid">
    <Header />
    <Search />
    <ResultList results={results} />
    <Footer />
  </div>
);

export default App;
