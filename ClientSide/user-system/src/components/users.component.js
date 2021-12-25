import axios from "axios";
import React from "react";
import { Table } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

export default class GetAllUsers extends React.Component {
  state = {
    items: [],
    userId: "",
  };

  handleChange = (e) => {
    this.setState({ userId: e.target.value });
  };
  handleDelete = (e) => {
    e.preventDefault();

    axios.delete(`/admin/delete/${this.state.userId}`).then((res) => {
      const userId = res.data;
      this.setState({ userId });
      return res.data;
    });
  };
  componentDidMount() {
    axios.get("/admin/all").then((res) => {
      const items = res.data;
      this.setState({ items });
    });
  }
  render() {
    let allUsers = this.state.items.map((item) => {
      return item;
    });
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
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phonenumber}</td>
              <td>{user.is_deleted == 0 ? "True" : "False"}</td>
              <td>{user.id}</td>
              <td>
               s {
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
