import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

ResultRow.propTypes = {
  result: PropTypes.shape({
    shop: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    stock: PropTypes.string,
  }).isRequired,
};

export default ResultRow;
