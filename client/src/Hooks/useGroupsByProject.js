import { useState, useEffect } from "react";
import { getGroupsByProject } from "../Services/projectService";
import { useParams } from "react-router-dom";

export const useGroupsByProject = () => {
    const [groups, setGroups] = useState([""])
    const { id } = useParams();


    const fetchGroupsByProject = async () => {
        const data = await getGroupsByProject(id);
        setGroups(data)
    };

    useEffect(() => {
        fetchGroupsByProject();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return { groups, fetchGroupsByProject };
};
