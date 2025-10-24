
import { useTasks } from "../../Hooks/useTasks";
import Card from 'react-bootstrap/Card';

const ShowTasks = () => {

    const { tasks } = useTasks();

    return (
        <div>
            <h1>Página de mostrar todos as tarefas</h1>
            {tasks.map((task, index) => (
                <div key={index}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{task.titulo}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card>
                </div>
            ))}

        </div>
    );
};

export default ShowTasks;