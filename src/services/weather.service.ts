import { IWeatherRequest } from "../api/models/WeatherRequest";
import { WeatherApi } from "../api/axiosClient";
import { IWeatherResponse } from "../api/models/WeatherResponse";
import { AxiosError, isAxiosError } from "axios";


export interface IWeatherResponseError {
    error: string;
}


export const getWeatherByCity = async (query: IWeatherRequest) => {
    try {
        const { city } = query;
        const response = await WeatherApi.get<IWeatherResponse>(`/${city}`)
        return { isError: false, data: response.data as IWeatherResponse };
    } catch (err) {
        const errors = err as Error | AxiosError;
        return { isError: true, data: !isAxiosError(errors) ? errors.message : (errors.response?.data as IWeatherResponseError).error }
    }
};