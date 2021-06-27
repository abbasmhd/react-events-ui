import React from 'react';

export const Header = () => {
  return (
    <div className="jumbotron jumbotronheight">
      <div className="row">
        <div className="col-12 col-sm-8 text-lg">
          <div>
            <img src="/static/events.png" alt="Events Manager"/>
          </div>
          <h2>Events Manager</h2>
        </div>
      </div>
    </div>
  );
};
