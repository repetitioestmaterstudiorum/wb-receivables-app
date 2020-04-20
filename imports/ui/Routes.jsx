import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
/* outdated meteor docs: use `require("history").createBrowserHistory` instead of `require("history/createBrowserHistory")` */

// route components
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Splitview from "./pages/Splitview/Splitview";
import Consolidated from "./pages/Consolidated";
import FourOFour from "./pages/FourOFour";

const browserHistory = createBrowserHistory();

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/splitview" component={Splitview} />
        <Route exact path="/consolidated" component={Consolidated} />
        <Route component={FourOFour} />
      </Switch>
    </Router>
  );
};

export default Routes;
