import React from 'react';
import './app.css';

const Search = () => (
  <div>
    <form method="get">
      <div className="radioSelectors">
        <input id="destiny" type="radio" name="game" value="destiny" />
        <label className="radioSelector destiny" htmlFor="destiny" />
        <input id="champions" type="radio" name="game" value="champions" />
        <label className="radioSelector champions" htmlFor="champions" />
      </div>
      <br />
      <input type="text" name="card" placeholder="Enter Card Name" />
      <input type="submit" value="Submit" />
    </form>
  </div>
);

export default Search;
