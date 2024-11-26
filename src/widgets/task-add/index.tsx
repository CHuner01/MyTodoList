import {useTasksStore, useTaskStore} from "../../app/store";
import axios from "axios";
import {apiAxios} from "../../shared/config";
import useGetTasks from "../../shared/api";
import GetTasks from "../../shared/api";

function AddTask() {

   // const task = useTaskStore((state) => state.task);
   // const setTaskName = useTaskStore((state) => state.setTaskName);
   // const setTaskDescription = useTaskStore((state) => state.setTaskDescription);
   // const setTaskStatus = useTaskStore((state) => state.setTaskStatus);

    const tasks = useTasksStore(state => state.tasks);
    const fetchTasks = useTasksStore(state => state.fetchTasks);

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
            fetchTasks("/tasks");

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