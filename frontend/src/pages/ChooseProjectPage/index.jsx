import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import { useState, useEffect } from 'react'
import axios from 'axios';
import ProjectList from '../../components/ProjectList';
import api from '../../utilis/api';
import { getProjects } from '../../services/ProjectServices';


const Home = () => {

  function btnGetFunctiononClick(){
    getProjects()
    .then(data => console.log(data))
    .catch(err => console.error(err));
  }


  return (
    <>
      {/* <div className='container-md project-cards'>
      {
        projects.map((project,i) => (
          <div key= {i} className="card-box col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title"> {project.tema}</h5>
                <p className="card-text">{project.descricao}</p>
                <a
                  href={`http://127.0.0.1:8000/projetos/${project.id}`}
                  className="btn btn-primary"
                >
                  Ver Projeto
                </a>
              </div>
            </div>
          </div>
    ))
      } */}
      {/* </div> */}

      <div>
        <button onClick={btnGetFunctiononClick}>GET FUNCTION</button>
      </div>

    </>
  )
}

export default Home;
