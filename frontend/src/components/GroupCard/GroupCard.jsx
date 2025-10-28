import { useState, useEffect } from "react"
import axios from "axios"
import './style.css'

const Grupos = () => {
  const [grupos, setGrupos] = useState([])

  const getGrupos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/grupos/")
      console.log(response.data) // debug
      setGrupos(response.data.grupos) // 👈 pega a lista dentro da chave "grupos"
    } catch (error) {
      console.error("Erro ao buscar grupos:", error)
    }
  }

  useEffect(() => {
    getGrupos()
  }, [])

  return (
    <div className="container ">

      <div className="card-container">
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">NOME GRUPO</h5>
                <p className="card-text">
                  <strong>Líder:</strong>
                </p>
                <a
                  href={`http://127.0.0.1:8000/grupos/`}
                  className="btn btn-primary"
                >
                  Ver Grupo
                </a>
              </div>
            </div>
        </div>

        <div className="column">
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">NOME GRUPO</h5>
                <p className="card-text">
                  <strong>Líder:</strong>
                </p>
                
                <a
                  href={`http://127.0.0.1:8000/grupos/`}
                  className="btn btn-primary"
                >
                  Ver Grupo
                </a>
              </div>
            </div>
        </div>
      </div>

      <div className="column">
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">NOME GRUPO</h5>
                <p className="card-text">
                  <strong>Líder:</strong>
                </p>
              
                <a
                  href={`http://127.0.0.1:8000/grupos/`}
                  className="btn btn-primary"
                >
                  Ver Grupo
                </a>
              </div>
            </div>
        </div>
      </div>
    </div>
    </div>

  )
}

export default Grupos;