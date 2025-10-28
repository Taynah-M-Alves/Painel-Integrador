import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TeacherPage from './pages/TeacherPage/index'
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-day-picker/style.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import Home from './pages/ChooseProjectPage'
import StudentPage from './pages/StudentPage/index'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar/>
    <Router>
      <Routes>
        <Route exact path="/professor" Component={TeacherPage}/>
        <Route exact path="/aluno" Component={StudentPage}/>
        <Route exact path='/' Component={Home}/>
      </Routes>
    </Router>
  </React.StrictMode>
)
