import {useTasksStore} from "../../app/store";
import axios from "axios";
import {apiAxios} from "../../shared/config";
import useGetTasks from "../../shared/api";
import GetTasks from "../../shared/api";

function AddTask() {

    const tasks = useTasksStore(state => state.tasks);
    const tasksFilter = useTasksStore((state) => state.tasksFilter);
    const fetchTasks = useTasksStore(state => state.fetchTasks);
    const applyFilter = useTasksStore(state => state.applyFilter);

    let taskName: string;
    let taskDescription: string;


    function CreateTask() {

        //очищать поля, если нет ошибок

        console.log("CreateTask");
        apiAxios.post("/tasks", {
            "data" : {
                "name": taskName,
                "description": taskDescription,
                "status": "open"
            }
        }).then(function (response) {
            console.log(response);
            applyFilter(tasksFilter, fetchTasks);

        })
        .catch(function (error) {
            console.log(error);
        })
    }

    return (
        <>
            <p>Название</p>
            <input onChange={(e) => {
                taskName = e.target.value;
            }} />
            <p>Описание</p>
            <input onChange={(e) => {
                taskDescription = e.target.value;
            }} />

            <button onClick={() => console.log(tasks)}>Получить</button>
            <button onClick={CreateTask}>Добавить</button>
        </>
);
}

export default AddTask;