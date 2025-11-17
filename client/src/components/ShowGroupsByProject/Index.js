import Card from 'react-bootstrap/Card';
import { useGroupsByProject } from "../../Hooks/useGroupsByProject";
import { useNavigate } from "react-router-dom"
import './style.css'

const ShowGroupsByProject = () => {
    const navigate = useNavigate();

    const { groups } = useGroupsByProject();


    return (
        <div className='cards'>
            {groups?.length > 0 ? (
                groups.map((group, index) => (
                    <div key={index}>
                        <Card className='Card-box' onClick={() => navigate(`/VerGrupo/${group.id}`)}>
                            <Card.Body>
                                <Card.Title>{group.Nome_Grupo}</Card.Title>

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