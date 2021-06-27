import React from 'react';
import { Header } from './Header';
import { Menu } from './Menu';
import EventList from "./EventList"

function index() {
  return (
    <div>
      <Header />
      <Menu />

      <div className="container">
        <div className="row">
          <div className="col margintopbottom">
            <EventList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
