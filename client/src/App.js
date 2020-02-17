import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Login';
import Home from './Home';
import Welcome from "./Welcome";
import 'semantic-ui-css/semantic.min.css';
import Registration from "./Registration";


export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}>
          <Login />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
