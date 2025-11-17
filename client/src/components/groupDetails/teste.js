import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./GroupDetails.css";
import { useGroupsById } from "../../Hooks/useGroupById";

function GroupDetails({ }) {
    const [showAddModal, setShowAddModal] = useState(false);

    const handleAddMember = () => setShowAddModal(true);
    const handleClose = () => setShowAddModal(false);

    return (
        <div className="group-container container p-4 rounded">
            <h1 className="group-title">NOME DO GRUPO</h1>

            {/* Objetivo */}
            <div className="objective-box p-3 rounded">
                <div className="d-flex justify-content-between align-items-center">
                    <strong>Objetivo do Projeto</strong>
                    <i className="fa-solid fa-pen edit-icon"></i>
                </div>
                <p className="mb-0">OBJETIVO DO GRUPO</p>
            </div>

            <hr />

            {/* Integrantes */}
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h4>Integrantes</h4>
                <button className="btn btn-link add-member-btn" onClick={handleAddMember}>
                    <i className="fa-solid fa-user-plus"></i> Adicionar Integrante
                </button>
            </div>

            <div className="integrantes-list d-flex gap-3 flex-wrap">
                {/* {group.integrantes.map((user, index) => (
                    <div className="integrante-card d-flex align-items-center p-2 rounded" key={index}>
                        <div className="avatar rounded-circle">
                            {user.nome.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                        </div>

                        <div className="ms-3">
                            <strong>{user.nome}</strong>
                            {user.isLider && (
                                <div className="leader-badge mt-1">
                                    👑 Líder
                                </div>
                            )}
                        </div>

                        <i className="fa-solid fa-xmark remove-icon ms-auto"></i>
                    </div>
                ))} */}
            </div>

            {/* Modal adicionar integrante */}
            <Modal show={showAddModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Integrante</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Aqui você colocará o Select dos integrantes...
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary">
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default GroupDetails;