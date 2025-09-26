import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MyDatePicker } from '../../components/Calendar/calendar';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



function Home() {
  const Grupos = [
    {
      id: 1,
      NomeGrupo: "Os MVP'S",
      TURMA: "2024/1",
      descricao: "Grupo de desenvolvimento PWA"
    },
    {
      id: 1,
      NomeGrupo: "Os MVP'S",
      TURMA: "2024/1",
      descricao: "Grupo de desenvolvimento PWA"
    },
    {
      id: 1,
      NomeGrupo: "Os MVP'S",
      TURMA: "2024/1",
      descricao: "Grupo de desenvolvimento PWA"
    },
    {
      id: 1,
      NomeGrupo: "Os MVP'S",
      TURMA: "2024/1",
      descricao: "Grupo de desenvolvimento PWA"
    },
  
  ];

  return (
    <>
      {/* <nav className="navbar navbar-expand-lg bg-body-tertiary">
      </nav> */}

          {/* Side Menu -> Canvas */}
      <div className="d-flex">
        {/* Sidebar */}
        <div className="bg-light border-end" style={{ width: "250px", minHeight: "100vh" }}>
          <h4 className="p-3">Painel Integrador</h4>
          <ul className="list-unstyled ps-3">
            <li className='list-object'><a href="#">Dashboard</a></li>
            <li><a href="#">Calendário</a></li>
            <li><a href="#">Grupos</a></li>
            <li><a href="#">Eventos</a></li>
            <li><a href="#">Relatórios</a></li>
          </ul>
        </div>
      
      <div className='Content-container flex-grow-1'>
        {/* Conteúdo */}
        <div className="flex-grow-1 p-4">
            <h1>Grupo Alpha</h1>
            <p>Aqui vem os cards e progresso igual na sua print.</p>
        </div>


        <div className="container-md">
          <h1>Progressive Web Aplication(PWA's)</h1>
          <h3>4 Semestre - 2024/1</h3>
          <h4>Professor mA</h4>
          <button className="btn btn-primary">Clique em Mim</button>
        </div>


        <div className="container-md groups-container">
          <h1>Grupos:</h1>
          <a href="http://127.0.0.1:8000/admin/" className="btn btn-primary">Criar Novo Grupo</a>
          <div className='cards-container'>
            {Grupos.map((g,i) => (
              <div key={i} className="card" style={{ width: "18rem", marginBottom: "10px" }}>
                <div className="card-header">
                      Featured
                </div>
                <div className="card-body">
                    <h5 className="card-title">{g.NomeGrupo}</h5>
                    <p className="card-text">{g.descricao}</p>
                    <a href="http://127.0.0.1:8000/admin/" className="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            ))}
          </div>
        </div>
            

        <div className="container-md">
          <h1>Eventos:</h1>
          <MyDatePicker/>
        </div>

      </div>
      </div>
      
      

      
      
      


      

      
    
    </>
  )
}

export default Home
