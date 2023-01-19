import { weatherApi } from "../api/axiosClient";
import { getWeatherByCity } from "./weather.service";

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

describe("Weather service", () => {
  it("should get weather", async () => {
    console.log('%cweather.service.spec.ts line:29 weatherApi', 'color: #007acc;', weatherApi);
    jest.spyOn(weatherApi, "get").mockResolvedValue(WEATHER_MOCK);

    const response = await getWeatherByCity({ city: "Amsterdam" });

    expect(weatherApi.get).toHaveBeenCalledWith("/weather/Amsterdam");
    expect(response).toBeDefined();
    expect(response).toEqual(WEATHER_MOCK);

    //   expect(response.isError).toBeFalsy();
    //   expect(response.response).toEqual(MOCKED_APPOINTMENT);
    //   expect(response.message).toBeUndefined();
    //   expect(reservationsApiV2.getAppointmentDetails).toHaveBeenCalledWith(21208, 23520);
  });
});