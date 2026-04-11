import process = require("node:process");

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
let tasks = [
    { id: 1, title: "Study Express", completed: false },
    { id: 2, title: "Build Backend", completed: true },
];
app.get("/", (req: any, res: any) => {
    res.send("Backend is working!");
});
app.get("/tasks", (req: any, res: any) => {
    res.json(tasks);
});
app.post("/tasks", (req: any, res: any) => {
    const newTask ={
        id: req.body.id,
        title: req.body.title,
        completed: req.body.completed
    };
    tasks.push(newTask); 
    res.json(newTask);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});