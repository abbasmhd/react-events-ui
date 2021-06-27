import React from 'react';
import Home from './Home.js';
import AddEvent from './AddEvent.js';
import EditEvent from './EditEvent.js';
import NotFound from './NotFound.js';

const App = ({ pageName }) => {
  if (pageName === 'Home') return <Home />;
  if (pageName === 'AddEvent') return <AddEvent />;
  if (pageName === 'EditEvent') return <EditEvent />;
  return <NotFound />;
};

export default App;
