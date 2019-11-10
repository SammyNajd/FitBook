import React, { Component } from "react";
import axios from "axios"; // This is for HTTP requests

export default class Login extends Component {
  constructor(props) {
    super(props);

    // bind the keyword "this"
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitCreateNewAccount = this.onSubmitCreateNewAccount.bind(this);

    this.state = {
      email: "",
      password: ""
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(user);

    axios
      .post("http://localhost:5000/users/login", user)
      .then(res => console.log(res.data));

    this.setState({
      email: "",
      password: ""
    });

    window.location = "/home";
  }

  onSubmitCreateNewAccount(e) {
    e.preventDefault();
    window.location = "/user/add";
  }

  render() {
    return (
      <div>
        <h3>Log Into Exercise Tracker</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              placeholder="Email Address"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
          <input
            type="submit"
            onClick={this.onSubmitCreateNewAccount}
            value="Create Account"
            className="btn btn-primary"
          />
        </form>
      </div>
    );
  }
}
