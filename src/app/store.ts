import { create } from "zustand"
import TaskType, {TasksFilterType} from "../shared/types";
import {apiAxios, pageSize} from "../shared/config";



type FetchTasksFunction = (url: string) => void;

interface TasksState {
    tasks: TaskType[];
    setTasks: (newTasks: TaskType[]) => Promise<void>;
    fetchTasks: FetchTasksFunction;
    tasksFilter: TasksFilterType;
    setTasksFilter: (filter: TasksFilterType) => void;
    applyFilter: ( tasksFilter: TasksFilterType, fetchTasks: FetchTasksFunction, currentPage: number) => Promise<void>;

    fetching: boolean;
    setFetching: (fetchingState: boolean) => void;
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
    totalTasks: number;
    loading: boolean;
    setLoading: (loadingState: boolean) => void;

}

export const useTasksStore = create<TasksState>((set) => ({
    tasks: [],
    setTasks: (newTasks) => {
        return new Promise<void>(async (resolve) => {
            await set({tasks: newTasks});
            resolve();
        })
    },
    tasksFilter: "all",
    setTasksFilter: (filter) => set({ tasksFilter: filter}),
    fetching: true,
    setFetching: (fetchingState: boolean) => set(() => ({fetching: fetchingState})),
    currentPage: 1,
    setCurrentPage: (newPage: number) => set(() => ({currentPage: newPage})),
    loading: false,
    setLoading: (loadingState: boolean) => set((state) => {
        state.loading = loadingState
        return {loading: loadingState}
    }),
    totalTasks: 0,
    fetchTasks: async (url) => {
        try {
            const response = await apiAxios.get(url)
            let arrayTasks = response.data.data
            console.log(response)

            console.log("fetchTasks")
            set((state) => ({
                tasks: [
                    ...state.tasks,
                    ...arrayTasks.map((task: any) => ({
                        id: task.id,
                        name: task.attributes.name,
                        description: task.attributes.description,
                        status: task.attributes.status,
                        selected: false,
                    })),
                ],
                currentPage: state.currentPage + 1,
                totalTasks: response.data.meta.pagination.total,
            }));
        }
        catch (error) {
            console.log(error)
        }

    },
    applyFilter: async (tasksFilter, fetchTasks, currentPage) => {

        if (tasksFilter === "all") {
            await fetchTasks("/tasks?pagination%5Bpage%5D=" + currentPage.toString() +
                "&pagination%5BpageSize%5D=" + pageSize.toString());
            console.log("page", currentPage)
        }
        else if (tasksFilter === "finished") {
            await fetchTasks("/tasks?filters%5Bstatus%5D=done&pagination%5Bpage%5D=" + currentPage.toString()
                + "&pagination%5BpageSize%5D=" + pageSize.toString());
        }
        else if (tasksFilter === "unfinished") {
            await fetchTasks("/tasks?filters%5Bstatus%5D=working&filters%5Bstatus%5D=open" +
                "&pagination%5Bpage%5D=" + currentPage.toString() + "&pagination%5BpageSize%5D=" + pageSize.toString());
        }
        else if (tasksFilter === "selected") {
            await fetchTasks("/tasks?pagination%5Bpage%5D=" + currentPage.toString() +
                "&pagination%5BpageSize%5D=" + pageSize.toString());
            let selectedTasksId: number[] = JSON.parse(localStorage.getItem('selectedTasks') || '[]');
            set((state) => ({
                tasks: state.tasks.filter((task: TaskType) => selectedTasksId.includes(task.id))
            }))
        }
        return Promise.resolve();
    }
}));



