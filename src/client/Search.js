import React from 'react';
import './app.css';

const Search = () => (
  <div>
    <form method="get">
      <div className="radioSelectors">
        <label htmlFor="destiny" className="radioSelector destiny">
          <input type="radio" name="game" value="destiny" />
        </label>
        <label htmlFor="champions" className="radioSelector champions">
          <input type="radio" name="game" value="champions" />
        </label>
      </div>
      <br />
      <input type="text" name="card" placeholder="Enter Card Name" />
      <input type="submit" value="Submit" />
    </form>
  </div>
);

export default Search;
