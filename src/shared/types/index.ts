type TaskType = {
    id: number;
    name: string;
    description: string;
    status: "done" | "open" | "working" | null;
    selected: boolean;
}

export default TaskType