
import {useEffect} from "react";
import AddTask from "../../widgets/task-add";
import TaskList from "../../widgets/task-list";
import {useTasksStore} from "../../app/store";
import TaskFilter from "../../widgets/task-filter";
import axios from "axios";
import {apiAxios} from "../../shared/config";

function MainPage() {

    const tasks = useTasksStore((state) => state.tasks);
    const tasksFilter = useTasksStore((state) => state.tasksFilter);
    const fetchTasks = useTasksStore(state => state.fetchTasks);
    const applyFilter = useTasksStore(state => state.applyFilter);

    useEffect(() => {
        applyFilter(tasksFilter, fetchTasks);
    }, []);

    //тест
    function Test() {
        apiAxios.get("/tasks", {
            params: {
                pagination: {
                    pageSize : 2,
                    page: 2
                }

            }
        })
            .then(function (response) {
                console.log(response)

            })
            .catch(function (error) {
                console.log(error);

            })
    }


    return(
        <>
            <button onClick={Test}>Тест</button>
            <p>Создать задачу</p>
            <AddTask />
            <TaskFilter />
            <p>Список задач</p>
            <TaskList tasks={tasks} />
        </>
    );
}

export default MainPage;