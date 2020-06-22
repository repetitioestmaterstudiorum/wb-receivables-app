import React, { useContext } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
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
import Loader from "./components/Loader";

const browserHistory = createBrowserHistory();

const Routes = () => {
  const { isLoggedIn, isLoading } = useContext(UserContext);

  return (
    <Router history={browserHistory}>
      {isLoggedIn ? (
        <React.Fragment>
          <Redirect to="/open" />
          <Header />
          {isLoading ? (
            <Loader />
          ) : (
            <Switch>
              <Route exact path="/open" component={Open} />
              <Route exact path="/paid" component={Paid} />
              <Route exact path="/deleted" component={Deleted} />
              <Route exact path="/outgoing" component={Outgoing} />
              <Route component={FourOFour} />
            </Switch>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Redirect to="/" />
          <HeaderLoggedOut />
          <Route component={isLoading ? Loader : Landing} />
        </React.Fragment>
      )}
    </Router>
  );
};

export default Routes;
