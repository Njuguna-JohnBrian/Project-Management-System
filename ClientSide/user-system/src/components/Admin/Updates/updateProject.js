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

// Check Projectname
const vprojectname = (value) => {
  if (value.length < 5) {
    return (
      <div className="alert alert-danger" role="alert">
        The Task Name must have more than 5 characters.
      </div>
    );
  }
};

// Check Task Description
const vprojectdesc = (value) => {
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

export default class UpdateProject extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdateProject = this.handleUpdateProject.bind(this);
    this.onChangeProjectname = this.onChangeProjectname.bind(this);
    this.onChangeProjectdesc = this.onChangeProjectdesc.bind(this);
    this.onChangeProjectid = this.onChangeProjectid.bind(this);

    this.state = {
      project_name: "",
      project_desc: "",
      project_id: "",
      items: [],
      successful: false,
      message: "",
    };
  }

  onChangeProjectname(e) {
    this.setState({
      project_name: e.target.value,
    });
  }

  onChangeProjectdesc(e) {
    this.setState({
      project_desc: e.target.value,
    });
  }

  onChangeProjectid(e) {
    this.setState({
      project_id: e.target.value,
    });
  }

  handleUpdateProject(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });
    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      axios
        .patch(`http://localhost:9000/projects/update/${this.state.project_id}`)
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
          onSubmit={this.handleUpdateProject}
          ref={(c) => {
            this.form = c;
          }}
        >
          {!this.state.successful && (
            <div>
              <div className="form-group">
                <label htmlFor="projectid">Select Project To Update</label>
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
                        {projId.project_name}:{projId.id}{" "}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="projectname">Project Name</label>
                <Input
                  type="text"
                  name="projectname"
                  className="form-control"
                  value={this.state.project_name}
                  onChange={this.onChangeProjectname}
                  validations={[required, vprojectname]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="projectdesc">Project Description</label>
                <Input
                  type="text"
                  name="projectdesc"
                  className="form-control"
                  value={this.state.task_desc}
                  onChange={this.onChangeProjectdesc}
                  validations={[required, vprojectdesc]}
                />
              </div>

              <div className="form-group" style={{ paddingTop: "20px" }}>
                <button className="btn btn-primary btn-block">
                  Update Project
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
