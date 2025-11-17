
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Select from 'react-select';
import "./style.css"
import api from '../../utilis/Api';

function CreateTaskModal({ show, handleClose, groupId, integrantes, refreshFunction }) {

    const [titulo, setTtitulo] = useState("")
    const [descricao, setDescricao] = useState("")
    const [prazo, setPrazo] = useState("")
    const [responsavel, setResponsavel] = useState(null)

    console.log("integrantes", integrantes)

    const options = integrantes?.map(int => ({
        value: int.id,
        label: int.nome
    }));

    const AddTaskInfo = async () => {
        try {
            const response = await api.post("/tarefas/", {
                titulo: titulo,
                descricao: descricao,
                prazo: prazo,
                status_tarefa: 1,
                grupo: groupId,
                responsavel: responsavel?.value,
            });
            console.log("Resposta completa do backend:", response.data)
            refreshFunction();
            handleClose();

        } catch (error) {
            console.log("Erro ao criar tarefa:", error.response?.data || error);

        }

    }


    return (

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Criar Tarefa</Modal.Title>
            </Modal.Header>
            <Modal.Body>



                <div className="form-group-container">

                    <div className="form-group">
                        <label>Escreva o título da tarefa: </label>
                        <input type="text"
                            className="form-control form-control-lg"
                            placeholder="Escreva o titulo da tarefa"
                            name="titulo"
                            value={titulo}
                            onChange={(e) => setTtitulo(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Descreva resumidamente a tarefa: </label>
                        <textarea type="text"
                            className="form-control form-control-lg"
                            placeholder="Escreva a descricao da tarefa"
                            name="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Selecione o prazo de entrega: </label>
                        <input type="date"
                            className="form-control form-control-lg"
                            placeholder="Escreva o prazo para entrega tarefa"
                            name="prazo"
                            value={prazo}
                            onChange={(e) => setPrazo(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Selecione o responsável da tarefa: </label>
                        <Select
                            value={responsavel}
                            placeholder="responsavel"
                            onChange={(selected) => {
                                setResponsavel(selected);
                            }}
                            options={options}
                        />
                    </div>
                </div>



            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={AddTaskInfo}>
                    Criar
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default CreateTaskModal;