import Calendar from '../../components/Calendar';
import ShowGroupsByProject from '../../components/ShowGroupsByProject/Index';
import { useProjectsById } from '../../Hooks/useProjectById';
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateGroupModal from '../../components/CreateGroupModal';
import { useState } from "react";
import Button from "react-bootstrap/Button";
import CreateEventModal from '../../components/CreateEventModal';


function TeacherPage() {

  const { project } = useProjectsById();

  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  const handleOpenGroupModal = () => setShowGroupModal(true);
  const handleCloseGroupModal = () => setShowGroupModal(false);
  const handleOpenEventModal = () => setShowEventModal(true);
  const handleCloseEventModal = () => setShowEventModal(false);

  return (
    <>

      <div className='Content-container container-md flex-grow-1'>

        <CreateGroupModal
          show={showGroupModal}
          handleClose={handleCloseGroupModal}
          titulo='Criar Grupo'
          projectId={project?.id} />

        <CreateEventModal
          show={showEventModal}
          handleClose={handleCloseEventModal}
          tituloForm='Criar Evento' />



        {/* HEADER COM INFO DO PROJETO */}
        <div className="header-container container-md">
          <h1>{project?.tema || "Carregando..."}</h1>
          <h2>{project?.descricao}</h2>
          <h3>{project?.professor.nome}</h3>
          <h4>{project?.turma.nome}</h4>
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

        <div className="col items-container">
          <div class="col item-box">
            {/* ÁREA DOS GRUPOS */}

            <div className=" groups-container">
              <div className='group-container-title'>
                <h3>Grupos</h3>

                <Button variant="primary" onClick={handleOpenGroupModal}>
                  Criar grupo
                </Button>

              </div>

              <div className='cards-container'>
                <ShowGroupsByProject />
              </div>
            </div>

          </div>
        </div>

        <div class="col item-box">
          <div className="events-container ">
            <h1>Eventos</h1>
            <Button variant="primary" onClick={handleOpenEventModal}>
              Criar Evento
            </Button>

            <Calendar />

          </div>

        </div>
      </div>
    </>
  )
}

export default TeacherPage;
