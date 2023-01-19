import { IWeatherRequest } from "../api/models/WeatherRequest";
import { weatherApi } from "../api/axiosClient";
import { IWeatherResponse } from "../api/models/WeatherResponse";

export interface IWeatherResponseError {
    error: string;
}

const WEATHER_MOCK = {
    temperature: "+12 °C",
    wind: "7 km/h",
    description: "Partly cloudy",
    forecast: [
        {
            day: "1",
            temperature: "+12 °C",
            wind: "18 km/h"
        },
        {
            day: "2",
            temperature: "+10 °C",
            wind: "29 km/h"
        },
        {
            day: "3",
            temperature: "+11 °C",
            wind: "28 km/h"
        }
    ]
}

export const getWeatherByCity = async (query: IWeatherRequest) => {
    const { city } = query;
    const response = await weatherApi.get<IWeatherResponse>(`/weather/${city}`)
    console.log('%cweather.service.ts line:35 response.data', 'color: #007acc;', response.data);
    return response.data;

};