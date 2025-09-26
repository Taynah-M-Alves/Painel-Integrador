import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const Grupo = [
    {
      id: 1,
      NomeGrupo: "Os MVP'S",
      TURMA: "2024/1",
      descricao: "Grupo de desenvolvimento PWA"
    }
  ];

  return (
    <>
      <div className="container-md">
        <h1>PAGINA DO GRUPO</h1>
      </div>
    </>
  )
}

export default Home;
