import {useTasksStore} from "../../app/store";
import {TasksFilterType} from "../../shared/types";
import {Container, FormControl, Grid2, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

function TasksFilter() {

    const setTasksFilter = useTasksStore(state => state.setTasksFilter);
    const fetchTasks = useTasksStore(state => state.fetchTasks);
    const applyFilter = useTasksStore(state => state.applyFilter);
    const setCurrentPage = useTasksStore(state => state.setCurrentPage);
    const setLoading = useTasksStore(state => state.setLoading);
    const setTasks = useTasksStore(state => state.setTasks);

    function onChange(e: SelectChangeEvent) {
        const newFilter = e.target.value as TasksFilterType;
        setTasksFilter(newFilter);
        setCurrentPage(1);
        setTasks([]);
        applyFilter(newFilter, fetchTasks, 1, setLoading)
    }

    return(
        <>
            <Container sx={{display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <Grid2 sx={{minWidth: 300}}>
                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label">Фильтр</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Фильтр"
                            defaultValue={"all"}
                            onChange={(e) => {onChange(e)}}
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