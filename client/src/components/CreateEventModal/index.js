import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function CreateEventModal({ show, handleClose, tituloForm }) {

    const [titulo, setTtitulo] = useState("")
    const [descricao, setDescricao] = useState("")
    const [prazo, setPrazo] = useState("")


    const AddEventInfo = async () => {

        const response = await axios.post("http://127.0.0.1:8000/eventos/", {
            Titulo: titulo,
            Descricao: descricao,
            Prazo: prazo
        });

        console.log("Resposta completa do backend:", response.data);


        alert("Evento criado com sucesso!");


    };

    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{tituloForm}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="form-group">
                        <label>Nome do evento:</label>
                        <input type="text"
                            className="form-control form-control-lg"
                            placeholder=""
                            name="nome"
                            value={titulo}
                            onChange={(e) => {
                                setTtitulo(e.target.value)
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>prazo: </label>
                        <input type="date"
                            className="form-control form-control-lg"
                            placeholder="prazo"
                            name="prazo"
                            value={prazo}
                            onChange={(e) => setPrazo(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>descricao: </label>
                        <input type="text"
                            className="form-control form-control-lg"
                            placeholder="Escreva a descricao do evento"
                            name="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={AddEventInfo}>CriarEvento</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateEventModal;