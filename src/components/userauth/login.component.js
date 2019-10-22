import React, { Component } from 'react';
import axios from 'axios'; // This is for HTTP requests

export default class Login extends Component {
	constructor (props) {
		super(props);

		// bind the keyword "this"
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		// State is a variable in REACT
		// ex you do not use let var =...
		this.state = {
			username: '',
			password: ''
		};
	}

	onChangeUsername (e) {
		this.setState({
			username: e.target.value
		});
	}

	onChangePassword (e) {
		this.setState({
			password: e.target.value
		});
	}

	onSubmit (e) {
		e.preventDefault();

		const user = {
			username: this.state.username,
			password: this.state.password
		};

		console.log(user);

		axios.post('http://localhost:5000/users/add', user).then((res) => console.log(res.data));

		this.setState({
			username: '',
			password: ''
		});
	}

	render () {
		return (
			<div>
				<h3>Log Into Exercise Tracker</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<input
							type="text"
							required
							className="form-control"
							value={this.state.username}
							onChange={this.onChangeUsername}
							placeholder="Username"
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
					<input type="submit" value="Create Account" className="btn btn-primary" />
				</form>
			</div>
		);
	}
}
