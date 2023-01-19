import moment from "moment";
import { FC } from "react";
import { IWeatherDay } from "../../../api/models/WeatherDay";
import { IWeatherResponse } from "../../../api/models/WeatherResponse";
import { ITab } from "../Tabs";
import WeatherDate from "./WeatherDate";
import WeatherTempWind from "./WeatherTempWind";
import 'moment/locale/it' 
moment.locale('it')

interface IWeatherInfoProps {
    weatherInfo: IWeatherResponse;
    activeTab: ITab;
}

const TODAY = moment();

const WeatherInfo: FC<IWeatherInfoProps> = ({ weatherInfo, activeTab }) => {

    return (
        <div className="weather-info">

            {activeTab === "today" ? (
                <div className={`weather-info-day ${activeTab}`}>
                    <WeatherDate date={TODAY} />
                    <div>
                        <div className="description">{weatherInfo.description}</div>
                        <WeatherTempWind temp={weatherInfo.temperature} wind={weatherInfo.wind} />
                    </div>
                </div>
            ) : weatherInfo.forecast.map((dayWeather: IWeatherDay) => (
                <div key={dayWeather.day} className={`weather-info-day ${activeTab}`}>
                    <WeatherDate date={TODAY.clone().add(dayWeather.day, 'days')} />
                    <WeatherTempWind temp={dayWeather.temperature} wind={dayWeather.wind} />
                </div>
            ))
            }

        </div>

    )
};

export default WeatherInfo;