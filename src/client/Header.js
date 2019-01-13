import React from 'react';

const Header = () => (
  <div className="Navbar">
    <div className="navbar-brand">
      <a className="navbar-item" href="http://localhost:3000/">
        <img
          src="../src/assets/favicon.ico"
          width="28"
          height="28"
          alt="logo"
        />
        <strong className="title is-3">BLOBSHOP</strong>
      </a>
    </div>
  </div>
);

export default Header;
