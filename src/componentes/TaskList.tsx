import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import TaskInput from "./TaskInput";
import ConfirmModal from "./ConfirmModal"; // importamos el modal
import "./TaskList.css";

function TaskList() {
  const [tasks, setTasks] = useState([
    
  ]);
  useEffect(
    ()=>{
      fetch('http://localhost:3000/tasks')
      .then((response)=>response.json())
      .then((data)=>{
        
        setTasks((prev) => (data));

      }).catch(error=>{
        console.log('Error al obtener tareas', error);
      })
    },[]
  );
  const [modalTaskIndex, setModalTaskIndex] = useState<number | null>(null);

  // Agregar nueva tarea
  const addTask = (text: string) => {
    let task={text:text, completed:false}
    fetch("http://localhost:3000/tasks",{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(task)
    }).then(response => response.json())
    .then(datax=>{
      console.log("tarea creada en backend", datax);
      setTasks([...tasks, datax]);
    }).catch(
      error=>{
        console.error("Error al guardar tarea", error);
      }
    );
  };

  

  // Toggle de completado
  const toggleTask = (index: number, completed: boolean) => {
    const task = tasks[index]!;
    task.completed = completed;

    fetch("http://localhost:3000/tasks/" + task.id,{
      method:'PUT',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(task)
    }).then(response => response.json())
    .then(datax=>{
      console.log("tarea actualizada en backend", datax);
      const newTasks = [...tasks];
      newTasks[index] = task;
      setTasks(newTasks);
    }).catch(
      error=>{
        console.error("Error al guardar tarea", error);
      }
    );
  };

  // Mostrar modal de confirmación
  const confirmDelete = (index: number) => {
    setModalTaskIndex(index);
  };

  // Confirmar eliminación
  const handleConfirmDelete = () => {
    if (modalTaskIndex !== null) {
      fetch("http://localhost:3000/tasks/" + tasks[modalTaskIndex]!.id,{
        method:'DELETE'
      }).then(response => response.json())
      .then(datax=>{
        setTasks(tasks.filter((_, i) => i !== modalTaskIndex));
        setModalTaskIndex(null);
      }).catch(
        error=>{
          console.error("Error al guardar tarea", error);
        }
      );


      
    }
  };

  // Cancelar eliminación
  const handleCancelDelete = () => {
    setModalTaskIndex(null);
  };

  const total = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = total - completedCount;
  const progressPercent = total === 0 ? 0 : (completedCount / total) * 100;

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Total:</strong> {total} |{" "}
        <strong>Completadas:</strong> {completedCount} |{" "}
        <strong>Pendientes:</strong> {pendingCount}
      </div>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${progressPercent}%` }}
        >
          <span className="progress-text">{Math.round(progressPercent)}%</span>
        </div>
      </div>

      <TaskInput onAddTask={addTask} />

      <ul style={{ padding: 0 }}>
        {tasks.map((task, index) => (
          <TaskCard
            key={index}
            text={task.text}
            completed={task.completed}
            onToggle={(completed) => toggleTask(index, completed)}
            onDelete={() => confirmDelete(index)}
          />
        ))}
      </ul>

      {modalTaskIndex !== null && (
        <ConfirmModal
          message={`¿Estás seguro de eliminar "${tasks[modalTaskIndex].text}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default TaskList;