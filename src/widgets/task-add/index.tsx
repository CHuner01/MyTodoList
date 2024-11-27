import {useTasksStore} from "../../app/store";
import axios from "axios";
import {apiAxios} from "../../shared/config";
import useGetTasks from "../../shared/api";
import GetTasks from "../../shared/api";
import {Button, Container, Grid2, Paper, TextField} from "@mui/material";

function AddTask() {

    const tasks = useTasksStore(state => state.tasks);
    const setTasks = useTasksStore(state => state.setTasks);
    const tasksFilter = useTasksStore((state) => state.tasksFilter);
    const fetchTasks = useTasksStore(state => state.fetchTasks);
    const applyFilter = useTasksStore(state => state.applyFilter);
    const currentPage = useTasksStore(state => state.currentPage);
    const setCurrentPage = useTasksStore(state => state.setCurrentPage);
    const setLoading = useTasksStore(state => state.setLoading);

    let taskName: string;
    let taskDescription: string;


    function CreateTask() {
        console.log("CreateTask");
        console.log(taskName);
        if (taskName !== undefined) {
            apiAxios.post("/tasks", {
                "data" : {
                    "name": taskName,
                    "description": taskDescription,
                    "status": "open"
                }
            }).then(function (response) {
                console.log(response);
                setCurrentPage(1);
                setLoading(true);
                setTasks([]).finally(() => (
                    applyFilter(tasksFilter, fetchTasks, 1).finally(() => (
                        setLoading(false)
                    ))
                ));
            })
                .catch(function (error) {
                    console.log(error);
                })
        }

    }

    return (
        <>
            <Container sx={{display: "flex",
                flexDirection: "column",
                alignItems: "center"}}>
                <Paper sx={{minWidth: 250, }}>
                    <Grid2 container sx={{display: "flex", flexDirection: "row",
                        justifyContent: "space-between"}}>
                        <Grid2 m={1}>
                            <Grid2 m={1}>
                                <TextField id="standard-basic" label="Новая задача"
                                           sx={{minWidth: 250}}
                                           multiline
                                           variant="standard"
                                           onChange={(e) => {
                                               taskName = e.target.value;
                                           }}
                                />
                            </Grid2>
                            <Grid2 m={1}>
                                <TextField id="standard-basic" label="Описание"
                                           sx={{minWidth: 250}}
                                           multiline
                                           variant="standard"
                                           onChange={(e) => {
                                               taskDescription = e.target.value;
                                           }}
                                />
                            </Grid2>
                        </Grid2>
                        <Grid2 m={3} sx={{display: "flex", alignItems: "flex-end"}}>
                            <Button variant="contained" onClick={CreateTask}>Добавить</Button>
                        </Grid2>
                    </Grid2>
                </Paper>
            </Container>
        </>
);
}

export default AddTask;