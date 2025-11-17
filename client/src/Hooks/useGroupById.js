import { useState, useEffect } from "react";
import { getGroupById } from "../Services/GroupService";
import { useParams } from "react-router-dom";

export const useGroupsById = () => {
    const [group, setGroup] = useState([""])
    const { id } = useParams();


    const fetchGroupsId = async () => {
        const data = await getGroupById(id);
        setGroup(data)
    };

    useEffect(() => {
        fetchGroupsId();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return { group, fetchGroupsId };
};
