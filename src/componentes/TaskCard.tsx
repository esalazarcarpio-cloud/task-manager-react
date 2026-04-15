import { useState } from "react";
import "./TaskCard.css";

type Props = {
  text: string;
  completed:boolean,
  onToggle: (completed: boolean) => void;
  onDelete: () => void;
};

function TaskCard({ text, completed, onToggle, onDelete }: Props) {
  const toggleCompleted = () => {    
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