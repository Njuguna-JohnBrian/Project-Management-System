import axios from "axios";
import React from "react";
import { Table } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

export default class GetAllUsers extends React.Component {
  state = {
    items: [],
    id: "",
  };

  componentDidMount() {
    axios.get("/admin/all").then((res) => {
      const items = res.data;
      this.setState({ items });
    });
  }
  handleDelete = (id, e) => {
    axios.delete(`/admin/delete/${id}`).then((res) => {
      const items = this.state.items.filter((item) => item.id !== id);
      console.log(items);
      this.setState({ items });
    });
  };

  render() {
    return (
      <Table striped bordered hover responsive="md">
        <thead>
          <tr>
            <th>UserName</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Active</th>
            <th>User Id</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {this.state.items.map((item) => (
            <tr key={item.id} onChange={this.handleChange}>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.phonenumber}</td>
              <td>{item.is_deleted == 0 ? "True" : "False"}</td>
              <td>{item.id}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={(e) => this.handleDelete(item.id, e)}
                >
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
