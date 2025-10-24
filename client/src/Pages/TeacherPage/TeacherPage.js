import Calendar from '../../components/Calendar';
import ShowGroupsByProject from '../../components/ShowGroupsByProject/Index';
import { useProjectsById } from '../../Hooks/useProjectById';
import { useNavigate } from "react-router-dom";
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function TeacherPage() {

  const { project } = useProjectsById();
  const navigate = useNavigate();

  const handleCreateGroup = () => {
    navigate("/CriarGrupo", { state: { projectId: project?.id } });
  };

  return (
    <>

      <div className='Content-container container-md flex-grow-1'>

        {/* HEADER COM INFO DO PROJETO */}
        <div className="header-container container-md">
          <h1>{project?.tema || "Carregando..."}</h1>
          <h2>{project?.descricao}</h2>
          <h3>{project?.professor.nome}</h3>
          <h4>{project?.turma.nome}</h4>
          <button className="btn btn-primary">Mais sobre o projeto</button>
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

          <button className="btn btn-primary" onClick={handleCreateGroup}>
            Criar Grupo
          </button>

          <div className='cards-container'>
            <ShowGroupsByProject />
          </div>
        </div>


        <div className="events-container container-md">
          <h1>Eventos</h1>
          <a href="http://localhost:3000/CriarGrupo" className="btn btn-primary">Criar Evento</a>
          <Calendar />

        </div>

      </div>
    </>
  )
}

export default TeacherPage;
