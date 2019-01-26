/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components that will display the data
import ResultTable from './ResultTable';
import LoadingSpinner from './LoadingSpinner';

class ResultList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.formPayload !== prevProps.formPayload) {
      this.loadData(this.props.formPayload);
    }
  }

  loadData() {
    const query = this.props.formPayload;
    console.log('(ResultList.js) Data received:', query);

    // Make sure that game and card is defined before starting fetching
    if (query.game && query.card) {
      // Starts loading spinner
      this.setState({
        loading: true,
      });

      fetch(`/api/results/?game=${query.game}&card=${query.card}`)
        .then(response => response.json())
        .then(data => {
          // console.log('Total count of prices:', data._metadata.total_count);
          this.setState({
            results: data.records,
            // finish loading spinner
            loading: false,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
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

ResultList.propTypes = {
  formPayload: PropTypes.shape({
    game: PropTypes.string,
    card: PropTypes.string,
  }),
};

ResultList.defaultProps = {
  formPayload: { game: '', card: ' ' },
};

export default ResultList;
