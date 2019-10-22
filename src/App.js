import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/navbar.component';
import Login from './components/userauth/login.component';
import ExercisesList from './components/exercises-list.component';
import EditExercise from './components/edit-exercise.component';
import CreateUser from './components/create-user.component';
import CreateExercise from './components/create-exercise.component';
import HomePage from './components/home-page.component';

function App () {
	return (
		<Router>
			<div className="container">
				<Navbar />
				<br />
				<Route path="/" exact component={ExercisesList} />
				<Route path="/home" component={HomePage} />
				<Route path="/edit/:id" component={EditExercise} />
				<Route path="/create" component={CreateExercise} />
				<Route path="/user" component={CreateUser} />
				<Route path="/login" component={Login} />
			</div>
		</Router>
	);
}

export default App;
