import { useState } from "react";
import TaskCard from "./TaskCard";
import TaskInput from "./TaskInput";
import ConfirmModal from "./ConfirmModal"; // importamos el modal
import "./TaskList.css";

function TaskList() {
  const [tasks, setTasks] = useState([
    { text: "Hacer yoga", completed: false },
    { text: "Hacer pilates", completed: false },
    { text: "Leer libro", completed: false },
  ]);

  const [modalTaskIndex, setModalTaskIndex] = useState<number | null>(null);

  // Agregar nueva tarea
  const addTask = (text: string) => {
    setTasks([...tasks, { text, completed: false }]);
  };

  // Toggle de completado
  const toggleTask = (index: number, completed: boolean) => {
    const newTasks = [...tasks];
    newTasks[index].completed = completed;
    setTasks(newTasks);
  };

  // Mostrar modal de confirmación
  const confirmDelete = (index: number) => {
    setModalTaskIndex(index);
  };

  // Confirmar eliminación
  const handleConfirmDelete = () => {
    if (modalTaskIndex !== null) {
      setTasks(tasks.filter((_, i) => i !== modalTaskIndex));
      setModalTaskIndex(null);
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