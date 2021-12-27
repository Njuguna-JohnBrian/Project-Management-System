import axios from "axios";
import React from "react";
import { Button, Table } from "react-bootstrap";

import * as Icon from "react-bootstrap-icons";

export default class GetAllProjects extends React.Component {
  state = {
    items: [],
    id: "",
  };

  componentDidMount() {
    axios.get("http://localhost:9000/projects/all").then((res) => {
      const items = res.data;
      this.setState({ items });
    });
  }
  handleDelete = (id, e) => {
    axios.delete(`http://localhost:9000/projects/delete/${id}`).then((res) => {
      const items = this.state.items.filter((item) => item.id !== id);

      this.setState({ items });
    });
  };

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
          {this.state.items.map((item) => (
            <tr key={item.id}>
              <td>{item.project_name}</td>
              <td>{item.project_desc}</td>
              <td>{item.user_id == null ? "False" : "True"}</td>
              <td>{item.id}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={(e) => this.handleDelete(item.id, e)}
                >
                  Delete Project
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
