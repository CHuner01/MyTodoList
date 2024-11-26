import { create } from "zustand"
import TaskType from "../shared/types";
import {apiAxios} from "../shared/config";


interface TasksState {
    tasks: TaskType[];
    setTasks: (newTasks: TaskType[]) => void;
    fetchTasks: (url: string) => void;
    addTask: (task: TaskType) => void;
    deleteTask: (id: number) => void;
}

export const useTasksStore = create<TasksState>((set) => ({
    tasks: [],
    setTasks: (newTasks) => set(() => ({tasks: newTasks})),
    fetchTasks: async (url) => {
        try {
            const response = await apiAxios.get(url)
            console.log(response)
            set({tasks: response.data.data})
        }
        catch (error) {
            console.log(error)
        }

    },
    addTask: (task: TaskType) => set((state) => (
        {
            tasks: [
                ...state.tasks,
                {id: task.id, name: task.name, description: task.description,
                    status: task.status, selected: task.selected},
            ]
        })),
    deleteTask: (id: number) => set((state) => (
        {
            tasks: state.tasks.filter((task: TaskType) => task.id !== id),
        })),
}));

interface TaskState {
    task: TaskType,
    setTaskId: (id: number) => void;
    setTaskName: (name: string) => void;
    setTaskDescription: (description: string) => void;
    setTaskStatus: (status: "done" | "open" | "working" | null) => void;
    setTaskSelected: (selected: boolean) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    task: {
        id: 0,
        name: "",
        description: "",
        status: "open",
        selected: false,
    },
    setTaskId: (id: number) => set((state) => (
        { task: { ...state.task, id} }
    )),
    setTaskName: (name: string) => set((state) => (
        { task: { ...state.task, name} }
    )),
    setTaskDescription: (description: string) => set((state) => (
        { task: { ...state.task, description} }
    )),
    setTaskStatus: (status: "done" | "open" | "working" | null) => set((state) => (
        { task: { ...state.task, status} }
    )),
    setTaskSelected: (selected: boolean) => set((state) => (
        { task: { ...state.task, selected} }
    )),
}))

