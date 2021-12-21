import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login.component";
import Register from "./components/register.component";

class App extends Component {
  render() {
    return <Register />;
    // (<Login />)
  }
}

export default App;
