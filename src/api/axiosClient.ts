import axios from "axios"
import { URLS } from "./urls"


export const WeatherApi = axios.create({
    baseURL: URLS.WEATHER,
});

export const ZipCodeApi = axios.create({
    baseURL: URLS.ZIPCODE,    
})