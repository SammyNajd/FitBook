import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { isThisSecond } from 'date-fns';

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

    this.state = {exercises: [],
                  searchRes: ""};
  }



  onChangeSearch(e){
    this.setState({searchRes: e.target.value.toLowerCase()});
    console.log(this.state.searchRes);
    if(this.state.searchRes.length > 1 ){
      this.setState({
        exercises: this.state.exercises.filter(exer => exer.description.includes(this.state.searchRes))
    })}
    else{
      this.componentDidMount();
    }
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
    let filteredRes = this.props.exercises;
    return (
      <div>
        <h3>Logged Exercises</h3>
        <h6>Filter by Description</h6>
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
              <th>Duration</th>
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