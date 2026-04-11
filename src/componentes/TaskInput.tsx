import { useState } from "react";
import AlertModal from "./AlertModal";
import "./TaskInput.css";

type Props = {
  onAddTask: (text: string) => void;
};

function TaskInput({ onAddTask }: Props) {
  const [text, setText] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // Obtener fecha de hoy
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${
    (today.getMonth() + 1).toString().padStart(2, "0")
  }/${today.getFullYear()}`;

  const handleAdd = () => {
    if (text.trim() === "") {
      setShowAlert(true);  // mostrar modal
      return;
    }
    onAddTask(text.trim());
    setText("");           // limpiar input al agregar tarea válida
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setText("");           // limpiar input cuando se cierra el modal
  };

  return (
    <div className="task-input-container">
      
      <label className="task-input-label">
        Tareas para hoy ({formattedDate})
      </label>
      <div className="task-input">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Agregar tarea del ${formattedDate}...`}
        />
        <button onClick={handleAdd}>Agregar</button>
      </div>

      {showAlert && (
        <AlertModal
          message="No se permite agregar una tarea vacía."
          onClose={handleCloseAlert}
        />
      )}
    </div>
  );
}

export default TaskInput;