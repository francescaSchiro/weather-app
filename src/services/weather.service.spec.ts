import { IWeatherResponse } from "src/api/models/WeatherResponse";
import { weatherApi } from "../api/axiosClient";
import { getWeatherByCity } from "./weather.service";


const WEATHER_MOCK: IWeatherResponse = {
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

describe("Weather service", () => {
  it("should get weather", async () => {
    jest.spyOn(weatherApi, "get").mockResolvedValue({ data: WEATHER_MOCK });
    const response = await getWeatherByCity({ city: "Amsterdam" });
    expect(weatherApi.get).toHaveBeenCalledWith("/weather/Amsterdam");
    expect(response).toMatchObject(WEATHER_MOCK);
  });
});