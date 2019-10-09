import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; 
import axios from 'axios';

export default class CreateExercise extends Component{

    constructor(props){
        super(props);

        // bind the keyword "this" 
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // State is a variable in REACT
        // ex you do not use let var =...
        this.state = {
            username: '',
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
    onChangeUserName(e){
        this.setState({
            username: e.target.value
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
            username: this.state.username,
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
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUserName}>
                            {
                                this.state.users.map(function(user){
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                        </option>;
                                })
                            }
                            </select>
                    </div>
                    <div className="form-group">
                        <label> Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label> Duration (in minutes): </label>
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