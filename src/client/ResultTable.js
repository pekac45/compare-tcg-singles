import React from 'react';
import PropTypes from 'prop-types';
import ResultRow from './ResultRow';

const ResultTable = props => {
  const resultRows = props.results.map(result => (
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
};

ResultTable.propTypes = {
  results: PropTypes.shape({
    shop: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    stock: PropTypes.string,
    map: PropTypes.func,
  }).isRequired,
};

export default ResultTable;
