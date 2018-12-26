/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable arrow-parens */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import './app.css';

const results = [];

class Search extends Component {
  render() {
    return (
      <div>
        <form method="get">
          <select name="game">
            <option value="destiny">Star Wars Destiny</option>
            <option value="champions">Warhammer: Champions</option>
          </select>
          <input type="text" name="card" placeholder="Enter Card Name" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

class ResultRow extends Component {
  render() {
    const result = this.props.result;
    return (
      <tr>
        <td>{result.id}</td>
        <td>{result.title}</td>
        <td>{result.price}</td>
        <td>{result.stock}</td>
      </tr>
    );
  }
}

class ResultTable extends Component {
  render() {
    const resultRows = this.props.results.map(result => (
      <ResultRow key={result.id} result={result} />
    ));

    return (
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>price</th>
            <th>stock</th>
          </tr>
        </thead>
        <tbody>{resultRows}</tbody>
      </table>
    );
  }
}

class ResultList extends Component {
  constructor() {
    super();
    this.state = { results: [] };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch('/api/results')
      .then(response => response.json())
      .then(data => {
        console.log('Total count of prices:', data._metadata.total_count);
        this.setState({ results: data.records });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Results</h1>
        <ResultTable results={this.state.results} />
      </div>
    );
  }
}

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
