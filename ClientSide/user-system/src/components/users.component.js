import axios from "axios";
import React from "react";
import { Table } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

export default class GetAllUsers extends React.Component {
  state = {
    items: [],
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
            <th>User Id</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Active</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phonenumber}</td>
              <td>{user.is_deleted === 0 ? "True" : "False"}</td>
              <td>
                <Icon.Trash color="red" size={20} onClick={console.log("Unataka")}/>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}
