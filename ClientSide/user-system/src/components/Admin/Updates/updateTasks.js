import React from "react";
import axios from "axios";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

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

// Check Task Name
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

export default class UpdateProject extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdateTask = this.handleUpdateTask.bind(this);
    this.onChangeTaskname = this.onChangeTaskname.bind(this);
    this.onChangeTaskdesc = this.onChangeTaskdesc.bind(this);
    this.onChangeTaskid = this.onChangeTaskid.bind(this);

    this.state = {
      task_name: "",
      task_desc: "",
      task_id: "",
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

  onChangeTaskid(e) {
    this.setState({
      task_id: e.target.value,
    });
  }

  handleUpdateTask(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });
    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      axios
        .patch(`http://localhost:9000/tasks/update/${this.state.task_id}`, {
          task_name: this.state.task_name,
          task_desc: this.state.task_desc,
        })
        .then(
          (response) => {
            console.log(response.data);
            this.setState({
              message: response.data.message,
              successful: true,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
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
    axios.get("http://localhost:9000/tasks/all").then((res) => {
      const items = res.data;

      this.setState({ items });
    });
  }
  render() {
    return (
      <div className="col-md-12">
        <Form
          onSubmit={this.handleUpdateTask}
          ref={(c) => {
            this.form = c;
          }}
        >
          {!this.state.successful && (
            <div>
              <div className="form-group">
                <label htmlFor="taskid">Select Task To Update</label>
                <div className="select-container">
                  <select
                    value={this.state.task_id ? this.state.task_id : ""}
                    onChange={this.onChangeTaskid}
                    className="form-control"
                  >
                    <option value="" disabled></option>
                    {this.state.items.map((taskId) => (
                      <option
                        value={taskId.id}
                        style={{ fontWeight: "bolder" }}
                      >
                        {taskId.task_name}:{taskId.id}{" "}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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

              <div className="form-group" style={{ paddingTop: "20px" }}>
                <button className="btn btn-primary btn-block">
                  Update Task
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
