import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import City from './pages/City';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={City} />
      </Switch>
    </BrowserRouter>
  )
}