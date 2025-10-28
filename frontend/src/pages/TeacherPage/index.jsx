import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Grupos from '../../components/GroupCard/GroupCard.jsx';


function TeacherPage() {

  const Projeto = 
    {
      NomeProjeto :"Progressive Web Aplication(PWA's)",
      Turma: "2024/1",
      Semestre:"4 semestre",
      Professor: "Augusto"
    }

  return (
    <>


      <div className='Content-container container-md flex-grow-1'>
        
        {/* HEADER COM INFO DO PROJETO */}
        <div className="header-container container-md">
          <h1>{Projeto.NomeProjeto}</h1>
          <h3>{Projeto.Semestre} - {Projeto.Turma}</h3>
          <h4>Professor {Projeto.Professor}</h4>
          <button className="btn btn-primary">Mais sobre o projeto</button>
        </div>
        

        {/* TITULO DA PAGINA */}
        <div className="title-container flex-grow-1 p-4">
            <h1>Dashboard Professor</h1> 
        </div>


        {/* CONTAINER DOS PARAMETROS */}
        <div className="parameters-container container-md ">

          <div className='parameter-box'>
            <div className='parameter-data'>
              <h4>Total de Alunos</h4>
              <h5>24</h5>
              <h6>2 turmas ativas</h6>
            </div>
            <div className='parameter-icon'>
              <i className="fa-solid fa-list"></i>
            </div>
            
          </div>
          <div className='parameter-box'>
            <div className='parameter-data'>
              <h4>Grupos Formados</h4>
              <h5>2</h5>
              <h6>5 alunos/grupo</h6>
            </div>
            <div className='parameter-icon'>
              <i className="fa-solid fa-square-arrow-up-right"></i>
            </div>
          </div>
          <div className='parameter-box'>
            <div className='parameter-data'>
              <h4>Entregas Pendentes</h4>
              <h5>3</h5>
              <h6>Vencendo esta semana</h6>
            </div>
            <div className='parameter-icon'>
              <i className="fa-solid fa-clipboard-check"></i>
            </div>
          </div>
          <div className='parameter-box'>
            <div className='parameter-data'>
              <h4>Taxa de Entrega</h4>
              <h5>3</h5>
              <h6>No prazo</h6>
            </div>
            <div className='parameter-icon'>
              <i className="fa-solid fa-clipboard-check"></i>
            </div>
          </div>

        </div>

          {/* ÁREA DOS GRUPOS */}
        <div className="container-md groups-container">
          <h1>Grupos:</h1>
          <a href="http://127.0.0.1:8000/admin/grupo/grupo/add/" className="btn btn-primary">Criar Novo Grupo</a>
          <div className='cards-container'>
            <Grupos/>
          </div>
        </div>
            

        <div className="events-container container-md">
          <h1>Eventos:</h1>
        </div>

      </div>
      {/* </div> */}
      

    </>
  )
}

export default TeacherPage;
