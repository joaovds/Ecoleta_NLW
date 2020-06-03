import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import HomePage from './pages/HomePage/index';
import CreatePoint from './pages/CreatePoint/index';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path='/' exact component={HomePage} />
      <Route path='/create-point' exact component={CreatePoint} />
    </BrowserRouter>
  );
};

export default Routes;
