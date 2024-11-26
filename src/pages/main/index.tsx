import GetTasks from "../../shared/api";
import {useEffect} from "react";
import AddTask from "../../widgets/task-add/ui";
import TaskList from "../../widgets/task-list";
import {useTasksStore} from "../../app/store";

function MainPage() {

    const tasks = useTasksStore((state) => state.tasks);

    //передавать массив в TaskList

    useEffect(() => {
        GetTasks();
    }, []);

    return(
        <>
            <p>Создать задачу</p>
            <AddTask />
            <p>Список задач</p>
            {/*<TaskList tasks={}/>*/}
        </>
    );
}

export default MainPage;