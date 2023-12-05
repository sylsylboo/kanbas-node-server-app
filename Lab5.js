const assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
};

const todos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: false },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: false },
];



const Lab5 = (app) => {
    app.get("/a5/welcome", (req, res) => {
        res.send("Welcome to Assignment 5!");
    });

    app.get("/a5/add/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) + parseInt(b);
        res.send(sum.toString());
    })

    app.get("/a5/subtract/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) - parseInt(b);
        res.send(sum.toString());
    })
    // USING QUERY PARAMETERS
    app.get("/a5/calculator", (req, res) => {
        const { a, b, operation } = req.query;
        let result = 0;
        switch (operation) {
            case "add":
                result = parseInt(a) + parseInt(b);
                break;
            case "subtract":
                result = parseInt(a) - parseInt(b);
                break;
            default:
                result = "Invalid operation";
        }
        res.send(result.toString());
    });
    // working with objects
    app.get("/a5/assignment", (req, res) => {
        res.json(assignment);
    });

    app.get("/a5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });

    app.get("/a5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });

    app.get("/a5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        assignment.score = parseInt(newScore);
        res.json(assignment);
    });

    app.get("/a5/assignment/completed/:newCompleted", (req, res) => {
        const { newCompleted } = req.params;
        assignment.completed = newCompleted;
        res.json(assignment);
    });

    // working with arrays
    app.get("/a5/todos", (req, res) => {
        const { completed } = req.query;
        if (completed !== undefined) {
            const completedTodos = todos.filter((t) => t.completed === true)
            res.json(completedTodos);
            return;
        }
        res.json(todos);  
    })
    
    // Post: to create new data
    app.post("/a5/todos", (req, res) => {
        const newTodo = {
            ...req.body,
            id: new Date().getTime(),
        }
        todos.push(newTodo);
        res.json(newTodo);
    })

    // Delete
    app.delete("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            res.status(404).json({message: `Unable to delete Todo with ID ${id}`});
            return;
        }
        todos.splice(todos.indexOf(todo), 1);
        res.sendStatus(200);
    })

    // Put: to update
    // app.put("/a5/todos/:id", (req, res) => {
    //     const { id } = req.params;
    //     const todo = todos.find((t) => t.id === parseInt(id));
    //     todo.title = req.body.title;
    //     todo.description = req.body.description;
    //     todo.due = req.body.due;
    //     todo.completed = req.body.completed;
    //     res.sendStatus(200);
    // }) 
    app.put("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            res.status(404).json({
                message:`Unable to delete Todo with ID ${id}`});
            return;
        }

        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.due = req.body.due;
        todo.completed = req.body.completed;
        res.sendStatus(200);
    });


    // old version: misuse of get
    app.get("/a5/todos/create", (req, res) => {
        const newTodo = {
            id: new Date().getTime(),
            title: "New Task",
            completed: false
        };
        todos.push(newTodo);
        res.json(todos);
    })

    app.get("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id))
        res.json(todo);
    })

    // update title
    app.get("/a5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.title = title;
        res.json(todos);
    });

    // update completed
    app.get("/a5/todos/:id/completed/:completed", (req, res) => {
        const { id, completed } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.completed = completed;
        res.json(todos);
    });

    // update description
    app.get("/a5/todos/:id/description/:description", (req, res) => {
        const { id, description } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.description = description;
        res.json(todos);
    });

    app.get("/a5/todos/:id/delete", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todos.splice(todos.indexOf(todo), 1);
        res.json(todos);
    });


};
export default Lab5;