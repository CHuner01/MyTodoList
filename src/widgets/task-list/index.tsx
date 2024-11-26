import TaskType from "../../shared/types";
import Task from "../../entities/task";


type TaskListType = {
    tasks: TaskType[];
}

function TaskList({ tasks }: TaskListType) {

    //вынести в функцию

    let selectedTasksId: number[] = [];
    const storedSelectedTasks = localStorage.getItem('selectedTasks');


    if (storedSelectedTasks === null) {
        localStorage.setItem('selectedTasks', JSON.stringify([]));
    } else {

        try {
            const parsedTasks = JSON.parse(storedSelectedTasks);

            if (Array.isArray(parsedTasks)) {
                selectedTasksId = parsedTasks;
            } else {
                selectedTasksId = [];
            }
        } catch (error) {
            console.log(error);
            selectedTasksId = [];
        }
    }


    return (
        <>
            {tasks.map((task, index) => (
                <Task
                    key={index}
                    id={task.id}
                    name={task.name}
                    description={task.description}
                    status={task.status}
                    selected={selectedTasksId.includes(task.id)}
                />
            ))}
        </>
    );
}

export default TaskList;