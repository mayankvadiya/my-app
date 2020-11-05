var express = require('express');
var router = express.Router();

var todoController = require("../controller/todo.controller")

//get the list of all todos
router.get("/", todoController.getAllAsyncEvents)

//add new todos
router.post("/add",todoController.newTodo)
//add single todo
router.get("/:id",todoController.getToDo)
router.post("/update/:id",todoController.update)

module.exports = router;