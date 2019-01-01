/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
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
        <td>{result.shop}</td>
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
            <th>shop</th>
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

  // const game = params.get('game');
  // const card = params.get('card');

  loadData() {
    let params;
    if (document.location.search.substring(1)) {
      params = document.location.search.substring(1);
    } else {
      params = '';
    }
    fetch(`/api/results/?${params}`)
      .then(response => response.json())
      .then(data => {
        // console.log('Total count of prices:', data._metadata.total_count);
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
