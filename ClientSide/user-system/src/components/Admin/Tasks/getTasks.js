import axios from "axios";
import React from "react";
import { Form, Table } from "react-bootstrap";
import Input from "react-validation/build/input";
import * as Icon from "react-bootstrap-icons";

export default class GetTasks extends React.Component {
  state = {
    id: "",
    idItems: [],
    taskItems: [],
    message: "",
  };

  handleChange = (e) => {
    this.setState({ id: e.target.value });
  };

  componentDidMount() {
    axios.get("http://localhost:9000/projects/all").then((res) => {
      const idItems = res.data;

      this.setState({ idItems });
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.get(`http://localhost:9000/tasks/tasks/${this.state.id}`).then(
      (res) => {
        console.log(res.data);
        const taskItems = res.data;
        this.setState({ taskItems });
        console.log(taskItems);
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

  handleDelete = (taskId, e) => {
    axios.delete(`http://localhost:9000/tasks/delete/${taskId}`).then((res) => {
      const taskItems = this.state.taskItems.filter(
        (item) => item.id !== taskId
      );
      console.log(taskItems);
      this.setState({ taskItems });
    });
  };

  render() {
    let getProjectId = this.state.idItems.map((idItem) => {
      return idItem;
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
            <label htmlFor="projectid">Select Project Id</label>
            <div className="select-container">
              <select
                value={this.state.id ? this.state.id : ""}
                onChange={this.handleChange}
                className="form-control"
              >
                <option value="" disabled></option>
                {getProjectId.map((projId) => (
                  <option
                    key={projId.id}
                    value={projId.id}
                    style={{ fontWeight: "bolder" }}
                  >
                    {projId.project_name}:{projId.id}
                  </option>
                ))}
              </select>
            </div>
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
            {this.state.taskItems.map((task) => (
              <tr key={task.id}>
                <td>{task.project_id}</td>
                <td>{task.id}</td>
                <td>{task.task_name}</td>
                <td>{task.task_desc}</td>
                <td>{task.is_deleted === true ? "Inactive" : "Active"}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => this.handleDelete(task.id, e)}
                  >
                    Delete Task
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
