import axios from "axios";
import React from "react";
import { Button, Table } from "react-bootstrap";

import * as Icon from "react-bootstrap-icons";

export default class GetAllProjects extends React.Component {
  state = {
    items: [],
    projectId: "",
  };

  handleChange = (e) => {
    this.setState({ projectId: e.target.value });
  };
  handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:9000/projects/delete/${this.state.projectId}`)
      .then((res) => {
        const projectId = res.data;
        this.setState({ projectId });
        return res.data;
      });
  };

  componentDidMount() {
    axios.get("http://localhost:9000/projects/all").then((res) => {
      const items = res.data;
      this.setState({ items });
    });
  }
  render() {
    let allProjects = this.state.items.map((item) => {
      console.log(item);
      console.log(item);
      return item;
    });
    return (
      <Table striped bordered hover responsive="md">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Project Description</th>
            <th>Assigned</th>
            <th>Project Id</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allProjects.map((project) => (
            <tr key={project.id}>
              <td>{project.project_name}</td>
              <td>{project.project_desc}</td>
              <td>{project.user_id == null ? "False" : "True"}</td>
              <td>{project.id}</td>
              <td>
                {
                  <form onSubmit={this.handleDelete}>
                    <input
                      type="number"
                      name="id"
                      onChange={this.handleChange}
                    />

                    <button type="submit">
                      <Icon.Trash color="red" size={20} />
                    </button>
                  </form>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
