import React, { Component } from "react";
import AuthService from "../../../src/services/auth.service";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBDataTable } from 'mdbreact';
import "./user.dashboard.css";


import axios from "axios";

export default class UserDash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      userProjects: [],
      project_name: "",
      project_desc: "",
      task_name: "",
      task_desc: "",
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://localhost:9000/projects/userproject/${this.state.currentUser.user.id}`
      )
      .then((res) => {
        const userProjects = res.data;
        console.log(userProjects);

        const project_name = res.data.project_name;
        this.setState({ project_name });

        const project_desc = res.data.project_desc;
        this.setState({ project_desc });

        const task_name = res.data.task_name;
        this.setState({ task_name });

        const task_desc = res.data.task_desc;
        this.setState({ task_desc });

        this.setState({ userProjects });
        console.log(this.state.currentUser.user.id);
      });
    console.log(this.state.currentUser.user.id);
  }

  render() {
    const { currentUser } = this.state;

    const userDetails = {
      columns: [
        {
          label: "Project Name",
          field: "projectname",
          sort: "asc",
          width: 200,
        },
        {
          label: "Project Description",
          field: "projectdesc",
          sort: "asc",
          width: 270,
        },
        {
          label: "Task Name",
          field: "taskname",
          sort: "asc",
          width: 200,
        },
        {
          label: "Task Desc",
          field: "taskdesc",
          sort: "asc",
          width: 270,
        },
      ],

      rows: [
        {
          projectname: this.state.project_name,
          projectdesc: this.state.project_desc,
          taskname: this.state.task_desc,
          taskdesc: this.state.task_desc,
        },
      ],
    };

    return (
      <section id="tabs" className="project-tab">
        <div className="container">
          <header className="jumpotron">
            <h3>
              <strong>Welcome {currentUser.user.username}</strong>
            </h3>
          </header>
        </div>
        <MDBDataTable 
        striped
        bordered
        small
        data={userDetails}/>
       
      </section>
    );
  }
}
