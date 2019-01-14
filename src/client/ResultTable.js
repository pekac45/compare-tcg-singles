/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import ResultRow from './ResultRow';

const ResultTable = props => {
  const resultRows = props.results.map(result => (
    <ResultRow key={result.shop} result={result} />
  ));

  return (
    <div>
      <div className="columns is-centered">
        <table className="table is-striped">
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
      </div>
      <div className="columns is-centered">
        <p className="column is-12">
          Please note, sometimes the results might be not exact. Especially with
          sites which does not have subtitle in name.
        </p>
      </div>
    </div>
  );
};

ResultTable.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ResultTable;
