import {useTasksStore} from "../../app/store";
import {TasksFilterType} from "../../shared/types";

function TasksFilter() {

    const setTasksFilter = useTasksStore(state => state.setTasksFilter);
    const tasksFilter = useTasksStore((state) => state.tasksFilter);
    const fetchTasks = useTasksStore(state => state.fetchTasks);
    const applyFilter = useTasksStore(state => state.applyFilter);



    return(
        <>
            <p>Фильтр по</p>
            <select onChange={(e) => {
                const newFilter = e.target.value as TasksFilterType;
                setTasksFilter(newFilter);
                console.log("поменяли фильтр " + tasksFilter)
                applyFilter(newFilter, fetchTasks);

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