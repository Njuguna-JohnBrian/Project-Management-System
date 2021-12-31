import React from "react";
import UpdateProject from "./updateProject";
import UpdateTask from "./updateTasks";

export default class Updates extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <UpdateProject />
        <UpdateTask />
      </div>
    );
  }
}
