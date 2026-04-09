import React from "react";
import "./AlertModal.css";

type Props = {
  message: string;
  onClose: () => void;
};

function AlertModal({ message, onClose }: Props) {
  return (
    <div className="alert-overlay">
      <div className="alert-content">
        <p>{message}</p>
        <button className="alert-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default AlertModal;