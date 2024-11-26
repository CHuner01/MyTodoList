import GetTasks from "../../shared/api";
import {useEffect} from "react";
import AddTask from "../../widgets/task-add";
import TaskList from "../../widgets/task-list";
import {useTasksStore} from "../../app/store";

function MainPage() {

    const tasks = useTasksStore((state) => state.tasks);
    const fetchTasks = useTasksStore(state => state.fetchTasks);



    useEffect(() => {
        fetchTasks("/tasks");
    }, []);

    return(
        <>
            <p>Создать задачу</p>
            <AddTask />
            <p>Список задач</p>
            <TaskList tasks={tasks} />
        </>
    );
}

export default MainPage;