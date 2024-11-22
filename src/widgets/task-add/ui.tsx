import {useTaskStore} from "../../app/store";

function AddTask() {

    // let name: string;
    // let description: string;
    // let status: "NEW" | "COMPLETED" | "UNCOMPLETED";
    // let selected: boolean;

    const name = useTaskStore((state) => state.name);
    const setName = useTaskStore((state) => state.setName);



    return (
        <>
            <input onChange={(e) => {
        setName(e.target.value);
        console.log(name);
    }} />
    <button>Создать</button>
    </>
);
}

export default AddTask;