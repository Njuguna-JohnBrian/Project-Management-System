import axios from "axios";
import React, { Component } from "react";
// import UserService from "../../../src/services/user.service";

import "./Home.css";


export default class ProjectsCard extends Component {
  state = {
    items: [],
  };
  componentDidMount() {
    axios.get("http://localhost:9000/projects/all").then((res) => {
      const items = res.data;
      this.setState({ items });
    });
  }

  render() {
    let listItems = this.state.items.map((item) => {
      console.log(item);
      return item;
    });
    return (
      <div>
        <h2 className="display-4 text-center mt-5 mb-3">View Projects</h2>

        <div class="container" style={{ display: "flex", flexWrap: "wrap" }}>
          {listItems.map((list) => (
            <div
              className="card"
              style={{ width: "350px" }}
              key={list.project_id}
            >
              <img
                className="card-img-top"
                src="https://tinyurl.com/5ydva57m"
                alt="Card image"
              />
              <div className="card-body">
                <h4 className="card-title">{list.project_name}</h4>
                <p className="card-text">{list.project_desc}</p>
                <a href="/login" className="btn btn-primary">
                  Login To Get Started
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
