import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";

import Home from "./components/Home";
import Main from "./components/Main";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/main" component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
