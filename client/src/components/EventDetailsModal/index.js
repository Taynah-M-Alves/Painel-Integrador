
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function EventDetailsModal({ show, handleClose, selectedEventId }) {

    console.log(selectedEventId)
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
                    <h3>Página em construção</h3>

                </Modal.Body >
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose} >
                        botão
                    </Button>
                </Modal.Footer>
            </Modal >
        </div >
    )
}

export default EventDetailsModal;