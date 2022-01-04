import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import * as Icon from "react-bootstrap-icons";
import { Button, Table, Modal, ModalFooter, ModalBody } from "react-bootstrap";

// import AuthService from "./services/auth.service";
import Login from "../src/components/User/login.component";
import Register from "../src/components/User/register.component";
import Home from "./components/Home/home.component";
import UserDash from "./components/User/user.dashboard";
import AdminDash from "./components/Admin/Dashboard/admin.dashboard";

import AuthService from "./services/auth.service";
import GetAllUsers from "./components/Admin/Users/users.component";
import GetAllProjects from "../src/components/Admin/Projects/getallprojects";

import GetTasks from "./components/Admin/Tasks/getTasks";
import CreateAssign from "../src/components/Admin/Dashboard/create_assign";
import Updates from "./components/Admin/Updates/updates";

class App extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);

    this.state = {
      showUserDashboard: false,
      showAdminDashboard: false,
      currentUser: undefined,
      showProfile: false,
    };
  }

  handleOpenProfile = (e) => {
    this.setState({ showProfile: true });
  };
  handleCloseProfile = (e) => {
    this.setState({ showProfile: false });
  };
  componentDidMount() {
    const user = AuthService.getCurrentUser();
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
        <nav className="navbar navbar-expand navbar-light bg-light responsive-md">
          <Link to={"/home"} className="navbar-brand">
            Home
          </Link>

          <div className="navbar-nav ml-auto">
            {/* Add Admin and User DashBoards */}
            {showUserDashboard && (
              <li className="nav-item">
                <Link to={"/userdash"} className="nav-link">
                  DashBoard
                </Link>
              </li>
            )}
            {showAdminDashboard && (
              <li className="nav-item">
                <Link to={"/admindash"} className="nav-link">
                  DashBoard
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <>
                  <button
                    variant="primary"
                    style={{ border: "none", fontSize: "0.8em" }}
                    onClick={this.handleOpenProfile}
                  >
                    <Icon.PersonFill size={"30px"} />
                  </button>
                  <Modal
                    show={this.state.showProfile}
                    onHide={this.handleCloseProfile}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <b>Logged In As</b> : {currentUser.user.username} <br />
                      <b>Email</b> : {currentUser.user.email} <br />
                      <b>Account ID</b> :{currentUser.user.id} <br />
                      <b>Account Rights </b>:{" "}
                      {currentUser.user.is_admin ? "Admin" : "User"}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        className="btn btn-success"
                        onClick={this.handleCloseProfile}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-sm btn-danger py-0"
                  style={{ fontSize: "0.8em" }}
                >
                  <a
                    href="/login"
                    className="nav-link"
                    onClick={this.logOut}
                    style={{ fontSize: "0.8em" }}
                  >
                    <Icon.BoxArrowLeft />
                  </a>
                </button>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <button
                  className="btn btn-sm btn-primary py-0"
                  style={{ fontSize: "0.8em" }}
                >
                  <Link
                    to={"/login"}
                    className="nav-link"
                    style={{ fontSize: "0.8em" }}
                  >
                    Login
                  </Link>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-sm btn-primary py-0"
                  style={{ fontSize: "0.8em" }}
                >
                  <Link
                    to={"/register"}
                    className="nav-link"
                    style={{ fontSize: "0.8em" }}
                  >
                    SignUp
                  </Link>
                </button>
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
            <Route exact path="/admindash/create" component={CreateAssign} />

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
            <Route exact path="/admindash/update" component={Updates} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
