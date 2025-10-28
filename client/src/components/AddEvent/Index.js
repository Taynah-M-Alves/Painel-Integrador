import axios from "axios";
import { useState } from "react";

const AddEvent = () => {

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

        <div className="form-container">

            <div className="form-box">
                <div className="title-box">
                    <h1>Criar Evento</h1>
                </div>

                <div className="form-group">
                    <label>titulo: </label>
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

                <button className="btn btn-success" onClick={AddEventInfo}>Criar Grupo</button>
            </div>
        </div >

    );
};

export default AddEvent;