import React, { Component } from "react";
import AuthService from "../../../src/services/auth.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "./user.dashboard.css";

export default class UserDash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
  }
  render() {
    const { currentUser } = this.state;

    return (
      <section id="tabs" className="project-tab">
        <div className="container">
          <header className="jumpotron">
            <h3>
              <strong>Welcome {currentUser.user.username}</strong>
            </h3>
          </header>
          <div className="row">
            <div className="col-md-12">
              <nav>
                <div
                  className="nav nav-tabs nav-fill"
                  id="nav-tab"
                  role="tablist"
                >
                  <a
                    className="nav-item nav-link active"
                    id="nav-home-tab"
                    data-toogle="tab"
                    role="tab"
                    aria-controls="nav-project"
                    aria-selected="true"
                  >
                    React Project
                  </a>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active table-responsive-lg"
                  id="nav-home"
                  role="tabpanel"
                  aria-aria-labelledby="nav-home-tab"
                >
                  <table className="table" cellSpacing="0">
                    <thead>
                      <tr>
                        <th>Project Name</th>
                        <th>Project Description</th>
                        <th>Task Name</th>
                        <th>Task Description</th>
                        <th>Mark Complete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <a>1</a>
                        </td>
                        <td>
                          <a>useEffect</a>
                        </td>
                        <td>
                          <a>Create a React Component Using UseEffect</a>
                        </td>
                        <td>
                          <a>Create a React Component</a>
                        </td>

                        <td>
                          <button>Mark Complete</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
