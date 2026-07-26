import process = require("node:process");
const { randomUUID } = require('crypto');
// Importamos Express
const express = require("express");
// Importamos CORS
// Permite que el frontend (React) se comunique con el backend
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
/*let tasks = [
    { id: randomUUID(), text: "Study Express", completed: false },
    { id: randomUUID(), text: "Build Backend", completed: true },
];*/
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


// 5) Cargamos variables del archivo .env
require("dotenv").config();





/* 6) Importamos Prisma Client y el adaptador para PostgreSQL
Prisma es la herramienta que conecta nuestro backend
con la base de datos.*/
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

// 7) Creamos el adaptador usando la URL de conexión
// Es la conexión real a PostgreSQL

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

// Creamos la instancia de Prisma
const prisma = new PrismaClient({ adapter });



// Para Despliegue const PORT = process.env.PORT || 3000;

// Activamos CORS
app.use(cors());

// 8) Eliminamos la lista FALSA
/*
let tasks = [
  { id: 1, text: "Study Express", completed: false },
  { id: 2, text: "Build backend", completed: true }
];
*/

// Ruta de prueba
app.get("/", (req: any, res: any) => {
  res.send("Backend is working!");
});

// 9) GET /tasks
// Obtiene todas las tareas desde la base de datos

app.get("/tasks", async (req: any, res: any) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error("Error en GET /tasks:", error);
    res.status(500).json({ message: "Error al obtener tareas" });
  }
});

/*
app.get("/tasks", (req: any, res: any) => {
  res.json(tasks);
});
*/

