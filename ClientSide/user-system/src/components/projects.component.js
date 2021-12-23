import React from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import userService from "../services/user.service";

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

// Check Project Name
const vprojectname = (value) => {
  if (value.length < 5 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The Project Name must be between 5 and 20 characters.
      </div>
    );
  }
};

// Check Project Description
const vprojectdesc = (value) => {
  if (value.length < 5) {
    return (
      <div className="alert alert-danger" role="alert">
        The Project Description must have 5 characters.
      </div>
    );
  }
};

export default class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.handleCreateProject = this.handleCreateProject.bind(this);
    this.onChangeProjectname = this.onChangeProjectname.bind(this);
    this.onChangeProjectdesc = this.onChangeProjectdesc.bind(this);

    this.state = {
      project_name: "",
      project_desc: "",
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

  handleCreateProject(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });
    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      userService
        .createProject(this.state.project_name, this.state.project_desc)
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
  render() {
    return (
      <div className="col-md-12">
        <Form
          onSubmit={this.handleCreateProject}
          ref={(c) => {
            this.form = c;
          }}
        >
          {!this.state.successful && (
            <div>
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
                  value={this.state.project_desc}
                  onChange={this.onChangeProjectdesc}
                  validations={[required, vprojectdesc]}
                />
              </div>
              
              <div className="form-group">
                <button className="btn btn-primary btn-block">
                  Create Project
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
