import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DropdownButton, Dropdown } from "react-bootstrap";

const Exercise = props => (
  <tr>
    <td>{props.exercise.weight}</td>
    <td>{props.exercise.typeOfExercise}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onSelectDropDown = this.onSelectDropDown.bind(this);
    this.sortFilteredExercises = this.sortFilteredExercises.bind(this);
    this.sortExercises = this.sortExercises.bind(this);

    this.state = {
      exercises: [],
      searchRes: "",
      dropDownSel: "Type",
      filteredExercises: []
    };
  }

  onChangeSearch(e) {
    const search = e.target.value.toLowerCase();

    if (this.state.dropDownSel === "Description") {
      this.setState({
        searchRes: search,
        filteredExercises: this.state.exercises.filter(exer =>
          exer.description.toLowerCase().includes(search)
        )
      });
    } else if (this.state.dropDownSel === "Type") {
      this.setState({
        searchRes: search,
        filteredExercises: this.state.exercises.filter(exer =>
          exer.typeOfExercise.toLowerCase().includes(search)
        )
      });
    } else {
      this.setState({
        searchRes: search,
        filteredExercises: this.state.exercises.filter(exer =>
          exer.date.includes(search)
        )
      });
    }
    //this.sortFilteredExercises();
  }

  sortFilteredExercises() {
    this.setState({
      filteredExercises: this.state.filteredExercises.sort(
        (date1, date2) => date2.date - date1.date
      )
    });
    console.log("We sorting bruh");
    console.log(this.state.filteredExercises);
  }

  onSelectDropDown(evt) {
    this.setState({ dropDownSel: evt });
  }

  sortExercises() {
    console.log("sorting");
    this.setState({
      exercises: this.state.exercises.sort(function(date1, date2) {
        console.log("Date1: " + date1.date);
        console.log("Date2: " + date2.date);
        return date1.date - date2.date;
      })
    });
    console.log(this.state.exercises);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/")
      .then(response => {
        this.setState({
          exercises: response.data,
          filteredExercises: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
    console.log("exercises: " + this.state.exercises);
    //test
    this.sortExercises();
  }

  deleteExercise(id) {
    axios.delete("http://localhost:5000/exercises/" + id).then(response => {
      console.log(response.data);
    });
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id),
      filteredExercises: this.state.exercises.filter(el => el._id !== id)
    });
  }

  exerciseList() {
    return this.state.filteredExercises
      .map(currentexercise => {
        return (
          <Exercise
            exercise={currentexercise}
            deleteExercise={this.deleteExercise}
            key={currentexercise._id}
          />
        );
      })
      .reverse();
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <DropdownButton
          id="dropdown-basic-button"
          title={"Filter by " + this.state.dropDownSel}
          onSelect={this.onSelectDropDown}
        >
          <Dropdown.Item eventKey="Type">Type of Exercise</Dropdown.Item>
          <Dropdown.Item eventKey="Description">Description</Dropdown.Item>
          <Dropdown.Item eventKey="Date">Date</Dropdown.Item>
        </DropdownButton>
        <input
          type="text"
          className="form-control"
          value={this.state.searchRes}
          onChange={this.onChangeSearch}
        />

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Weight</th>
              <th>Type of Exercise</th>
              <th>Description</th>
              <th>Duration/Reps</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
