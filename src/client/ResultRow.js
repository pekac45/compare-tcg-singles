import React from 'react';
import PropTypes from 'prop-types';

const ResultRow = ({ result }) => (
  <tr>
    <td>{result.shop}</td>
    <td>{result.title}</td>
    <td>{result.price}</td>
    <td>{result.stock}</td>
  </tr>
);

ResultRow.propTypes = {
  result: PropTypes.shape({
    shop: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string,
    stock: PropTypes.string,
  }).isRequired,
};

export default ResultRow;
