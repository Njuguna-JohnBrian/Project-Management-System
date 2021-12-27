import React from "react";
import axios from "axios";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import userService from "../../../services/user.service";

export default class AssignProject extends React.Component {
  constructor(props) {
    super(props);

    this.handleAssignProject = this.handleAssignProject.bind(this);
    this.onChangeUserId = this.onChangeUserId.bind(this);
    this.onChangeProjectid = this.onChangeProjectid.bind(this);

    this.state = {
      user_id: "",
      userItems: [],
      project_id: "",
      projectItems: [],
      successful: false,
      message: "",
    };
  }

  onChangeUserId(e) {
    this.setState({
      user_id: e.target.value,
    });
  }

  onChangeProjectid(e) {
    this.setState({
      project_id: e.target.value,
    });
  }

  handleAssignProject(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });
    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      userService.assignProject(this.state.project_id, this.state.user_id).then(
        (response) => {
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
    let projectRequest = axios.get("http://localhost:9000/projects/all");
    let usersRequest = axios.get("/admin/all");

    axios.all([projectRequest, usersRequest]).then(
      axios.spread((...responses) => {
        console.log(responses[0].data);
        const projectItems = responses[0].data;
        this.setState({ projectItems });
        const userItems = responses[1].data;
        console.log(userItems);
        this.setState({ userItems });
      })
    );
  }

  render() {
    return (
      <div className="col-md-12">
        <Form
          onSubmit={this.handleAssignProject}
          ref={(c) => {
            this.form = c;
          }}
        >
          {!this.state.successful && (
            <div>
              <div className="form-group">
                <label htmlFor="projectid">Select Project Id</label>
                <div className="select-container">
                  <select
                    className="form-control"
                    value={this.state.project_id ? this.state.project_id : ""}
                    onChange={this.onChangeProjectid}
                    className="form-control"
                  >
                    <option value="" disabled></option>
                    {this.state.projectItems.map((projItem) => (
                      <option
                        style={{ fontWeight: "bolder" }}
                        key={projItem.id}
                        value={projItem.id}
                      >
                        {projItem.project_name}:{projItem.id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="userid">Select User Id</label>
                <div className="select-container">
                  <select
                    className="form-control"
                    value={this.state.user_id ? this.state.user_id : ""}
                    onChange={this.onChangeUserId}
                    className="form-control"
                  >
                    <option value="" disabled></option>
                    {this.state.userItems.map((userItem) => (
                      <option
                        style={{ fontWeight: "bolder" }}
                        key={userItem.id}
                        value={userItem.id}
                      >
                        {userItem.username}:{userItem.id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ paddingTop: "20px", paddingBottom:"20px" }}>
                <button className="btn btn-primary btn-block">
                  Assign Project
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
