import process = require("node:process");
const { randomUUID } = require('crypto');
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
let tasks = [
    { id: randomUUID(), text: "Study Express", completed: false },
    { id: randomUUID(), text: "Build Backend", completed: true },
];
app.get("/", (req: any, res: any) => {
    res.send("Backend is working!");
});
app.get("/tasks", (req: any, res: any) => {
    res.json(tasks);
});
app.post("/tasks", (req: any, res: any) => {
    console.log(tasks,tasks.length);
    const newTask ={
        id: randomUUID(),
        text: req.body.text,
        completed: req.body.completed
    };
    tasks.push(newTask); 
    res.json(newTask);
});

app.delete("/tasks/:id", (req:any, res:any) => {    
    const { id } = req.params;
    const index = tasks.findIndex(task => task.id == id);

    if (index !== -1) {
        tasks.splice(index, 1);
        res.status(200).json({ mensaje: 'Tarea eliminada correctamente' });
    } else {
        res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
});

app.put('/tasks/:id', (req:any, res:any) => {
    const { id } = req.params;
    const { completed } = req.body;

    const task = tasks.find(u => u.id == id);

    if (task) {
        task.completed = completed;  // Actualiza el dato
        res.status(200).json({
            mensaje: 'Usuario actualizado',
            task
        });
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});