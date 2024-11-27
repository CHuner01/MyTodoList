export type TaskStatusType = "done" | "open" | "working" ;

export type TasksFilterType = "finished" | "unfinished" | "all" | "selected";

type TaskType = {
    id: number;
    name: string;
    description: string;
    status: TaskStatusType;
    selected: boolean;
}

export default TaskType