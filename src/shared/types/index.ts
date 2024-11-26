export type TaskStatusType = "done" | "open" | "working" | null;

type TaskType = {
    id: number;
    name: string;
    description: string;
    status: TaskStatusType;
    selected: boolean;
}

export default TaskType