import { IWeatherRequest } from "../api/models/WeatherRequest";
import { WeatherApi } from "../api/axiosClient";
import { IWeatherResponse } from "../api/models/WeatherResponse";
import { isAxiosError } from "axios";


export interface IWeatherResponseError {
    error: string;
}


export const getWeatherByCity = async (query: IWeatherRequest) => {
    try {
        const { city } = query;
        const response = await WeatherApi.get<IWeatherResponse>(`/${city}`)
        return { isError: false, data: response.data as IWeatherResponse };
    } catch (err) {
        let errMessage;
        if (isAxiosError(err) && err.response) {
            errMessage = err.response.data.message;
        } else {
            errMessage = String(err)
        }
        return { isError: true, data: errMessage };

    }
};