
import Card from 'react-bootstrap/Card';
import './style.css'
import { useTasksByGroup } from "../../Hooks/useTasksByGroup";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import CreateTaskModal from '../CreateTaskModal/index';
import TaskModal from '../TaskModal';


const TasksContainer = ({ groupId, integrantes }) => {

    const { tasks, fetchTasksByGroup } = useTasksByGroup();

    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

    const handleOpenCreateTaskModal = () => setShowCreateTaskModal(true);
    const handleCloseCreateTaskModal = () => setShowCreateTaskModal(false);

    const [showTaskModal, setShowTaskModal] = useState(false);

    const handleOpenTaskInfosModal = () => setShowTaskModal(true);
    const handleCloseTaskInfosModal = () => setShowTaskModal(false);

    const [taskSelected, setTaskSelected] = useState(null)



    return (
        <div>
            <Button variant="primary" onClick={handleOpenCreateTaskModal}>
                Criar tarefa
            </Button>

            <div className="cards-container">

                <CreateTaskModal
                    handleClose={handleCloseCreateTaskModal}
                    show={showCreateTaskModal}
                    groupId={groupId}
                    integrantes={integrantes}
                    refreshFunction={fetchTasksByGroup}
                />

                <TaskModal
                    show={showTaskModal}
                    handleClose={handleCloseTaskInfosModal}
                    taskSelected={taskSelected}

                />



                {tasks?.length > 0 ? (
                    tasks.map((task, index) => (
                        <div key={index}>
                            <Card style={{ width: '18rem' }}
                                onClick={() => {
                                    handleOpenTaskInfosModal();
                                    setTaskSelected(task);
                                }}>
                                <Card.Body>
                                    <Card.Title>{task?.titulo}</Card.Title>
                                    <Card.Subtitle className="status-name mb-2 text-muted">{task?.status}</Card.Subtitle>
                                    <Card.Text>
                                        Responsável - {task?.responsavel}
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                        </div>
                    ))) : (
                    <h4>Não tem nenhuma tarefa cadastrada para esse grupo</h4>
                )}

            </div>
        </div>
    );
};

export default TasksContainer;