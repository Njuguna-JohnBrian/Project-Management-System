import React from "react";

import CreateTask from "../Tasks/createTask";
import Projects from "./projects.component";

export default class CreateAssign extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Projects />
        <CreateTask />
      </div>
    );
  }
}
