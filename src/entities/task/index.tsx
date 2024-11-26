import TaskType, {TaskStatusType} from "../../shared/types";
import {apiAxios} from "../../shared/config";
import {useState} from "react";
import {useTasksStore} from "../../app/store";
function Task({id, name, description, status, selected}: TaskType) {

    //сделать пропсы одним объектом Task

    const tasksFilter = useTasksStore((state) => state.tasksFilter);
    const fetchTasks = useTasksStore(state => state.fetchTasks);
    const applyFilter = useTasksStore(state => state.applyFilter);

    let taskStatus: TaskStatusType = status;

    const [taskSelected, setTaskSelected] = useState(selected)



    function ChangeStatus() {
        console.log("ChangeStatus");
        apiAxios.put("/tasks/" + id.toString(), {
            "data" : {
                "name": name,
                "description": description,
                "status": taskStatus
            }
        })
            .then(function (response) {
                console.log(response);
                applyFilter(tasksFilter, fetchTasks);
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    function SelectTask() {
        console.log("SelectTask");
        let selectedTasksId: number[] = JSON.parse(localStorage.getItem('selectedTasks') || '[]');
        if (taskSelected) {
            selectedTasksId = selectedTasksId.filter(taskId => taskId !== id);
        }
        else {
            selectedTasksId.push(id);
        }
        localStorage.setItem('selectedTasks', JSON.stringify(selectedTasksId));
        setTaskSelected(taskSelected => !taskSelected);
        applyFilter(tasksFilter, fetchTasks);
    }



    function DeleteTask() {
        console.log("DeleteTask");
        let selectedTasksId: number[] = JSON.parse(localStorage.getItem('selectedTasks') || '[]');
        selectedTasksId = selectedTasksId.filter(taskId => taskId !== id);
        localStorage.setItem('selectedTasks', JSON.stringify(selectedTasksId));

        apiAxios.delete("/tasks/" + id.toString())
            .then(function (response) {
                console.log(response);
                applyFilter(tasksFilter, fetchTasks);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <>
            <p>------------------------------------------------------------------------</p>
            <p>Новая задача</p>
            <p>{name}</p>
            <p>{description}</p>

            <p>Избранное</p>
            {taskSelected ? <p>Избранное</p> : <p>Обычное</p>}
            <button onClick={SelectTask}>Изменить избранное</button>
            <button onClick={DeleteTask}>Удалить</button>


            <p>Статус</p>
            <p>{taskStatus}</p>
            <select id="select"
                    defaultValue={taskStatus === null ? "" : taskStatus}
                    onChange={(e) => {
                (taskStatus = e.target.value as TaskStatusType);
                ChangeStatus();
            }}>
                <option value="done">Выполнена</option>
                <option value="working">В работе</option>
                <option value="open">Открыта</option>
            </select>



        </>
    );
}

export default Task;