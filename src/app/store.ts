import { create } from "zustand"
import TaskType, {TasksFilterType} from "../shared/types";
import {apiAxios} from "../shared/config";


type FetchTasksFunction = (url: string) => void;

interface TasksState {
    tasks: TaskType[];
    setTasks: (newTasks: TaskType[]) => void;
    fetchTasks: FetchTasksFunction;
    tasksFilter: TasksFilterType;
    setTasksFilter: (filter: TasksFilterType) => void;
    applyFilter: ( tasksFilter: TasksFilterType, fetchTasks: FetchTasksFunction) => void;

}

export const useTasksStore = create<TasksState>((set) => ({
    tasks: [],
    tasksFilter: "all",
    setTasksFilter: (filter) => set({ tasksFilter: filter}),
    setTasks: (newTasks) => set(() => ({tasks: newTasks})),
    fetchTasks: async (url) => {
        try {
            const response = await apiAxios.get(url)
            let arrayTasks = response.data.data

            console.log("fetchTasks")
            console.log(arrayTasks)

            let arrayLen = arrayTasks.length;
            console.log(arrayLen)

            set(() => ({tasks: []}))
            for (let i = 0; i < arrayLen; i++) {
                const newTask: TaskType = {
                    id: arrayTasks[i].id,
                    name: arrayTasks[i].attributes.name,
                    description: arrayTasks[i].attributes.description,
                    status: arrayTasks[i].attributes.status,
                    selected: false,
                }
                set((state) => ({
                    tasks: [...state.tasks, newTask],
                }));
            }
        }
        catch (error) {
            console.log(error)
        }

    },
    applyFilter: async (tasksFilter, fetchTasks) => {

        if (tasksFilter === "all") {
            await fetchTasks("/tasks");
        }
        else if (tasksFilter === "finished") {
            await fetchTasks("/tasks?filters%5Bstatus%5D=done");

        }
        else if (tasksFilter === "unfinished") {
            await fetchTasks("/tasks?filters%5Bstatus%5D=working&filters%5Bstatus%5D=open");
        }
        else if (tasksFilter === "selected") {
            await fetchTasks("/tasks");
            let selectedTasksId: number[] = JSON.parse(localStorage.getItem('selectedTasks') || '[]');
            set((state) => ({
                tasks: state.tasks.filter((task: TaskType) => selectedTasksId.includes(task.id))
            }))

        }
        console.log("получили фильтр " + tasksFilter)
    }

}));



