/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

// components that will display the data
import ResultTable from './ResultTable';
import LoadingSpinner from './LoadingSpinner';

class ResultList extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  // const game = params.get('game');
  // const card = params.get('card');

  loadData() {
    this.setState({
      loading: true,
    });
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
        this.setState({
          results: data.records,
          loading: false,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { results, loading } = this.state;
    let content;

    // If else statement which shows or hides the table,
    // shows or hides the loading spinner when searching.
    if (loading) {
      content = <LoadingSpinner />;
    } else if (results.length === 0) {
      content = null;
    } else {
      content = <ResultTable results={results} />;
    }
    return (
      <div className="container">
        <div className="level-item">{content}</div>
      </div>
    );
  }
}

export default ResultList;
