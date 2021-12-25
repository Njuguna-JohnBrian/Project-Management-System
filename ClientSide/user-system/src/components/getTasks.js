import axios from "axios";
import React from "react";
import { Form, Table } from "react-bootstrap";
import Input from "react-validation/build/input";
import * as Icon from "react-bootstrap-icons";

export default class GetTasks extends React.Component {
  state = {
    id: "",
    taskItems: [],
    taskId: "",
    message: "",
  };

  handleChange = (e) => {
    this.setState({ id: e.target.value });
  };
  handleTaskChange = (e) => {
    this.setState({ taskId: e.target.value });
  };

  handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:9000/tasks/delete/${this.state.taskId}`)
      .then((res) => {
        const taskId = res.data;
        this.setState({ taskId });
        return res.data;
      });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    axios.get(`http://localhost:9000/tasks/tasks/${this.state.id}`).then(
      (res) => {
        console.log(res.data);
        const taskItems = res.data;
        this.setState({ taskItems });
        return res.data;
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          message: resMessage,
        });
      }
    );
  };
  render() {
    let getAllTasks = this.state.taskItems.map((taskItem) => {
      return taskItem;
    });
    return (
      <div>
        <Form
          onSubmit={this.handleSubmit}
          ref={(c) => {
            this.form = c;
          }}
        >
          <div className="form-group">
            <label>
              Project ID:
              <input
                type="number"
                name="id"
                onChange={this.handleChange}
                value={this.state.id}
              />
            </label>
            <button type="submit" className="btn btn-primary btn-block">
              Get Tasks
            </button>
          </div>
          {this.state.message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {this.state.message}
              </div>
            </div>
          )}
        </Form>
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
                <td>{task.is_deleted === true ? "Inactive" : "Active"}</td>
                <td>
                  {
                    <form onSubmit={this.handleDelete}>
                      <input
                        type="number"
                        name="id"
                        onChange={this.handleTaskChange}
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
      </div>
    );
  }
}
