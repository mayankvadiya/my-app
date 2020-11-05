import React,{Component} from "react";
import axios from "axios"
//notification
import {NotificationManager} from 'react-notifications'
export default class CreateToDo extends Component{

    constructor(props){
        super(props);
        this.state = {
            todo_description:'',
            todo_responsible:'',
            todo_priority:'',
            todo_completed:true,
        }
        this.onChangeToDoDescription = this.onChangeToDoDescription.bind(this);
        this.onChangeToDoResponsible = this.onChangeToDoResponsible.bind(this);
        this.onChangeToDoPriority = this.onChangeToDoPriority.bind(this);
        this.onChangeToDoCompleted = this.onChangeToDoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeToDoDescription(e){
        this.setState({
            todo_description:e.target.value
        })
    }

    onChangeToDoResponsible(e){
        this.setState({
            todo_responsible:e.target.value
        })
    }

    onChangeToDoPriority(e){
        this.setState({
           todo_priority:e.target.value 
        })
    }

    onChangeToDoCompleted(e){
        this.setState({
            todo_completed:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()
        console.log("form submitted");
        console.log("todo description",this.state);
        const newtodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        }

        axios.post('http://localhost:5000/todos/add',newtodo).then(res=>{
            console.log("Todo has been updated successfully")
            this.setState({
                todo_description: '',
                todo_responsible: '',
                todo_priority: '',
                todo_completed: false
            })
            NotificationManager.success('Todo Added successfully','Success');
        }).catch(err=>{
            console.log("Getting error ----->",err)
        })
    }

    //html view
    render(){
        return(
            <div style={{marginTop:10}}>
                <h3>Create New ToDo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" className="form-control" value={this.state.todo_description} onChange={this.onChangeToDoDescription}/>
                    </div>
                    <div className="form-group">
                        <label>Responsible</label>
                        <input type="text" className="form-control" value={this.state.todo_responsible} onChange={this.onChangeToDoResponsible}/>
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="priorityOptions" id="priorityLow" value="low" checked={this.state.todo_priority==='low'} onChange={this.onChangeToDoPriority}/>
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="priorityOptions" id="priorityLow" value="medium" checked={this.state.todo_priority==='medium'} onChange={this.onChangeToDoPriority}/>
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="priorityOptions" id="priorityLow" value="high" checked={this.state.todo_priority==='high'} onChange={this.onChangeToDoPriority}/>
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create todo" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}