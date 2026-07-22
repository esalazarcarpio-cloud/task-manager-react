import express from "express";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(cors());

// Tus rutas
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.get("/tasks", async (req: any, res: any) => {
    try {
        //const tasks = await prisma.tareas.findMany();
        res.json([]);
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

        /*const response = await prisma.tareas.create({
        data: newTask,
        });*/

        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la tarea" });
    }
});

export default app;