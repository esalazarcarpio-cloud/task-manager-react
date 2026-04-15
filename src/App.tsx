import Header from "./componentes/Header.js";
import TaskCard from "./componentes/TaskCard.js";
import TaskList from "./componentes/TaskList.js";
import Footer from  "./componentes/Footer.js";
function App() {
  
  return (
      <div className="app-container">
      <Header></Header>
      <TaskList></TaskList>
      <Footer></Footer>
    </div>
  );
}

export default App
