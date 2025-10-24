import { useState, useEffect } from "react";
import { getProjectById } from "../Services/projectService";
import { useParams } from "react-router-dom";

export const useProjectsById = () => {
    const [project, setProject] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const getSingleProject = async () => {
            const data = await getProjectById(id);
            setProject(data)
        };

        getSingleProject();
    }, [id])

    return { project };
};
