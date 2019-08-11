import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dev from './pages/Dev';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={Login} exact />
      <Route path="/dev/:id" component={Dev} />
    </BrowserRouter>
  );
}

export default Routes;
