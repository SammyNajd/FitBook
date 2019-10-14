import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {DropdownButton, Dropdown} from 'react-bootstrap';

const Exercise = props => (
  <tr>
    <td>{props.exercise.weight}</td>
    <td>{props.exercise.typeOfExercise}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)
    this.onChangeSearch = this.onChangeSearch.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.onSelectDropDown = this.onSelectDropDown.bind(this)

    this.state = {exercises: [],
                  searchRes: "",
                  dropDownSel: ""};
  }



  onChangeSearch(e){
    this.setState({searchRes: e.target.value.toLowerCase()});
    if(this.state.searchRes.length > 1 ){
      this.setState({
        exercises: this.state.exercises.filter(exer => exer.description.includes(this.state.searchRes))
    })}
    else{
      this.componentDidMount();
    }
  }

  

  onSelectDropDown(evt){
    this.setState({dropDownSel: evt});
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }


  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <DropdownButton id="dropdown-basic-button" title={"Filter by " + this.state.dropDownSel} onSelect={this.onSelectDropDown}> 
          <Dropdown.Item eventKey="Type">Type of Exercise</Dropdown.Item>
          <Dropdown.Item eventKey="Description">Description</Dropdown.Item>
          <Dropdown.Item eventKey="Date">Date</Dropdown.Item> 
        </DropdownButton>
        <input type="text"
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
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}