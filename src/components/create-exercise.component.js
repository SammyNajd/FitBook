import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; 
import axios from 'axios';

export default class CreateExercise extends Component{

    constructor(props){
        super(props);

        // bind the keyword "this" 
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangeTypeOfExercise = this.onChangeTypeOfExercise.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // State is a variable in REACT
        // ex you do not use let var =...
        this.state = {
            weight: 0,
            typeOfExercise: '',
            description:'',
            duration:0,
            date: new Date(),
            users: []
        }
    }

    // React lifecycle method, automatically called by react
    // called right before anything loads on the page
    componentDidMount() {
        axios.get('http://localhost:5000/users/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                users: response.data.map(user => user.username),
                username: response.data[0].username
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
    
      }

    // Change the user name
    // Always use setState, never just reassign values
    onChangeWeight(e){
        this.setState({
            weight: e.target.value
        })
    }

    onChangeTypeOfExercise(e){
        this.setState({
            typeOfExercise: e.target.value
        })
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        })
    }


    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        })
    }


    onChangeDate(date){
        this.setState({
            date: date
        })
    }

    onSubmit(e){
        e.preventDefault();

        const exercise = {
            weight: this.state.weight,
            typeOfExercise: this.state.typeOfExercise,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data));

        console.log(exercise);

        window.location = '/';
    }

    //left off at 11134
    render(){
        return(
            <div>
                <h3> Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>

                    
                    <div className="form-group">
                        <label>Type of Exercise</label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.typeOfExercise}
                            onChange={this.onChangeTypeOfExercise}
                            >
                                <option>Cardio/PlyoMetrics</option>
                                <option>Weight/Resistance</option>
                            </select>
                    </div>
                    <div className="form-group">
                        <label>Weight (lbs): </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.weight} 
                               onChange={this.onChangeWeight} 
                               />
                    </div>
                    <div className="form-group">
                        <label> Workout Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label> Duration (reps or minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}