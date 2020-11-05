let Todo = require('../model/todo.model');
exports.getAllAsyncEvents = (req, res, next) => {
    Todo.find((err,todos)=>{
        if (err) {
            console.log("Getting error while fetchin todos...")
        }else{
            res.json(todos)
        }
    })
};
exports.newTodo = (req, res, next) => {
    let todo  = new Todo(req.body)
    todo.save().then(isSaved=>{
        res.json({"todo":"Todo added successfully"})
    }).catch(err=>{
        res.status(400).send('Getting error while saving new todo')
    })
};
exports.getToDo = (req,res,next)=>{
    let id  = req.params.id;
    console.log("id---->",id)
    Todo.findById(id,function(err,todo){
        res.json(todo);
    })
}
exports.update = (req, res, next) => {
    // console.log("here is req of update--->",req);
    Todo.findById(req.params.id,function(err,todo){
        if (!todo) {
            res.status(404).send("data is not found");
        }else{
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo=>{
                res.json('Yeah!!! Todo updated successfully')
            }).catch(err=>{
                res.status(400).send("Getting error while updating todo")
            })
        }
    })
};