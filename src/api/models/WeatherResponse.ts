import { IWeatherDay } from "./WeatherDay";

export interface IWeatherResponse {
	temperature: string,
	wind: string,
	description: string,
	forecast: IWeatherDay[]
};