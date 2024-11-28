import TaskType, {TaskStatusType} from "../../shared/types";
import {apiAxios} from "../../shared/config";
import {useState} from "react";
import {useTasksStore} from "../../app/store";
import {Checkbox, Fab, FormControl, Grid2, InputLabel, MenuItem, Paper, Select, Typography} from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ClearIcon from '@mui/icons-material/Clear';
function Task({id, name, description, status, selected}: TaskType) {

    const tasks = useTasksStore((state) => state.tasks);
    const tasksFilter = useTasksStore((state) => state.tasksFilter);
    const totalTasks = useTasksStore(state => state.totalTasks);
    const setTotalTasks = useTasksStore(state => state.setTotalTasks);
    const setTasks = useTasksStore(state => state.setTasks);


    let taskStatus: TaskStatusType = status;

    const [taskSelected, setTaskSelected] = useState(selected)

    function ChangeStatus() {
        console.log("ChangeStatus");
        apiAxios.put("/tasks/" + id.toString(), {
            "data" : {
                "name": name,
                "description": description,
                "status": taskStatus
            }
        })
            .then(function (response) {
                console.log(response);
                if ((tasksFilter === "finished" && taskStatus !== "done") ||
                    (tasksFilter === "unfinished" && taskStatus === "done")) {
                    setTasks(tasks.filter(task => task.id !== id));
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    function SelectTask() {
        console.log("SelectTask");
        let selectedTasksId: number[] = JSON.parse(localStorage.getItem('selectedTasks') || '[]');
        if (taskSelected) {
            selectedTasksId = selectedTasksId.filter(taskId => taskId !== id);
            if (tasksFilter === "selected") {
                setTasks(tasks.filter(task => task.id !== id));
            }
        }
        else {
            selectedTasksId.push(id);
        }
        localStorage.setItem('selectedTasks', JSON.stringify(selectedTasksId));
        setTaskSelected(taskSelected => !taskSelected);

    }

    function DeleteTask() {
        console.log("DeleteTask");
        let selectedTasksId: number[] = JSON.parse(localStorage.getItem('selectedTasks') || '[]');
        apiAxios.delete("/tasks/" + id.toString())
            .then(function (response) {
                console.log(response);
                setTasks(tasks.filter(task => task.id !== id));
                setTotalTasks(totalTasks - 1);
                selectedTasksId = selectedTasksId.filter(taskId => taskId !== id);
                localStorage.setItem('selectedTasks', JSON.stringify(selectedTasksId));
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <>
            <Paper elevation={1}>
                <Grid2 container sx={{display: "flex", justifyContent: "space-between"}}>
                    <Grid2 p={1}>
                        <Grid2 m={2} width={350} minWidth={300}>
                            <Typography sx={{ wordBreak: "break-word" }} variant="h2">{name}</Typography>
                        </Grid2>
                        <Grid2 m={2} mt={3} width={250} minWidth={200}>
                            <Typography sx={{ wordBreak: "break-word" }} variant="h3">{description}</Typography>
                        </Grid2>
                    </Grid2>
                    <Grid2 p={2}  sx={{display: "flex", flexDirection: "row"}}>
                        <Grid2 m={1} sx={{display: "flex", alignItems: "center"}}>
                            <Checkbox
                                size="large"
                                checked={taskSelected}
                                icon={<BookmarkBorderIcon />}
                                checkedIcon={<BookmarkIcon />}
                                onChange={SelectTask}
                            />
                        </Grid2>
                        <Grid2 m={1} minWidth={150} sx={{display: "flex", alignItems: "center"}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Статус</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Статус"
                                    defaultValue={status}
                                    onChange={(e) => {
                                    (taskStatus = e.target.value as TaskStatusType);
                                    ChangeStatus();
                                    }}
                                >
                                    <MenuItem value={"open"}>Открыта</MenuItem>
                                    <MenuItem value={"working"}>В работе</MenuItem>
                                    <MenuItem value={"done"}>Выполнена</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid2>
                        <Grid2 m={1} ml={3}>
                            <Fab color="primary" size="medium" onClick={DeleteTask}>
                                <ClearIcon />
                            </Fab>
                        </Grid2>
                    </Grid2>
                </Grid2>

            </Paper>
        </>
    );
}



export default Task;