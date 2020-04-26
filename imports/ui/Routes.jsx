import React, { useContext } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { UserContext } from "./context/UserContext";

// route components
import Header from "./components/Header";
import HeaderLoggedOut from "./components/HeaderLoggedOut";
import Landing from "./pages/Landing";
import Open from "./pages/Open";
import Paid from "./pages/Paid/Paid";
import Deleted from "./pages/Deleted";
import Outgoing from "./pages/Outgoing";
import FourOFour from "./pages/FourOFour";

const browserHistory = createBrowserHistory();

const Routes = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Router history={browserHistory}>
      {isLoggedIn ? (
        <React.Fragment>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/open" component={Open} />
            <Route exact path="/paid" component={Paid} />
            <Route exact path="/deleted" component={Deleted} />
            <Route exact path="/outgoing" component={Outgoing} />
            <Route component={FourOFour} />
          </Switch>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <HeaderLoggedOut />
          <Route component={Landing} />
        </React.Fragment>
      )}
    </Router>
  );
};

export default Routes;
