import TaskType from "../../shared/types";
import Task from "../../entities/task";


function TaskList(tasks: TaskType[]) {


    return (
        <>
            {tasks.map((index) => (
                <>
                    <Task
                        id={index.id}
                        name={index.name}
                        description={index.description}
                        status={index.status}
                        selected={index.selected}
                    />
                </>
            ))}
        </>
    );
}

export default TaskList;