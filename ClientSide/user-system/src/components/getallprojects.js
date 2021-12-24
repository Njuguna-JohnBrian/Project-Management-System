import axios from "axios";
import React from "react";
import { Button, Table } from "react-bootstrap";

import * as Icon from "react-bootstrap-icons";

export default class GetAllProjects extends React.Component {
  state = {
    items: [],
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
      return item;
    });
    return (
      <Table striped bordered hover responsive="md">
        <thead>
          <tr>
            <th>Project Id</th>
            <th>Project Name</th>
            <th>Project Description</th>
            <th>Assign</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allProjects.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.project_name}</td>
              <td>{project.project_desc}</td>
              <td></td>
              <td>
                <Icon.Trash color="red" size={20} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
