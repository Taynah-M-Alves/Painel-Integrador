import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Grupos from '../../components/GroupCard/GroupCard.jsx';


function StudentPage() {

  const Projeto = 
    {
      NomeProjeto :"Progressive Web Aplication(PWA's)",
      Turma: "2024/1",
      Semestre:"4 semestre",
      Professor: "Augusto"
    }

  return (
    <>


      <div className='Content-container flex-grow-1'>
        
        {/* HEADER COM INFO DO PROJETO */}
        <div className="header-container container-md">
          <h1>{Projeto.NomeProjeto}</h1>
          <h3>{Projeto.Semestre} - {Projeto.Turma}</h3>
          <h4>Professor {Projeto.Professor}</h4>
          <button className="btn btn-primary">Mais sobre o projeto</button>
        </div>
        

        {/* TITULO DA PAGINA */}
        <div className="title-container container-md flex-grow-1 p-4">
            <h1>Dashboard Aluno</h1> 
        </div>

      </div>
    
      

    </>
  )
}

export default StudentPage;
