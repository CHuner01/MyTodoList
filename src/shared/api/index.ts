import {apiAxios} from "../config";


function GetTasks() {

    //обработать список который я получаю

   // const setTasks = useTasksStore((state) => state.setTasks);


    apiAxios.get("/tasks")
        .then(function (response) {
          //  setTasks(response.data)
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })

    return (null);
}

export default GetTasks;