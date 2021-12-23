import axios from "axios";
import React from "react";


export default class GetTasks extends React.Component {
  state = {
    id: "",
  };

  handleChange = (e) => {
    this.setState({ id: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:9000/tasks/tasks/${this.state.id}`)
      .then((res) => {
        return res.data;
      });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Project ID:
            <input type="number" name="id" onChange={this.handleChange} />
          </label>
          <button type="submit">Get Tasks</button>
        </form>
      </div>
    );
  }
}
