
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

    const fetching = useTasksStore(state => state.fetching);
    const currentPage = useTasksStore(state => state.currentPage);
    const setFetching = useTasksStore(state => state.setFetching);
    const totalTasks = useTasksStore(state => state.totalTasks);

    useEffect(() => {
        if (fetching) {
            console.log("useEffect")
            applyFilter(tasksFilter, fetchTasks, currentPage);
            setFetching(false);
        }
    }, [fetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function() {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, []);

    const scrollHandler = (e: Event) => {
        if (((document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight)) < 2)
       ) {
            console.log('scroll')
            setFetching(true);
        }
    }




    //тест
    function Test() {
        apiAxios.get("/tasks")
            .then(function (response) {
                console.log(response)
                console.log(tasks.length)
                console.log(totalTasks)

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