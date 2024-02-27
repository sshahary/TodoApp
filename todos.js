fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app =  express();
const path = require('path');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

function firstIndex(arr, id)
{
    for (let i = 0; i < arr.length; i++)
    {
        if (arr[i].id === id)
            return i;
    }
    return (-1);
}

function removeAtindex(arr, index)
{
    let newArr = [];
    for (let i = 0; i < arr.length; i++)
    {
        if (i != index)
            newArr.push(arr[i]);
    }
    return newArr;
}

app.get('/todos', (req, res) => {
   fs.readFile("todos.json", "utf8", (err, data) => {
    if  (err) throw err;
    res.json(JSON.parse(data));
   });
});

// app.get('/todos/:id', (req, res) => {
//     const todoIndex = firstIndex(todos, parseInt(req.params.id));
//     if (todoIndex === -1)
//     {
//         res.status(404).send();
//     }
//     else
//     {
//         res.json(todos[todoIndex]);
//     }
// });

app.post('/todo', (req, res) => {

    const newTodo = {
        id: Math.floor(Math.random() * 1000000),
        title: req.body.title,
        description: req.body.description
    };
    fs.readFile("todos.json", "utf8", (err, data) =>
    {
        if(err) throw err;
        const todos = JSON.parse(data);
        todos.push(newTodo);
        fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
            if(err) throw err;
            res.status(201).json(newTodo);
        });
    });
});

// app.put('/todo/:id', (req, res) =>
// {
//     const todoIndex = firstIndex(todos, parseInt(req.params,id));
//     if (todoIndex === -1)
//     {
//         res.status(404).send();
//     }
//     else
//     {
//         todos[todoIndex].title = req.body.title;
//         todos[todoIndex].description = req.body.description;
//         res.json(todos[todoIndex]);
//     }
// });

app.delete('/todos/:id', (req, res) =>{
    const todoIndex = firstIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1)
    {
        res.status(404).send();
    }
    else
    {
        todos = removeAtindex(todos, todoIndex);
        res.status(200).send();
    }
});

app.get('/', (req, res) =>
{
    res.sendFile(path.join(__dirname, "todos.html"));
})

app.use((req, res, next) => {
    res.status(404).send();
});


app.listen(3000, () => {
    console.log('listening on http://localhost 3000')
});

module.exports = app;
