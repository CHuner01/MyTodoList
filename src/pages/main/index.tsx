
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


    useEffect(() => {
        if (fetching) {
            if ((totalTasks === 0) || (tasks.length < totalTasks)) {
                console.log("useEffect")
                applyFilter(tasksFilter, fetchTasks, currentPage).finally(() => {
                    setFetching(false);
                    setLoading(false);
                });
            } else {
                setFetching(false);
            }
        }
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
                    flexDirection: "column",
                    alignItems: "center",  minHeight: '100vh'}}>

                    <Typography variant="h1">Todo List</Typography>
                    <button onClick={() => console.log(tasks)}>Получить</button>

                    <AddTask />
                    <Grid2 sx={{bgcolor: "secondary.main", m: 2, p: 2, borderRadius: 1}}>
                        <TaskFilter />
                    </Grid2>
                    {loading ? <CircularProgress color="secondary" /> : <TaskList tasks={tasks} />}
                </Container>

            </ThemeProvider>
        </>
    );
}

export default MainPage;