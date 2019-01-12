/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import ResultRow from './ResultRow';

const ResultTable = props => {
  const resultRows = props.results.map(result => (
    <ResultRow key={result.shop} result={result} />
  ));

  return (
    <table className="table is-striped ">
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
};

ResultTable.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ResultTable;
