import { FC } from "react";
import { IWeatherDay } from "../../../api/models/WeatherDay";
import { IWeatherResponse } from "../../../api/models/WeatherResponse";
import { ITab } from "../Tabs";
import WeatherDate from "./WeatherDate";
import WeatherTempWind from "./WeatherTempWind";
import { TODAY } from "../../../constants";

interface IWeatherInfoProps {
    weatherInfo: IWeatherResponse;
    activeTab: ITab;
}

const WeatherInfo: FC<IWeatherInfoProps> = ({ weatherInfo, activeTab }) => {

    return (
        <div className="weather-info">

            {activeTab === "today" ? (
                <div className={`weather-info__day ${activeTab}`}>
                    <WeatherDate date={TODAY} />
                    <div>
                        <div className="weather-info__day__description">{weatherInfo.description}</div>
                        <WeatherTempWind temp={weatherInfo.temperature} wind={weatherInfo.wind} />
                    </div>
                </div>
            ) : weatherInfo.forecast.map((dayWeather: IWeatherDay) => (
                <div key={dayWeather.day} className={`weather-info__day ${activeTab}`}>
                    <WeatherDate date={TODAY.clone().add(dayWeather.day, 'days')} />
                    <WeatherTempWind temp={dayWeather.temperature} wind={dayWeather.wind} />
                </div>
            ))
            }

        </div>

    )
};

export default WeatherInfo;