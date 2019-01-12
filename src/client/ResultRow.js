import React from 'react';
import PropTypes from 'prop-types';

const ResultRow = ({ result }) => (
  <tr>
    <td>
      <a href={result.link} target="_blank" rel="noreferrer noopener">
        {result.shop}
      </a>
    </td>
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
    link: PropTypes.string,
  }).isRequired,
};

export default ResultRow;
