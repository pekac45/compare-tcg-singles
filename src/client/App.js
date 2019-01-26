import React from 'react';
import 'react-bulma-components/full';
import './app.css';
import './suggestions.css';

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
