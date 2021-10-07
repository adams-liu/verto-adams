//Create a UserContext.js file

import React, { createContext, useState } from "react";
export const EmployeeContext = createContext();

// This context provider is passed to any component requiring the context
export const EmployeeProvider = ({ children }) => {
    const [data,setData] = useState([])

  return (
    <EmployeeContext.Provider
      value={{
          data,
          setData
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};