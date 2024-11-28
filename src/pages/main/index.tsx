
import {useEffect} from "react";
import AddTask from "../../widgets/task-add";
import TaskList from "../../widgets/task-list";
import {useTasksStore} from "../../app/store";
import TaskFilter from "../../widgets/task-filter";
import axios from "axios";
import {apiAxios} from "../../shared/config";
import {theme} from "./styles";
import {CircularProgress, Container, Grid2, ThemeProvider, Typography} from "@mui/material";

function MainPage() {

    const tasks = useTasksStore((state) => state.tasks);
    const tasksFilter = useTasksStore((state) => state.tasksFilter);
    const fetchTasks = useTasksStore(state => state.fetchTasks);
    const applyFilter = useTasksStore(state => state.applyFilter);

    const fetching = useTasksStore(state => state.fetching);
    const currentPage = useTasksStore(state => state.currentPage);
    const setFetching = useTasksStore(state => state.setFetching);
    const totalTasks = useTasksStore(state => state.totalTasks);

    const loading = useTasksStore(state => state.loading);
    const setLoading = useTasksStore(state => state.setLoading);

    const firstFetch = useTasksStore(state => state.firstFetch);
    const changeFirstFetch = useTasksStore(state => state.changeFirstFetch);


    useEffect(() => {
        if (fetching && !loading) {
            if (firstFetch || (tasks.length < totalTasks)) {
                console.log("useEffect");
                applyFilter(tasksFilter, fetchTasks, currentPage, setLoading).finally(() => {
                    setFetching(false);
                });
            }
            if (firstFetch) {
                changeFirstFetch();
            }
        }
        setFetching(false);
    }, [fetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function() {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, []);

    const scrollHandler = (e: Event) => {
        if (!loading && ((document.documentElement.scrollHeight - (document.documentElement.scrollTop
            + window.innerHeight)) < 2)) {
            console.log('scroll')
            setFetching(true);
        }
    }


    return(
        <>
            <ThemeProvider theme={theme}>

                <Container maxWidth="md" sx={{display: "flex", bgcolor: "primary.main",
                    flexDirection: "column", p:2,
                    alignItems: "center",  minHeight: '100vh'}}>

                    <Typography variant="h1">Todo List</Typography>
                    <button onClick={() => {
                        console.log("tasks", tasks);
                        console.log("loading", loading);
                        console.log("fetching", fetching);
                        console.log("totalTasks", totalTasks);
                    }}>Получить</button>

                    <AddTask />
                    <Grid2 sx={{bgcolor: "secondary.main", m: 2, p: 2, borderRadius: 1}}>
                        <TaskFilter />
                    </Grid2>
                    <TaskList tasks={tasks} />
                    {loading && <Grid2 sx={{m: 2, p: 2}}>
                        <CircularProgress color="secondary" />
                    </Grid2>}
                </Container>

            </ThemeProvider>
        </>
    );
}

export default MainPage;