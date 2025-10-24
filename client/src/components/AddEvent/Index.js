import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

const AddEvent = () => {

    const [titulo, setTtitulo] = useState("")
    const [descricao, setDescricao] = useState("")
    const [prazo, setPrazo] = useState("")

    const navigate = useNavigate();

    const AddTaskInfo = async () => {
        let formField = new FormData()

        formField.append('titulo', titulo)
        formField.append('descricao', descricao)
        formField.append('prazo', prazo)

        await axios.post("http://127.0.0.1:8000/tarefas/", {
            titulo: titulo,
            descricao: descricao,
            prazo: prazo,
        }).then((response) => {
            console.log(response.data);
            navigate('/VerTarefas')
        })

    }

    return (

        <div className="container">

            <h1>Criar Tarefa</h1>

            <div className="form-group">

                <div className="form-group">
                    <input type="text"
                        className="form-control form-control-lg"
                        placeholder="Escreva o titulo da tarefa"
                        name="titulo"
                        value={titulo}
                        onChange={(e) => setTtitulo(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <textarea type="text"
                        className="form-control form-control-lg"
                        placeholder="Escreva a descricao da tarefa"
                        name="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input type="date"
                        className="form-control form-control-lg"
                        placeholder="Escreva o prazo para entrega tarefa"
                        name="prazo"
                        value={prazo}
                        onChange={(e) => setPrazo(e.target.value)}
                    />
                </div>
            </div>

            <button className="btn btn-success" onClick={AddTaskInfo}>Criar Tarefa</button>
        </div>

    );
};

export default AddEvent;