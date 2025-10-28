import Card from 'react-bootstrap/Card';
import { useGroupsByProject } from "../../Hooks/useGroupsByProject";
import { useNavigate } from "react-router-dom"
import './style.css'

const ShowGroupsByProject = () => {
    const navigate = useNavigate();

    const { groups } = useGroupsByProject();
    console.log("groups", groups)
    
    return (
        <div className='cards'>
            {groups?.length > 0 ? (
                groups.map((group, index) => (
                    <div key={index}>
                        <Card style={{ width: '18rem' }} onClick={() => navigate(`/VerGrupo/${group.id}`)}>
                            <Card.Body>
                                <Card.Title>{group.Nome_Grupo}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                <Card.Text>
                                    Default Description
                                </Card.Text>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                        </Card>
                    </div>
                ))
            ) : (
                <h3>Não tem nenhum grupo cadastrado nesse projeto Integrador</h3>
            )
            }
        </div>
    );
};

export default ShowGroupsByProject;