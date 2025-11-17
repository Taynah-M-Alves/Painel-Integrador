import { useState, useEffect } from "react";
import { getProjectById } from "../Services/projectService";
import { useParams } from "react-router-dom";

export const useProjectsById = () => {
    const [project, setProject] = useState(null);
    const { id } = useParams();


    const fetchGetSingleProject = async () => {
        const data = await getProjectById(id);
        setProject(data)
    };
    useEffect(() => {
        fetchGetSingleProject();
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [id])

    return { project, fetchGetSingleProject };
};
