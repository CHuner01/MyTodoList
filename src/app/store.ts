import { create } from "zustand"
import Task from "../shared/types";


interface TasksState {
    tasks: Task[];
    addTask: (task: Task) => void;
    deleteTask: (id: number) => void;
}

export const useTasksStore = create<TasksState>((set) => ({
    tasks: [],
    addTask: (task: Task) => set((state) => (
        {
            tasks: [
                ...state.tasks,
                {id: task.id, name: task.name, description: task.description,
                    status: task.status, selected: task.selected},
            ]
        })),
    deleteTask: (id: number) => set((state) => (
        {
            tasks: state.tasks.filter((task: Task) => task.id !== id),
        })),
}));

interface TaskState {
    id: number;
    name: string;
    description: string;
    status: "NEW" | "COMPLETED" | "UNCOMPLETED";
    selected: boolean;
    setId: (id: number) => void;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
    setStatus: (status: "NEW" | "COMPLETED" | "UNCOMPLETED") => void;
    setSelected: (selected: boolean) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    id: 0,
    name: "",
    description: "",
    status: "NEW",
    selected: false,

    setId: (id: number) => set((state) => (
        {
            id: id
        }
    )),
    setName: (name: string) => set((state) => (
        {
            name: name
        }
    )),
    setDescription: (description: string) => set((state) => (
        {
            description: description
        }
    )),
    setStatus: (status: "NEW" | "COMPLETED" | "UNCOMPLETED") => set((state) => (
        {
            status: status
        }
    )),
    setSelected: (selected: boolean) => set((state) => (
        {
            selected: selected
        }
    )),
}))

