import { useGroupsById } from "../../Hooks/useGroupById";


function GroupPage() {

    const group = useGroupsById();
    console.log(group)

    return (
        <div>
            <h1>{group.groups.Nome_Grupo}</h1>
            <h2>{group.groups.id}</h2>
        </div>

    );
};

export default GroupPage;