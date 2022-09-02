import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import HomePage from "./pages/home/homePage";
import ErrorPage from "./pages/error/errorPage";

export default function RouteManager() {
  const routes = {
    "/": { components: <HomePage />, exact: true },
  };

  return (
    <Router>
      <Switch>
        {Object.keys(routes).map((route) => (
          <Route key={route} exact={routes[route].exact} path={route}>
            {console.log(routes[route])}
            {routes[route].components}
          </Route>
        ))}
        <Route key="errorRoute" path="/">
          <ErrorPage errorCode={404} />
        </Route>
      </Switch>
    </Router>
  );
}
