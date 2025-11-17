
import { useProjects } from "../../Hooks/useProjects";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom"
import './style.css'

const ShowProjects = () => {

    const { projects } = useProjects();

    const navigate = useNavigate();


    return (
        <div>
            <h1>Projetos:</h1>
            <div className="Projects-module">
                {projects?.length > 0 ? (
                    projects.map((project, index) => (
                        <div key={index}>

                            <Card>
                                <Card.Header>Projeto {index + 1}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{project.tema}</Card.Title>
                            
                                    <Button variant="primary" onClick={() => navigate(`/${project.id}`)}>Ver mais</Button>
                                </Card.Body>
                            </Card>

                        </div>
                    ))
                ) : (
                    <h3>Não tem nenhum projeto cadastrado para esse professor</h3>
                )
                }
            </div>
        </div>
    );
};

export default ShowProjects;