/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

const NextHero = () => (
  <section className="hero is-medium hero-coming-next">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">What&apos;s coming next? </h1>
        <h2 className="subtitle">
          <ul>
            <li>More shops.</li>
            <li>Caching.</li>
            <li>Warhammer Age of Sigmar: Champions.</li>
            <li>Radio buttons will be remembered with a cookie.</li>
          </ul>
        </h2>
        <br />
        <h1 className="title">
          Do you want to see more shops here or did you find an issue?
        </h1>
        <h2 className="subtitle">
          Let me know on{' '}
          <a href="https://github.com/pekac45/compare-tcg-singles/issues">
            GitHub
          </a>{' '}
          by raising an issue.
        </h2>
      </div>
    </div>
  </section>
);

export default NextHero;
