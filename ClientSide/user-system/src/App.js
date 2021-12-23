import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import UserDash from "./components/user.dashboard";
import AdminDash from "./components/admin.dashboard";
import Projects from "./components/projects.component";
import AuthService from "./services/auth.service";
import GetAllUsers from "./components/users.component";
import GetAllProjects from "./components/getallprojects";
import CreateTask from "./components/createTask";
import GetTasks from "./components/getTasks";

class App extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);

    this.state = {
      showUserDashboard: false,
      showAdminDashboard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log(user);
    // if (user.user.is_admin === true) {
    //   "/admindash";
    // } else {
    //   "/userdash";
    // }

    if (user) {
      this.setState({
        currentUser: user,
        showUserDashboard: user.user.is_admin === false,
        showAdminDashboard: user.user.is_admin === true,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser, showUserDashboard, showAdminDashboard } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark ">
          <Link to={"/"} className="navbar-brand">
            USER SYSTEM
          </Link>

          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            {/* Add Admin and User DashBoards */}
            {showUserDashboard && (
              <li className="nav-item">
                <Link to={"/userdash"} className="nav-link">
                  User
                </Link>
              </li>
            )}
            {showAdminDashboard && (
              <li className="nav-item">
                <Link to={"/admindash"} className="nav-link">
                  Admin
                </Link>
              </li>
            )}

            {/* {currentUser && (
              <li className="nav-item" className="navbar-nav ml-auto">
                <Link to={"/userdash"} className="na-link">User2</Link>
              </li>
            )} */}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/userdash"} className="nav-link">
                  {currentUser.user.username}'s Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
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
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/admindash" component={AdminDash} />
            <Route exact path="/userdash" component={UserDash} />
            <Route exact path="/admindash/createproject" component={Projects} />
            <Route exact path="/admindash/createtask" component={CreateTask} />
            <Route exact path="/admindash/gettasks" component={GetTasks} />
            <Route
              exact
              path="/admindash/allprojects"
              component={GetAllProjects}
            />
            <Route
              exact
              path="/admindash/getallusers"
              component={GetAllUsers}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
