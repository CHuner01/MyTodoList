import TaskType, {TaskStatusType} from "../../shared/types";
import {apiAxios} from "../../shared/config";
import {useState} from "react";
import {useTasksStore} from "../../app/store";
import {Checkbox, Fab, FormControl, Grid2, InputLabel, MenuItem, Paper, Select, Typography} from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ClearIcon from '@mui/icons-material/Clear';
function Task({id, name, description, status, selected}: TaskType) {

    //сделать пропсы одним объектом Task

    const tasksFilter = useTasksStore((state) => state.tasksFilter);
    const fetchTasks = useTasksStore(state => state.fetchTasks);
    const applyFilter = useTasksStore(state => state.applyFilter);
    const currentPage = useTasksStore(state => state.currentPage);


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
                applyFilter(tasksFilter, fetchTasks, currentPage);
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
        }
        else {
            selectedTasksId.push(id);
        }
        localStorage.setItem('selectedTasks', JSON.stringify(selectedTasksId));
        setTaskSelected(taskSelected => !taskSelected);
        applyFilter(tasksFilter, fetchTasks, currentPage);
    }



    function DeleteTask() {
        console.log("DeleteTask");
        let selectedTasksId: number[] = JSON.parse(localStorage.getItem('selectedTasks') || '[]');
        selectedTasksId = selectedTasksId.filter(taskId => taskId !== id);
        localStorage.setItem('selectedTasks', JSON.stringify(selectedTasksId));

        apiAxios.delete("/tasks/" + id.toString())
            .then(function (response) {
                console.log(response);
                applyFilter(tasksFilter, fetchTasks, currentPage);
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
                                    defaultValue={taskStatus}
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