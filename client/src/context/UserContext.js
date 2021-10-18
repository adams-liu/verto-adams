//Create a UserContext.js file

import React, { createContext, useState } from "react";
export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {
    const [isAuth,setIsAuth] = useState(false);

  return (
    <UserContext.Provider
      value={{
          isAuth,
          setIsAuth
      }}
    >
      {children}
    </UserContext.Provider>
  );
};