import React, { Component } from 'react';
import ResultTable from './ResultTable';

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

export default ResultList;
