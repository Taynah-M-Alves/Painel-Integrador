import { useState, useEffect } from "react";
import { getGroupsByProject } from "../Services/projectService";
import { useParams } from "react-router-dom";

export const useGroupsByProject = () => {
    const [groups, setGroups] = useState([""])
    const { id } = useParams();

    useEffect(() => {
        const getGroupsProject = async () => {
            const data = await getGroupsByProject(id);
            setGroups(data)
        };

        getGroupsProject();
    }, [id])

    return { groups };
};
