import React, { Component } from "react";

import UserService from "../services/user.service";

import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header classname="jumpotron">
          <h3>{this.state.content}</h3>
          <div class="container-fluid text-center">
            <h1 class="display-3">
              The Best Projects Solution for Your Business
            </h1>
            <p class="lead pb-4">
              We help you maximize profits by building scalable projects.
            </p>
            <p>
              <a href="/login" class="btn btn-primary btn-lg" role="button">
                Login To Get Started
              </a>
            </p>
          </div>
        </header>
      </div>
    );
  }
}
