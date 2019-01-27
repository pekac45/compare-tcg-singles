/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
import React, { Component } from 'react';
import 'react-bulma-components/full';
import './app.css';
import './suggestions.css';

import Search from './Search';
import ResultList from './ResultList';
import NextHero from './NextHero';
import Header from './Header';
import Footer from './Footer';

const results = [];

class App extends Component {
  constructor() {
    super();
    this.state = {
      formPayload: {},
    };
  }

  handlePayload = e => {
    this.setState({ formPayload: e });
  };

  render() {
    return (
      <div className="container-fluid">
        <Header />
        <Search onSelectPayload={this.handlePayload} />
        <ResultList formPayload={this.state.formPayload} results={results} />
        <NextHero />
        <Footer />
      </div>
    );
  }
}

export default App;
