import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
/* the console said: use `require("history").createBrowserHistory` instead of `require("history/createBrowserHistory")` */

// route components
import Header from "./components/Header.jsx"; // with jsx because there's also a css file in the folder
import Landing from "./pages/Landing";
import Splitview from "./pages/Splitview";
import Consolidated from "./pages/Consolidated";
import Deleted from "./pages/Deleted";
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
        <Route exact path="/deleted" component={Deleted} />
        <Route component={FourOFour} />
      </Switch>
    </Router>
  );
};

export default Routes;
