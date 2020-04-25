import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
/* the console said: use `require("history").createBrowserHistory` instead of `require("history/createBrowserHistory")` */

// route components
import Header from "./components/Header.jsx"; // with jsx because there's also a css file in the folder
import Landing from "./pages/Landing";
import Open from "./pages/Open";
import Paid from "./pages/Paid/Paid";
import Deleted from "./pages/Deleted";
import Outgoing from "./pages/Outgoing";
import FourOFour from "./pages/FourOFour";

const browserHistory = createBrowserHistory();

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/open" component={Open} />
        <Route exact path="/paid" component={Paid} />
        <Route exact path="/deleted" component={Deleted} />
        <Route exact path="/outgoing" component={Outgoing} />
        <Route component={FourOFour} />
      </Switch>
    </Router>
  );
};

export default Routes;
