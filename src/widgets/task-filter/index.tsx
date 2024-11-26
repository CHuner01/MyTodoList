import {useTasksStore} from "../../app/store";
import {TasksFilterType} from "../../shared/types";

function TasksFilter() {

    const setTasksFilter = useTasksStore(state => state.setTasksFilter);
    const fetchTasks = useTasksStore(state => state.fetchTasks);
    const applyFilter = useTasksStore(state => state.applyFilter);
    const currentPage = useTasksStore(state => state.currentPage);



    return(
        <>
            <p>Фильтр по</p>
            <select onChange={(e) => {
                const newFilter = e.target.value as TasksFilterType;
                setTasksFilter(newFilter);
                applyFilter(newFilter, fetchTasks, currentPage);

            }}>
                <option value="all">Без фильтра</option>
                <option value="finished">Выполненные</option>
                <option value="unfinished">Не выполненные</option>
                <option value="selected">Избранные</option>
            </select>
        </>
    );
}

export default TasksFilter;