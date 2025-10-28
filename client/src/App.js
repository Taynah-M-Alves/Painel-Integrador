
import './App.css';
import ShowProjects from './Pages/ShowProjects/ShowProjects';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowTasks from './components/ShowTasks/Index';
import NavBarMenu from './components/Navbar/Index';
import AddTask from './components/AddTask/Index';
import TeacherPage from './Pages/TeacherPage/TeacherPage';
import GroupPage from './Pages/GroupPage/GroupPage';

function App() {
  return (
    <div className="App">

      <Router>
        <NavBarMenu />
        <Routes>
          <Route exact path='/' Component={ShowProjects} />
          <Route exact path='/:id/' Component={TeacherPage} />
          <Route exact path='/VerTarefas' Component={ShowTasks} />
          <Route exact path='/CriarTarefa' Component={AddTask} />
          <Route exact path='/VerGrupo/:id' Component={GroupPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
