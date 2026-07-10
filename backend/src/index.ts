import express from "express";
import randomUUID from "crypto";
import cors from "cors";
import 'dotenv/config';
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const pool = new pg.Pool(
  { 
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } 
  })

pool.on('error', (err) => {
  console.error('Error inesperado en el pool de pg:', err)
})

const adapter = new PrismaPg(pool)

// Aquí es donde pasas el "adapter" que te pedía el error
export const prisma = new PrismaClient({ adapter })





app.get("/", (req: any, res: any) => {
    res.send("Backend is working!");
});

app.get("/tasks", async (req: any, res: any) => {
    try {
        const tasks = await prisma.tareas.findMany();
        res.json(tasks);
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        res.status(500).json({ error: "No se pudieron obtener las tareas" });
    }
});

app.post("/tasks", async (req: any, res: any) => {
    try {
        const newTask = {
            id: req.body.id,
            text: req.body.text,
            state: req.body.state
        };

        const response = await prisma.tareas.create({
            data: newTask,
        });

        res.status(201).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la tarea" });
    }
});

app.delete("/tasks/:id", async (req:any, res:any) => {    
    try {
        const { id } = req.params;

        await prisma.tareas.delete({
            where: { id: id },
        });        
        res.status(200).json("ok");
    } catch (error) {
        res.status(404).json({ error: "No se pudo eliminar la tarea" });
    }
});

app.put('/tasks/:id', async (req:any, res:any) => {
    try {
        const { id } = req.params;
        const { text, state } = req.body;

        const updatedTask = await prisma.tareas.update({
            where: { id: id }, // Buscamos por el ID de la URL
            data: {
               ...(state !== undefined && { state }),
            },
        });

        res.json(updatedTask);
    } catch (error) {
        // Prisma lanza un error si el ID no existe
        res.status(404).json({ error: "Tarea no encontrada o error de datos" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});