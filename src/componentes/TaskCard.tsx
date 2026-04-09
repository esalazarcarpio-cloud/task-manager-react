import { useState } from "react";
import "./TaskCard.css";

type Props = {
  text: string;
  onToggle: (completed: boolean) => void;
  onDelete: () => void;
};

function TaskCard({ text, onToggle, onDelete }: Props) {
  const [completed, setCompleted] = useState(false);

  const toggleCompleted = () => {
    setCompleted(!completed);
    onToggle(!completed);
  };

  return (
    <li className={`task-card ${completed ? "completed" : ""}`}>
      <input type="checkbox" checked={completed} onChange={toggleCompleted} />
      <span>{text}</span>
      <button className="delete-btn" onClick={onDelete}>
        Eliminar
      </button>
    </li>
  );
}

export default TaskCard;