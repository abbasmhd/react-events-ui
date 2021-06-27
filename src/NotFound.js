import React from 'react';
import { Header } from './Header';
import { Menu } from './Menu';

function NotFound() {
  return (
    <div>
      <Header />
      <Menu />
      <div className="container">
        <div className="row">
          <div className="col margintopbottom">
            <h2>Page Not Found</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
