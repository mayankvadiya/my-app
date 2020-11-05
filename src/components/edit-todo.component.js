import React,{Component} from "react";
import axios from "axios"

export default class TodoEdit extends Component{
    constructor(props){
        super(props)
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            todo_description:'',
            todo_responsible:'',
            todo_priority:'',
            todo_completed:true,
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/todos/'+this.props.match.params.id).then(res=>{
            console.log("Respo---->",res);
            this.setState({
                todo_description:res.data.todo_description,
                todo_responsible:res.data.todo_responsible,
                todo_priority:res.data.todo_priority,
                todo_completed:res.data.todo_completed
            })
        }).catch(err=>{
            console.log("err->",err);
        })
    }

    onChangeTodoDescription(e){
        this.setState({
            todo_description:e.target.value
        })
    }
    onChangeTodoResponsible(e){
        this.setState({
            todo_responsible:e.target.value
        })
    }
    onChangeTodoPriority(e){
        this.setState({
            todo_priority:e.target.value
        })
    }
    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }

    onSubmit(e){
        e.preventDefault()

        const obj = {
            todo_description:this.state.todo_description,
            todo_responsible:this.state.todo_responsible,
            todo_priority:this.state.todo_priority,
            todo_completed:this.state.todo_completed,
        }
        console.log("Object---->",obj);
        axios.post('http://localhost:5000/todos/update/'+this.props.match.params.id,obj).then(res=>{
            console.log("result--->",res.data);
            this.props.history.push("/")
        }).catch(err=>{
            console.log("this--->",err);
        })
    }

    render(){
        return(
            <div>
                <h3 align="center">Update todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" className="form-control" value={this.state.todo_description} onChange={this.onChangeTodoDescription}/>
                    </div>
                    <div className="form-check form-check-inline">
                        <input  className="form-check-input" type="radio" name="priorityOptions" id="priorityMedium" value="Medium" checked={this.state.todo_priority==='Medium'} onChange={this.onChangeTodoPriority} />
                        <label className="form-check-label">Medium</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input  className="form-check-input" type="radio" name="priorityOptions" id="priorityHigh" value="High" checked={this.state.todo_priority==='High'} onChange={this.onChangeTodoPriority}/>
                        <label className="form-check-label">High</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input  className="form-check-input" type="radio" name="priorityOptions" id="priorityHigh" value="High" checked={this.state.todo_priority==='Low'} onChange={this.onChangeTodoPriority}/>
                        <label className="form-check-label">Low</label>
                    </div>
                    <div className="form-check">
                        <input  className="form-check-input" id="completedCheckbox" type="checkbox" name="completedCheckbox" onChange={this.onChangeTodoCompleted} checked={this.state.todo_completed} value={this.state.todo_completed} />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>                        
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}