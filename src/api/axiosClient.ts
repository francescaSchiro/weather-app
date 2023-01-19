import axios from "axios";
import { URLS } from "./urls"


export const weatherApi = axios.create({
    baseURL: URLS.WEATHER,
});