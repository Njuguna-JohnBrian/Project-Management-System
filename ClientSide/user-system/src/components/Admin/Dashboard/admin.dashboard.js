import React from "react";
import axios from "axios";
import * as Icon from "react-bootstrap-icons";

import {
  Navbar,
  Container,
  Offcanvas,
  Nav,
  NavDropdown,
  Table,
} from "react-bootstrap";
// import ProjectsCard from "./home.project.card";
// import Projects from "./projects.component";

export default class AdminDash extends React.Component {
  state = {
    projectTasks: [],
  };
  handleChange = (e) => {
    this.setState({ userId: e.target.value });
  };
  componentDidMount() {
    axios.get("http://localhost:9000/projects/projtasks").then((res) => {
      const projectTasks = res.data;

      this.setState({
        projectTasks,
      });
    });
  }
  render() {
    let projectsTasks = this.state.projectTasks.map((projectTask) => {
      return projectTask;
    });

    return (
      <div>
        <div>
          <Navbar bg="light" expand={false} sticky="top" fixed="bottom">
            <Container fluid>
              <Navbar.Brand href="#"></Navbar.Brand>
              <Navbar.Toggle aria-controls="offcanvasNavbar" />
              <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="offcanvasNavbarLabel">
                    Select And Proceed
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <NavDropdown title="Users" id="offcanvasNavbarDropdown">
                      <NavDropdown.Item href="/admindash/getallusers">
                        Get All Users
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Get One User
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Update User
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Delete User
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Projects" id="offcanvasNavbarDropdown">
                      <NavDropdown.Item href="/admindash/create">
                        Create Project,Task and Assign
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/admindash/allprojects">
                        Get All Projects
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Get One Project
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Assign Project
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Get All Projects And Tasks
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Update Project
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Delete Project
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Tasks" id="offcanvasNavbarDropdown">
                      <NavDropdown.Item href="/admindash/gettasks">
                        Get All Tasks
                      </NavDropdown.Item>

                      <NavDropdown.Item href="#action4">
                        Get One Task
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Update Task
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Delete Task
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </div>
        <Table striped bordered hover responsive="md" style={{ marginTop: "" }}>
          <thead>
            <tr>
              <th>User Id</th>

              <th>Project Name</th>
              <th>Project Description</th>
              <th>Task Name</th>
              <th>Task Desc</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {projectsTasks.map((projtask) => (
              <tr>
                {projtask.user_id == null ? (
                  <a href="/admindash/create" className="form-group">
                    <button className="btn btn-primary btn-block">
                      Assign
                    </button>
                  </a>
                ) : (
                  <td>{projtask.user_id}</td>
                )}
                {/* <td>{projtask.user_id}</td> */}

                <td>{projtask.project_name}</td>
                <td>{projtask.project_desc}</td>
                {projtask.task_name == null ? (
                  <a href="/admindash/create" className="form-group">
                    <button className="btn btn-primary btn-block">
                      Create Task Name
                    </button>
                  </a>
                ) : (
                  <td>{projtask.task_name}</td>
                )}
                <td>{projtask.task_desc}</td>

                {/* use this to do updates */}
                <a href="/admindash/update">
                  <td>
                    <Icon.PencilSquare style={{ color: "red" }} />
                  </td>
                </a>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
