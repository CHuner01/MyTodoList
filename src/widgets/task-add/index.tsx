import {useTasksStore} from "../../app/store";
import {apiAxios} from "../../shared/config";
import {Button, Container, Grid2, Paper, TextField} from "@mui/material";
import {useState} from "react";

function AddTask() {
    const addTask = useTasksStore(state => state.addTask);
    const tasksFilter = useTasksStore((state) => state.tasksFilter);

    const [taskName, setTaskName] = useState<string>("");
    const [taskDescription, setTaskDescription] = useState<string>("");


    function CreateTask() {
        console.log("CreateTask");
        console.log(taskName);
        if (taskName !== "") {
            apiAxios.post("/tasks", {
                "data" : {
                    "name": taskName,
                    "description": taskDescription,
                    "status": "open"
                }
            }).then(function (response) {
                console.log(response);
                let newTask = response.data.data
                if (tasksFilter === "unfinished" || tasksFilter === "all") {
                    addTask({
                        id: newTask.id,
                        name: newTask.attributes.name,
                        description: newTask.attributes.description,
                        status: newTask.attributes.status,
                        selected: false,
                    })
                }
                setTaskName("");
                setTaskDescription("");
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
                                           value={taskName || ""}
                                           onChange={(e) => {
                                               setTaskName(e.target.value);
                                           }}
                                />
                            </Grid2>
                            <Grid2 m={1}>
                                <TextField id="standard-basic" label="Описание"
                                           sx={{minWidth: 250}}
                                           multiline
                                           variant="standard"
                                           value={taskDescription || ""}
                                           onChange={(e) => {
                                               setTaskDescription(e.target.value);
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