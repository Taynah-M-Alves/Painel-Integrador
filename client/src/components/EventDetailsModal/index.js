
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEventsById } from '../../Hooks/useEventsById';


function EventDetailsModal({ show, handleClose, selectedEventId }) {

    const { events } = useEventsById(selectedEventId);

    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>

                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className='title-container'>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{events?.nome}</h3>
                        <span className="status-name bg-warning-subtle inline-block text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                            {events?.status}
                        </span>
                    </div>

                    <div>
                        <h6 className="info-label font-semibold text-gray-900 mb-2">Descrição</h6>
                        <p className="text-gray-600">{events?.descricao ?? "Sem descricao"}</p>
                    </div>


                    <div className="row-container ">
                        <div>
                            <h6 className="info-label font-semibold text-gray-900 mb-2">Prazo</h6>
                            <p className="text-gray-600">{new Date(events?.criado).toLocaleDateString('pt-BR')}</p>
                        </div>
                    </div>

                </Modal.Body >
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose} >
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal >
        </div >
    )
}

export default EventDetailsModal;