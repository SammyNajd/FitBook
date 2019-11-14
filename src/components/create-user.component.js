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
    this.displayEmailStatus = this.displayEmailStatus.bind(this);
    this.enableButton = this.enableButton.bind(this);

    // State is a variable in REACT
    // ex you do not use let var =...
    this.state = {
      username: "",
      password: "",
      email: "",
      minChar: 2,
      minPass: 5,
      userArray: [],
      emailArray: [],
      usernameStatus: "Username: ",
      emailStatus: "Email Address: ",
      passwordStatus: "Password: ",
      enabled: false,
      userCorrect: false,
      emailCorrect: false,
      passwordCorrect: false
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
          if (this.state.userArray.indexOf(this.state.username) === -1) {
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

    this.setState({
      userArray: []
    });

    this.enableButton();
  }

  displayUsernameStatus(flag) {
    if (flag) {
      this.setState({
        usernameStatus: "Username: This username is currently available",
        userCorrect: true
      });
    } else {
      this.setState({
        usernameStatus: "Username: This username is already taken",
        userCorrect: false
      });
    }
  }

  enableButton() {
    if (
      this.state.userCorrect &&
      this.state.emailCorrect &&
      this.state.passwordCorrect
    ) {
      this.setState({
        enabled: true
      });
    } else {
      this.setState({
        enabled: false
      });
    }
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });

    if (this.state.password.length < this.state.minPass) {
      this.setState({
        passwordStatus: "Password: Invalid, must be >6 characters",
        passwordCorrect: false
      });
    } else {
      this.setState({
        passwordStatus: "Password: Valid",
        passwordCorrect: true
      });
    }

    this.enableButton();
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });

    // Check if the username is already taken
    if (this.state.email.length > this.state.minChar) {
      axios.get("http://localhost:5000/users/").then(res => {
        if (res.data.length > 0) {
          this.setState({
            emailArray: res.data.map(user => user.email)
          });

          // Validate email
          let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (re.test(this.state.email)) {
            if (this.state.emailArray.indexOf(this.state.email) !== -1) {
              this.displayEmailStatus(1);
            } else {
              this.displayEmailStatus(2);
            }
          } else {
            this.displayEmailStatus(3);
          }
        }
      });
    } else {
      this.setState({
        emailStatus: "Email Address: "
      });
    }

    this.setState({
      emailArray: []
    });

    this.enableButton();
  }

  displayEmailStatus(option) {
    if (option === 1) {
      this.setState({
        emailStatus: "Email Address: Currently taken/unavailable",
        emailCorrect: false
      });
    } else if (option === 2) {
      this.setState({
        emailStatus: "Email Address: Valid and available!",
        emailCorrect: true
      });
    } else {
      this.setState({
        emailStatus: "Email Address: Invalid Email address",
        emailCorrect: false
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

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
            <label>{this.state.emailStatus}</label>
            <input
              type="email"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
            <label>{this.state.passwordStatus} </label>
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
