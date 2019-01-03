import React from 'react';

const Search = () => (
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

export default Search;
