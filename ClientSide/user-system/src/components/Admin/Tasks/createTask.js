import React from "react";
import axios from "axios";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import userService from "../../../services/user.service";

// Global input validator
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

// Check Taskname
const vtaskname = (value) => {
  if (value.length < 5) {
    return (
      <div className="alert alert-danger" role="alert">
        The Task Name must have more than 5 characters.
      </div>
    );
  }
};

// Check Task Description
const vtaskdesc = (value) => {
  if (value.length < 5) {
    return (
      <div className="alert alert-danger" role="alert">
        The Task Description must have 5 characters.
      </div>
    );
  }
};

const vproject_id = (value) => {
  if (value < 0) {
    return (
      <div className="alert alert-danger" role="alert">
        Project Id Must be a positive Number.
      </div>
    );
  }
};

export default class CreateTask extends React.Component {
  constructor(props) {
    super(props);

    this.handleCreateTask = this.handleCreateTask.bind(this);
    this.onChangeTaskname = this.onChangeTaskname.bind(this);
    this.onChangeTaskdesc = this.onChangeTaskdesc.bind(this);
    this.onChangeProjectid = this.onChangeProjectid.bind(this);

    this.state = {
      task_name: "",
      task_desc: "",
      project_id: "",
      items: [],
      successful: false,
      message: "",
    };
  }

  onChangeTaskname(e) {
    this.setState({
      task_name: e.target.value,
    });
  }

  onChangeTaskdesc(e) {
    this.setState({
      task_desc: e.target.value,
    });
  }

  onChangeProjectid(e) {
    this.setState({
      project_id: e.target.value,
    });
  }

  handleCreateTask(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });
    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      userService
        .createTask(
          this.state.task_name,
          this.state.task_desc,
          this.state.project_id
        )
        .then(
          (response) => {
            this.setState({
              message: response.data.message,
              successful: true,
            });
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            this.setState({
              successful: true,
              message: resMessage,
            });
          }
        );
    }
  }
  componentDidMount() {
    axios.get("http://localhost:9000/projects/all").then((res) => {
      const items = res.data;

      this.setState({ items });
    });
  }
  render() {
    let getProjectId = this.state.items.map((item) => {
      console.log(item.id);
      return item;
    });
    return (
      <div className="col-md-12">
        <Form
          onSubmit={this.handleCreateTask}
          ref={(c) => {
            this.form = c;
          }}
        >
          {!this.state.successful && (
            <div>
              <div className="form-group">
                <label htmlFor="taskname">Task Name</label>
                <Input
                  type="text"
                  name="taskname"
                  className="form-control"
                  value={this.state.task_name}
                  onChange={this.onChangeTaskname}
                  validations={[required, vtaskname]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="taskdesc">Task Description</label>
                <Input
                  type="text"
                  name="taskdesc"
                  className="form-control"
                  value={this.state.task_desc}
                  onChange={this.onChangeTaskdesc}
                  validations={[required, vtaskdesc]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="projectid">Select Project Id</label>
                <div className="select-container">
                  <select
                    value={this.state.project_id ? this.state.project_id : ""}
                    onChange={this.onChangeProjectid}
                    className="form-control"
                  >
                    <option value="" disabled></option>
                    {getProjectId.map((projId) => (
                      <option
                        value={projId.id}
                        style={{ fontWeight: "bolder" }}
                      >
                        {projId.id}{" "}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ paddingTop: "20px" }}>
                <button className="btn btn-primary btn-block">
                  Create Task
                </button>
              </div>
            </div>
          )}
          {this.state.message && (
            <div className="form-group">
              <div
                className={
                  this.state.successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {this.state.message}
              </div>
            </div>
          )}

          <CheckButton
            style={{ display: "none" }}
            ref={(c) => {
              this.checkBtn = c;
            }}
          />
        </Form>
      </div>
    );
  }
}
