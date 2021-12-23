import axios from "axios";
import React, { Component } from "react";

import UserService from "../services/user.service";

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
      

      return item;
    });
    return (
      <section id="services" className="container">
        <h2 className="display-4 text-center mt-5 mb-3">View Projects</h2>
        {listItems.map((list) => (
          <div key={list.id} className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  className="card-img-top"
                  src="https://tinyurl.com/5ydva57m"
                  alt="Description"
                />
                <div className="card-body">
                  <h4 className="card-title">{list.project_name}</h4>
                  <p className="card-text">{list.project_desc}</p>
                </div>
                <div className="card-footer py-4">
                  <a href="/login" className="btn btn-secondary">
                    Login To Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }
}
