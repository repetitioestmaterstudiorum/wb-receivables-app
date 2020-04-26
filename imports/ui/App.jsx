import React from "react";
import Routes from "./Routes";
import { UserProvider } from "./context/UserContext";

const App = () => (
  <UserProvider>
    <Routes />
  </UserProvider>
);

export default App;
