import axios from "axios";

export const API_URL: string = "https://cms.laurence.host/api";


export const apiAxios = axios.create({
    baseURL: API_URL,

})

export const pageSize = 4;