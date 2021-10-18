import React, {useState,useContext} from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {EmployeeProvider} from "./context/EmployeeContext";
import { UserContext } from "./context/UserContext";

import "./App.css";

function App() {
  const user = useContext(UserContext)
  console.log(user.isAuth)


  return (
    <Router>
      <div className="App">
        <Switch>
        <Route exact path="/login" component={LoginPage} />
        <EmployeeProvider>
          <ProtectedRoute path="/" component={MainPage} isAuth={user.isAuth}/>
          </EmployeeProvider>
         
        </Switch>
      </div>
    </Router>
  );
}

export default App;