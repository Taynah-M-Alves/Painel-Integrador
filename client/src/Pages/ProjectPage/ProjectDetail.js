
import './style.css'
import { useProjectsById } from "../../Hooks/useProjectById";
import ShowGroupsByProject from "../../components/ShowGroupsByProject/Index";

const ProjectDetails = () => {

    const { project } = useProjectsById();

    return (
        <div className="container-projects">
            <div className="project-info-container">
                <h1>{project.tema}</h1>
                <h3>Descrição: {project.descricao}</h3>
                <div className="single-project-info">
                    <p></p>
                </div>
            </div>

            <ShowGroupsByProject />
        </div>

    );
};

export default ProjectDetails;