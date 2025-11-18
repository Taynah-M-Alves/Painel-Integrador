import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import api from '../../utilis/Api';

function AddIntegranteModal({ show, handleClose, availableStudants, fetchAvailableStudants, refreshFunction, integrantes, groupID }) {

    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState(null);
    const [selectedLider, setSelectedLider] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [Lider, setLider] = useState(null)

    const optionsArray = availableStudants ?? [];

    const options = optionsArray?.map(student => ({
        value: student.Id_Aluno,
        label: student.Nome_Aluno,
    }));

    const selectedStudentsLenght = selectedStudents?.length

    const AddIntegrante = async () => {
        const tamanho = integrantes.length + selectedStudentsLenght

        if (tamanho <= 5) {
            try {
                const response = await api.patch(`/grupos/${groupID}/adicionar-integrante`, {
                    Integrantes: selectedStudents
                });

                console.log("Resposta completa do backend:", response.data)

                if (isChecked === true) {
                    selectLider()
                }

                fetchAvailableStudants();
                refreshFunction();
                handleClose();


                setSelectedOption(null);

                alert("Os Integrantes foram adicionados com sucesso!");

            } catch (error) {
                console.error("Erro ao criar grupo:", error.response?.data || error);
                alert("Erro ao criar grupo!");

            }
        }
        if (selectedOption === null) {
            selectLider();

        } if (tamanho > 5) {
            console.error("O grupo não pode ter mais de 5 integrantes!")
            alert("O grupo não pode ter mais de 5 integrantes!");
        }
    }

    const selectLider = async () => {

        const response = await api.patch(`/grupos/${groupID}/atribuir-lideranca`, {
            Lider: Lider,
        })

        console.log("Resposta completa do backend:", response.data);


        handleClose();

        alert("Atribuição de liderança feita com sucesso!")
    }

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    }

    const integrantesArray = integrantes ?? [];
    const integrantesOptions = integrantesArray?.map(integrante => ({
        value: integrante.id,
        label: integrante.nome
    }))

    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>

                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Adicionar Integrante</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="form-group">
                        <label>Selecione os Integrantes do grupo: </label>
                        <Select
                            isMulti
                            placeholder="Integrantes"
                            defaultValue={null}
                            value={selectedOption}
                            onChange={(selected) => {
                                setSelectedOption(selected);
                                setSelectedStudents(selected ? selected.map(opt => opt.value) : []);
                            }}
                            options={options}
                        />
                    </div>

                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            Quero escolher um lider
                        </label>
                        {isChecked ?
                            < div className="form-group">
                                <label>Selecione o lider do grupo: </label>
                                <Select
                                    value={selectedLider}
                                    placeholder="Lider"
                                    onChange={(selected) => {
                                        setSelectedLider(selected);
                                        setLider(selected ? selected.value : "");
                                    }}
                                    options={integrantesOptions}
                                />
                            </div>
                            : ''}
                    </div>

                </Modal.Body >
                <Modal.Footer>
                    <Button variant="primary" onClick={AddIntegrante}>
                        Adicionar Integrante
                    </Button>
                </Modal.Footer>
            </Modal >
        </div >
    );

}

export default AddIntegranteModal;
