import React, { Component } from "react";
import axios from "axios"; // This is for HTTP requests

export default class CreateUsers extends Component {
  constructor(props) {
    super(props);

    // bind the keyword "this"
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.displayUsernameStatus = this.displayUsernameStatus.bind(this);

    // State is a variable in REACT
    // ex you do not use let var =...
    this.state = {
      username: "",
      password: "",
      email: "",
      minChar: 2,
      userArray: [],
      emailArray: [],
      usernameStatus: "Username: ",
      enabled: false
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });

    // Check if the username is already taken
    if (this.state.username.length > this.state.minChar) {
      axios.get("http://localhost:5000/users/").then(res => {
        if (res.data.length > 0) {
          this.setState({
            userArray: res.data.map(user => user.username)
          });
          if (this.state.userArray.indexOf(this.state.username) !== -1) {
            this.displayUsernameStatus(true);
          } else {
            this.displayUsernameStatus(false);
          }
        }
      });
    } else {
      this.setState({
        usernameStatus: "Username: "
      });
    }
  }

  displayUsernameStatus(flag) {
    if (flag) {
      this.setState({
        usernameStatus: "Username: This username is already taken"
      });
    } else {
      this.setState({
        usernameStatus: "Username: This username is currently available"
      });
    }
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    console.log(user);

    axios
      .post("http://localhost:5000/users/add", user)
      .then(res => console.log(res.data));

    this.setState({
      username: "",
      email: "",
      password: ""
    });

    window.location = "/home";
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>{this.state.usernameStatus}</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
            <label>Email Address: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
            <label>Password: </label>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
              disabled={!this.state.enabled}
            />
          </div>
        </form>
      </div>
    );
  }
}
