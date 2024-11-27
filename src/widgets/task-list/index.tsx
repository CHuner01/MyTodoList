import TaskType from "../../shared/types";
import Task from "../../entities/task";
import {Grid2} from "@mui/material";
import {useTasksStore} from "../../app/store";


type TaskListType = {
    tasks: TaskType[];
}

function TaskList({ tasks }: TaskListType) {


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
            <Grid2 container maxWidth={800} spacing={3} sx={{display: "flex", flexDirection: "column"}}>
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
            </Grid2>
        </>
    );
}

export default TaskList;