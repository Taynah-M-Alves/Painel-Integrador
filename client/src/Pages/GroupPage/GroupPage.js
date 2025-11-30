import { useState } from "react";
import { useEvents } from "../../Hooks/useEvents";
import { useGroupsById } from "../../Hooks/useGroupById";
import TasksContainer from '../../components/TasksContainer/Index';
import "./style.css"
import Calendar2 from "../../components/Calendar2/Calendar2";
import { useStudentsAvailable } from "../../Hooks/useStudentsWithoutGroup";
import AddIntegranteModal from "../../components/AddIntegranteModal"
import api from "../../utilis/Api";


function GroupPage() {

    const { events } = useEvents();
    const { group, fetchGroupsId } = useGroupsById();

    const [selectedOption, setSelectedOption] = useState("tarefas");
    const [showAddModal, setShowAddModal] = useState(false);

    const { studentsAvailable, fetchStudantsAvailable } = useStudentsAvailable(group?.turmaID);

    const [objetivo, setObjetivo] = useState("");
    const [editObjective, setEditObjective] = useState(false);

    // ------------------- REMOVER INTEGRANTE -------------------
    const removeMember = async (intId) => {
        try {
            const response = await api.patch(`/grupos/remover-integrantes/${intId}`);
            console.log("Resposta completa do backend:", response.data);
            alert("Integrante removido com sucesso!");
            fetchGroupsId();
            fetchStudantsAvailable();

        } catch (error) {
            console.error("Erro ao remover integrante:", error.response?.data || error);
        }
    };

    const handleRemoveMember = ({ intId }) => {

        removeMember(intId);
    };

    // --------------------- OBJETIVO ---------------------

    const SetarObjetivo = async () => {
        try {
            const response = await api.patch(`/grupos/${group?.id}/atribuir-objetivo`, {
                Objetivo: objetivo,
            });

            console.log("Resposta completa do backend:", response.data)
            alert("Objetivo alterado com sucesso!");

        } catch (error) {
            console.error("Erro ao alterar objetivo:", error.response?.data || error);
        }
    };

    const handleEditObjective = () => {
        setEditObjective(true);
    };

    const handleSaveObjective = () => {
        SetarObjetivo();
        setEditObjective(false);
        fetchGroupsId();
    };

    return (
        <div className="page-container">

            <AddIntegranteModal
                availableStudants={studentsAvailable}
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                integrantes={group?.Integrantes}
                groupID={group?.id}
                refreshFunction={fetchGroupsId}
                fetchGroup = {fetchGroupsId}
                fetchAvailableStudants={fetchStudantsAvailable}
            />

            <div className="group-container container p-4 rounded">

                <h1 className="group-title">{group?.Nome_Grupo}</h1>

                {/* OBJETIVO */}
                <div className="objective-box p-3 rounded">
                    <div className="d-flex justify-content-between align-items-center">
                        <strong>Objetivo do Projeto</strong>
                        <i className="fa-solid fa-pen edit-icon" onClick={handleEditObjective}></i>
                    </div>

                    {!editObjective ? (
                        <input
                            className="form-control"
                            type="text"
                            placeholder={group?.Objetivo || "Campo do objetivo do projeto"}
                            disabled
                        />
                    ) : (
                        <div className="d-flex gap-2">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Escreva o objetivo do projeto"
                                value={objetivo}
                                onChange={e => setObjetivo(e.target.value)}
                            />
                            <button className="btn btn-primary" onClick={handleSaveObjective}>
                                Salvar
                            </button>
                        </div>
                    )}
                </div>

                <hr />

                {/* INTEGRANTES */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4>Integrantes</h4>
                    <button className="btn btn-link add-member-btn" onClick={() => setShowAddModal(true)}>
                        <i className="fa-solid fa-user-plus"></i> Adicionar Integrante
                    </button>
                </div>

                <div className="integrantes-list d-flex gap-3 flex-wrap">
                    {group?.Integrantes?.length > 0 ? (
                        group.Integrantes.map((int, index) => (
                            <div className="integrante-card d-flex align-items-center p-2 rounded" key={index}>
                                <div className="avatar rounded-circle">
                                    {int.nome.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                                </div>

                                <div className="ms-3">
                                    <strong>{int.nome}</strong>
                                    {group.Lider && int.nome === group.Lider.nome && (
                                        <i className="fa-solid fa-thumbtack"></i>
                                    )}
                                </div>

                                <i
                                    className="fa-solid fa-xmark remove-icon ms-auto"
                                    onClick={() => handleRemoveMember({ intId: int.id })}
                                ></i>
                            </div>
                        ))
                    ) : (
                        <h4>Esse grupo ainda não tem integrantes</h4>
                    )}
                </div>

            </div>

            {/* SELETOR (tarefas / eventos) */}
            <div className="aplication-container container p-4 rounded">
                <div className="wrapper">
                    <label className="option option-1">
                        <input
                            type="radio"
                            name="select"
                            defaultChecked
                            onChange={() => setSelectedOption("tarefas")}
                        />
                        <span>Tarefas</span>
                    </label>

                    <label className="option option-2">
                        <input
                            type="radio"
                            name="select"
                            onChange={() => setSelectedOption("eventos")}
                        />
                        <span>Eventos</span>
                    </label>
                </div>

                <div className="left-grid w-100">
                    {selectedOption === "tarefas" && (
                        <TasksContainer groupId={group?.id} integrantes={group?.Integrantes} />
                    )}

                    {selectedOption === "eventos" && (
                        <Calendar2 events={events} />
                    )}
                </div>
            </div>

        </div>
    );
}

export default GroupPage;
