import { create } from "zustand"
import TaskType, {TasksFilterType} from "../shared/types";
import {apiAxios, pageSize} from "../shared/config";



type FetchTasksFunction = (url: string) => void;
type SetLoadingFunction = (loadingState: boolean) => void;

interface TasksState {
    tasks: TaskType[];
    addTask: (newTask: TaskType) => void;
    setTasks: (newTasks: TaskType[]) => void;
    fetchTasks: FetchTasksFunction;
    tasksFilter: TasksFilterType;
    setTasksFilter: (filter: TasksFilterType) => void;
    applyFilter: ( tasksFilter: TasksFilterType, fetchTasks: FetchTasksFunction,
                   currentPage: number, setLoading: SetLoadingFunction) => Promise<void>;

    fetching: boolean;
    setFetching: (fetchingState: boolean) => void;
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
    totalTasks: number;
    setTotalTasks: (newTotalTasks: number) => void;
    loading: boolean;
    setLoading: (loadingState: boolean) => void;
    firstFetch: boolean;
    changeFirstFetch: () => void;


}

export const useTasksStore = create<TasksState>((set) => ({
    tasks: [],
    addTask: (newTask) => set((state) => ({
        tasks: [...state.tasks, newTask]
    })),
    setTasks: (newTasks) => set({tasks: newTasks}),
    tasksFilter: "all",
    setTasksFilter: (filter) => set({ tasksFilter: filter}),
    fetching: true,
    setFetching: (fetchingState: boolean) => set(() => ({fetching: fetchingState})),
    currentPage: 1,
    setCurrentPage: (newPage: number) => set(() => ({currentPage: newPage})),
    loading: false,
    setLoading: (loadingState: boolean) => set(() => ({loading: loadingState})),
    totalTasks: 0,
    setTotalTasks: (newTotalTasks: number) => set(() => ({totalTasks: newTotalTasks})),
    firstFetch: true,
    changeFirstFetch: () => set({firstFetch : false}),

    fetchTasks: async (url) : Promise<number | void>  => {
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
    applyFilter: async (tasksFilter, fetchTasks, currentPage,
                        setLoading) => {
        setLoading(true);

        if (currentPage === 1) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }





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
            let selectedTasksId: number[] = JSON.parse(localStorage.getItem('selectedTasks') || '[]');
            await fetchTasks("/tasks");
            let selectedNumber: number;
            set((state) => ({
                totalTasks: state.tasks.filter((task: TaskType) => selectedTasksId.includes(task.id)).length,
                tasks: [],
                selectedNumber: state.totalTasks
            }))
            await fetchTasks("/tasks?pagination%5Bpage%5D=" + currentPage.toString() +
                "&pagination%5BpageSize%5D=" + pageSize.toString());

            set((state) => ({
                tasks: state.tasks.filter((task: TaskType) => selectedTasksId.includes(task.id)),
                totalTasks: selectedNumber
            }))
        }
        setLoading(false)
        return Promise.resolve();
    }
}));



