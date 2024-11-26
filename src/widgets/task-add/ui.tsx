import {useTasksStore, useTaskStore} from "../../app/store";
import axios from "axios";
import {apiAxios} from "../../shared/config";
import useGetTasks from "../../shared/api";
import GetTasks from "../../shared/api";

function AddTask() {

    const task = useTaskStore((state) => state.task);
    const setTaskName = useTaskStore((state) => state.setTaskName);
    const setTaskDescription = useTaskStore((state) => state.setTaskDescription);
    const setTaskStatus = useTaskStore((state) => state.setTaskStatus);

    const tasks = useTasksStore(state => state.tasks);
    const fetchTasks = useTasksStore(state => state.fetchTasks);

    function CreateTask() {

        //очищать поля, если нет ошибок

        //вызов GetTasks

        apiAxios.post("/tasks", {
            "name": "someName",
            "description": "someDes",
            "status": "someStatus"
        }).then(function (response) {
            console.log(response);

        })
        .catch(function (error) {
            console.log(error);
        })
    }


    function GetAllTasks() {
        axios.get("https://cms.laurence.host/api/tasks")
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function PostTasks() {
        axios.put("https://cms.laurence.host/api/tasks/494", {
            "data" : {
                "name": "name",
                "description": "desc",
                "status": "done"
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }



    const handleClick = () => {
        fetchTasks("/tasks");
    };

    return (
        <>
            <p>Название</p>
            <input onChange={(e) => {
                setTaskName(e.target.value);
                console.log(task.name);
            }} />
            <p>Описание</p>
            <input onChange={(e) => {
                setTaskName(e.target.value);
                console.log(task.name);
            }} />
            <p>Статус</p>
            <input onChange={(e) => {
                setTaskName(e.target.value);
                console.log(task.name);
            }} />
            <button onClick={handleClick}>Создать</button>
            <button onClick={PostTasks}>Создать</button>
        </>
);
}

export default AddTask;