import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import './style.css'
import Select from 'react-select';
import { useStudentsWithoutGroup } from "../../Hooks/useStudentsWithoutGroup";

const AddGroup = () => {

    const location = useLocation();
    const projectIdReceived = location.state?.projectId;

    const [nome, setNome] = useState("")
    const [integrantes, setIntegrantes] = useState("")
    const [lider, setLider] = useState("")

    const students = useStudentsWithoutGroup();
    const optionsArray = students.students;

    const options = optionsArray.map(student => ({
        value: student.Id_Aluno,   // o valor que você quer enviar
        label: student.Nome_Aluno  // o texto que aparece no Select
    }));

    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedLider, setSelectedLider] = useState(null);


    const AddGroupInfo = async () => {

        const integrantesIds = selectedOption ? selectedOption.map(opt => opt.value) : [];



        if (!projectIdReceived) {
            alert("Erro: ID do projeto não recebido!");
            return;
        }

        if (integrantesIds.length < 6) {
            try {
                const response = await axios.post("http://127.0.0.1:8000/grupos/", {
                    Nome_Grupo: nome,
                    Projeto_Integrador: projectIdReceived,
                    Integrantes: integrantes,
                    Lider: lider,
                });

                console.log("Resposta completa do backend:", response.data);

                const groupId = response.data.id;
                console.log("groupId extraído:", groupId);

                // await axios.patch(`http://127.0.0.1:8000/grupos/${projectId}/adicionar-integrante`, {
                //     Integrantes: integrantes,
                // });

                alert("Grupo criado com sucesso!");
            } catch (error) {
                console.error("Erro ao criar grupo:", error.response?.data || error);
                alert("Erro ao criar grupo!");
            }
        } else {
            alert("O grupo não pode ter mais de 5 integrantes");
        }
    };



    return (

        <div className="form-container">

            <div className="form-box">
                <div className="title-box">
                    <h1>Criar Grupo</h1>
                </div>

                <div className="form-group">
                    <label>Nome do grupo: </label>
                    <input type="text"
                        className="form-control form-control-lg"
                        placeholder="Escreva o nome do grupo"
                        name="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Selecione os Integrantes do grupo: </label>
                    <Select
                        isMulti
                        placeholder="Integrantes"
                        value={selectedOption}
                        onChange={(selected) => {
                            setSelectedOption(selected);
                            setIntegrantes(selected ? selected.map(opt => opt.value) : []);
                        }}
                        options={options}
                    />
                </div>

                <div className="form-group">
                    <label>Selecione o lider do grupo: </label>
                    <Select
                        value={selectedLider}
                        placeholder="Lider"
                        onChange={(selected) => {
                            setSelectedLider(selected);
                            setLider(selected ? selected.value : "")

                        }}
                        options={selectedOption}
                    />
                </div>

                <button className="btn btn-success" onClick={AddGroupInfo}>Criar Grupo</button>
            </div>
        </div >

    );
};

export default AddGroup;