import axios from "axios";
import React from "react";
import { Table } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

export default class GetTasks extends React.Component {
  state = {
    id: "",
    taskItems: [],
  };

  handleChange = (e) => {
    this.setState({ id: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:9000/tasks/tasks/${this.state.id}`)
      .then((res) => {
        console.log(res.data);
        const taskItems = res.data;
        this.setState({ taskItems });
        return res.data;
      });
  };
  render() {
    let getAllTasks = this.state.taskItems.map((taskItem) => {
      return taskItem;
    });
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Project ID:
            <input type="number" name="id" onChange={this.handleChange} />
          </label>
          <button type="submit">Get Tasks</button>
        </form>
        <Table striped bordered hover responsive="md">
          <thead>
            <tr>
              <th>Project Id</th>
              <th>Task Id</th>
              <th>Task Name</th>
              <th>Task Description</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {getAllTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.project_id}</td>
                <td>{task.id}</td>
                <td>{task.task_name}</td>
                <td>{task.task_desc}</td>
                <td>{task.is_deleted===true ? "Inactive" :"Active"}</td>
                <td>
                  <Icon.Trash color="red" size={20} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
