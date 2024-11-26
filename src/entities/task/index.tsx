import TaskType from "../../shared/types";
import {apiAxios} from "../../shared/config";
function Task({id, name, description, status, selected}: TaskType) {

    //сделать пропсы одним объектом Task

    //кнопка Добавить в избранное

    //поле Изменить статус

    //вызов GetTasks при удалении

    function DeleteTask() {
        apiAxios.delete("/tasks/" + id.toString())
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <>
            <p>{name}</p>
            <p>{description}</p>
            <p>{status}</p>
            <p>{selected}</p>
            <button onClick={DeleteTask}>Удалить</button>

        </>
    );
}

export default Task;