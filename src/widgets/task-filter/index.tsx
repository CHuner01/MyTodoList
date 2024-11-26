import {useTasksStore} from "../../app/store";
import {TasksFilterType} from "../../shared/types";
import {Container, FormControl, Grid2, InputLabel, MenuItem, Select} from "@mui/material";

function TasksFilter() {

    const setTasksFilter = useTasksStore(state => state.setTasksFilter);
    const fetchTasks = useTasksStore(state => state.fetchTasks);
    const applyFilter = useTasksStore(state => state.applyFilter);
    const currentPage = useTasksStore(state => state.currentPage);



    return(
        <>
            <Container sx={{display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <Grid2 sx={{minWidth: 300, }}>
                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label">Фильтр</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={"all"}
                            onChange={(e) => {
                                const newFilter = e.target.value as TasksFilterType;
                                setTasksFilter(newFilter);
                                applyFilter(newFilter, fetchTasks, currentPage);
                            }}

                        >
                            <MenuItem value={"all"}>Без фильтра</MenuItem>
                            <MenuItem value={"finished"}>Выполненные</MenuItem>
                            <MenuItem value={"unfinished"}>Не выполненные</MenuItem>
                            <MenuItem value={"selected"}>Избранные</MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>

            </Container>
        </>
    );
}

export default TasksFilter;