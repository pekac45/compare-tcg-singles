import React from 'react';
import { Navbar } from 'react-bulma-components/full';

const Header = () => (
  <div>
    <Navbar>
      <navbar-brand>
        <a className="navbar-item" href="http://localhost:3000/">
          <img
            src="../src/assets/favicon.ico"
            width="28"
            height="28"
            alt="logo"
          />
          <h1>BLOBSHOP</h1>
        </a>
      </navbar-brand>
    </Navbar>
  </div>
);

export default Header;
