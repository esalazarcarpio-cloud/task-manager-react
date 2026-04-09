import Header from "./componentes/Header";
import TaskCard from "./componentes/TaskCard";
import TaskList from "./componentes/TaskList";
import Footer from  "./componentes/Footer";
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
