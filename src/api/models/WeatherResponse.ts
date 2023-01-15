import { IWeatherDay } from "./WeatherDay";

export interface IWeatherResponse {
	temperature: string,
	wind: string,
	description: string,
	forecast: IWeatherDay[]
};


// export type IWeatherSuccessResponse = {
//     query: {
//         codes: string[],
//         country: string | null,
//     },
//     results: IZipCodeCityResult;
// };