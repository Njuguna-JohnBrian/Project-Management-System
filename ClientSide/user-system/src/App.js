import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import UserDash from "./components/user.dashboard";

class App extends Component {
  render() {
    return (
      // <UserDash />
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark ">
          <Link to={"/"} className="navbar-brand">
            USER SYSTEM
          </Link>

          {/* Add Admin and User DashBoards */}
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                SignUp
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/userdash" component={UserDash} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
