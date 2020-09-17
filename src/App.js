import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Contacts from "./components/Contacts";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.css";
function App() {
  return (
    <div className="App pt-4 mt-4">
      <Link to="/login" className="btn btn-primary m-2 ">
        Login
      </Link>
      <Link to="/contact" className="btn btn-primary m-2">
        Add Contact
      </Link>
      <Link to="/signup" className="btn btn-primary m-2">
        SignUp
      </Link>
      <Switch>
        <Route path="/contact" component={Contacts} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
