import React from 'react';

const Search = () => (
  <div>
    <form method="get">
      <input type="radio" name="game" value="destiny" />
      Star Wars Destiny
      <input type="radio" name="game" value="champions" />
      Warhammer: Champions
      <input type="text" name="card" placeholder="Enter Card Name" />
      <input type="submit" value="Submit" />
    </form>
  </div>
);

export default Search;
