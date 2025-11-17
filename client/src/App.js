
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TasksContainer from './components/TasksContainer/Index';
import NavBarMenu from './components/Navbar/Index';
import TeacherPage from './Pages/TeacherPage/TeacherPage';
import GroupPage from './Pages/GroupPage/GroupPage';
import teste from './components/groupDetails/teste';

function App() {
  return (
    <div className="App">

      <Router>
        <NavBarMenu />
        <Routes>
          <Route exact path='/:id/' Component={TeacherPage} />
          <Route exact path='/VerTarefas' Component={TasksContainer} />
          <Route exact path='/VerGrupo/:id' Component={GroupPage} />
          <Route exact path='/teste' Component={teste} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
