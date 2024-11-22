type Task = {
    id: number;
    name: string;
    description: string;
    status: "NEW" | "COMPLETED" | "UNCOMPLETED";
    selected: boolean;
}

export default Task