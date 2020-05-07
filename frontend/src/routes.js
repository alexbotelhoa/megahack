import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SimplePoly from './pages/SimplePoly';
import Teste from './pages/Teste';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SimplePoly} />
        {/* <Route path="/" exact component={Teste} /> */}
      </Switch>
    </BrowserRouter>
  )
}