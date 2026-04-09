.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4); /* fondo semitransparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px 30px;
  border-radius: 8px;
  text-align: center;
  max-width: 350px;
  width: 90%;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  font-family: "Times New Roman", Times, serif;
}

.modal-buttons {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
}

.confirm-btn {
  background-color: #3498db; /* azul en lugar de rojo */
  color: white;
  border: none;
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

.confirm-btn:hover {
  background-color: #2980b9; /* azul más oscuro al pasar el mouse */
}

.cancel-btn {
  background-color: #ccc;
  color: #333;
  border: none;
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.cancel-btn:hover {
  background-color: #999;
}