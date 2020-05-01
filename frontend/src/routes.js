import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SimplePoly from './pages/SimplePoly';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SimplePoly} />
      </Switch>
    </BrowserRouter>
  )
}