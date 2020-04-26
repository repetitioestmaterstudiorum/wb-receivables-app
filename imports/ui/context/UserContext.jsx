import { Meteor } from "meteor/meteor";
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export const UserProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    Meteor.userId() ? setIsLoggedIn(true) : setIsLoggedIn(false);
  };

  const logOut = () => {
    Meteor.logout();
  };

  useEffect(() => {
    checkLoginStatus();
  });

  return (
    <UserContext.Provider value={{ isLoggedIn, logOut }}>
      {props.children}
    </UserContext.Provider>
  );
};
