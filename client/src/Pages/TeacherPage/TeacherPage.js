import Calendar from '../../components/Calendar';
import ShowGroupsByProject from '../../components/ShowGroupsByProject/Index';
import { useProjectsById } from '../../Hooks/useProjectById';
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateGroupModal from '../../components/CreateGroupModal';
import { useState } from "react";
import Button from "react-bootstrap/Button";
import CreateEventModal from '../../components/CreateEventModal';
import MetricCard from '../../components/MetricCard';
import { useGroupsByProject } from '../../Hooks/useGroupsByProject';
import { useEvents } from '../../Hooks/useEvents';


function TeacherPage() {

  const { project } = useProjectsById();

  console.log('project', project)

  const { events, fetchEvents } = useEvents();

  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const { groups, fetchGroupsByProject } = useGroupsByProject();

  const handleOpenGroupModal = () => setShowGroupModal(true);
  const handleCloseGroupModal = () => setShowGroupModal(false);
  const handleOpenEventModal = () => setShowEventModal(true);
  const handleCloseEventModal = () => setShowEventModal(false);

  const UserIcon = () => <i className="fa-solid fa-user"></i>;

  const ListIcon = () => <i className="fa-solid fa-list"></i>

  const squareArrowIcon = () => <i className="fa-solid fa-square-arrow-up-right"></i>

  const checkIcon = () => <i className="fa-solid fa-clipboard-check"></i>


  return (
    <>
      <div className='Content-container container-md flex-grow-1 bg-gray-50'>

        <CreateGroupModal
          show={showGroupModal}
          handleClose={handleCloseGroupModal}
          titulo='Criar Grupo'
          projectId={project?.id}
          turmaId={project?.turma.id}
          refreshFunction={fetchGroupsByProject} />

        <CreateEventModal
          show={showEventModal}
          handleClose={handleCloseEventModal}
          tituloForm='Criar Evento'
          refreshFunction={fetchEvents}
        />



        {/* HEADER COM INFO DO PROJETO */}
        <div className="header-container container-md">
          <h1>{project?.tema || "Carregando..."}</h1>
          <h3>{project?.professor.nome} - {project?.turma.nome}</h3>
        </div>

        {/* CONTAINER DOS PARAMETROS */}
        <div className="parameters-container container-md ">

          <MetricCard
            title="Total de Alunos"
            value={24}
            icon={UserIcon}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-50"
          />

          <MetricCard
            title="Grupos Formados"
            value={groups?.length ?? 0}
            icon={ListIcon}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-50"
          />

          <MetricCard
            title="Entregas Pendentes"
            value={20}
            icon={squareArrowIcon}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-50"
          />

          <MetricCard
            title="Entregas realizadas"
            value={11}
            icon={checkIcon}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-50"
          />

        </div>

        {/* ÁREA DOS GRUPOS */}
        <div className="container-md groups-container">
          <div className='group-title-button container-md'>
            <h3>Grupos</h3>
            <Button className="groups-button" variant="primary" onClick={handleOpenGroupModal}>
              <i className="fa-solid fa-plus"></i> Criar grupo
            </Button>
          </div>

          <div className='cards-container container-md'>
            <ShowGroupsByProject groups={groups} />
          </div>
        </div>

        <div className='group-title-button container-md'>
          <h3>Eventos</h3>
          <Button className="event-button" variant="primary" onClick={handleOpenEventModal}>
            <i className="fa-solid fa-plus"></i> Criar Evento
          </Button>
        </div>

        <div className="events-container container-md">
          <Calendar
            events={events} />

        </div>

      </div>
    </>
  )
}

export default TeacherPage;
