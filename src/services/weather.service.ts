import { IWeatherRequest } from "../api/models/WeatherRequest";
import { weatherApi } from "../api/axiosClient";
import { IWeatherResponse } from "../api/models/WeatherResponse";

export interface IWeatherResponseError {
    error: string;
}

export const getWeatherByCity = async (query: IWeatherRequest) => {
    const { city } = query;
    const response = await weatherApi.get<IWeatherResponse>(`/weather/${city}`)
    console.log('%cweather.service.ts line:35 response', 'color: #007acc;', response);
    console.log('%cweather.service.ts line:35 response.data', 'color: #007acc;', response.data);
    return response.data;

};