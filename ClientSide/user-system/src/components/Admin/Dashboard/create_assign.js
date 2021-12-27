import React from "react";

import CreateTask from "../Tasks/createTask";
import Projects from "../Projects/projects.component";
import AssignProject from "../Projects/assignProject";

export default class CreateAssign extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Projects />
        <CreateTask />
        <AssignProject />
      </div>
    );
  }
}
