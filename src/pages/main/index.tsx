
import {useEffect} from "react";
import AddTask from "../../widgets/task-add";
import TaskList from "../../widgets/task-list";
import {useTasksStore} from "../../app/store";
import TaskFilter from "../../widgets/task-filter";

function MainPage() {

    const tasks = useTasksStore((state) => state.tasks);
    const tasksFilter = useTasksStore((state) => state.tasksFilter);
    const fetchTasks = useTasksStore(state => state.fetchTasks);
    const applyFilter = useTasksStore(state => state.applyFilter);

    //пагинация









    useEffect(() => {
        applyFilter(tasksFilter, fetchTasks);
    }, []);

    return(
        <>
            <p>Создать задачу</p>
            <AddTask />
            <TaskFilter />
            <p>Список задач</p>
            <TaskList tasks={tasks} />
        </>
    );
}

export default MainPage;