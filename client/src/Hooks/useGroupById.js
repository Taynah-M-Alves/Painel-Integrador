import { useState, useEffect } from "react";
import { getGroupById } from "../Services/GroupService";
import { useParams } from "react-router-dom";

export const useGroupsById = () => {
    const [groups, setGroups] = useState([""])
    const { id } = useParams();

    useEffect(() => {
        const getGroupsId = async () => {
            const data = await getGroupById(id);
            setGroups(data)
        };

        getGroupsId();
    }, [id])

    return { groups };
};
