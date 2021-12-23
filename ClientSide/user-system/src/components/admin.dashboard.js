import React from "react";
import {
  Navbar,
  Container,
  Offcanvas,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import ProjectsCard from "./home.project.card";
import Projects from "./projects.component";

export default class AdminDash extends React.Component {
  render() {
    return (
      <div>
        <Navbar bg="light" expand={false}>
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
                    <NavDropdown.Item href="/admindash/createproject">
                      Create Project
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
                    <NavDropdown.Item href="/admindash/createtask">
                      Create Task
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
    );
  }
}
