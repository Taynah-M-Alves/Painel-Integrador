
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useHistoryByTask } from '../../Hooks/useHistoryByTask';
import './style.css'
import api from '../../utilis/Api';

function TaskModal({ show, handleClose, taskSelected }) {

    const { history } = useHistoryByTask(taskSelected?.id);

    console.log("historico", history)
    console.log("taskSelected", taskSelected)

    const FinishTask = async () => {

        if (taskSelected?.status !== 'Finalizado') {

            const response = await api.patch(`/tarefas/${taskSelected?.id}/status-finalizado`);

            console.log("Resposta completa do backend:", response.data);

            handleClose();


            alert("Tarefa finalizada com sucesso!");
        } else {
            alert("Essa tarefa já foi finalizada.")
            handleClose();
        }

    }

    return (


        < div >
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>

                <Modal.Header closeButton onClick={handleClose} className='modal-header'>
                    <Modal.Title className='modal-title' >
                        <h3>Detalhes da tarefa</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className='title-container'>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{taskSelected?.titulo}</h2>
                        <span className="status-name bg-warning-subtle inline-block text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                            {taskSelected?.status}
                        </span>
                    </div>

                    <div>
                        <h6 className="info-label font-semibold text-gray-900 mb-2">Descrição</h6>
                        <p className="text-gray-600">{taskSelected?.descricao ?? "default"}</p>
                    </div>


                    <div className="row-container ">
                        <div>
                            <h6 className="info-label font-semibold text-gray-900 mb-2">Responsável</h6>
                            <p className="text-gray-600">{taskSelected?.responsavel}</p>
                        </div>
                        <div>
                            <h6 className="info-label font-semibold text-gray-900 mb-2">Prazo</h6>
                            <p className="text-gray-600">{new Date(taskSelected?.criado).toLocaleDateString('pt-BR')}</p>
                        </div>
                    </div>

                    <hr />

                    <h4>Histórico de alterações</h4>

                    <div className='history-container'>



                        {taskSelected && history?.length > 0 ? (
                            history?.map((hist, index) => (
                                <div className='history-line' key={index}>
                                    <div className='dot-history'></div>
                                    <div className='title-history'>{new Date(hist?.data).toLocaleDateString('pt-BR')} - {hist.tipo.descricao}</div>

                                </div>
                            ))) : (<p>Essa tarefa não tem nenhum historico</p>)}

                    </div>





                </Modal.Body >
                <Modal.Footer>
                    <Button variant="primary" onClick={FinishTask} >
                        Finalizar Tarefa
                    </Button>
                </Modal.Footer>
            </Modal >
        </div >
    )
}

export default TaskModal;