import moment from "moment";
import { FC } from "react";
import { IWeatherDay } from "../../api/models/WeatherDay";
import { IWeatherResponse } from "../../api/models/WeatherResponse";
import { ITab } from "./Tabs";

interface IWeatherInfoProps {
    weatherInfo: IWeatherResponse;
    activeTab: ITab;
}

const TODAY = moment();
const FULL_DATE_FORMAT = "dddd DD MMMM yyyy";

const WeatherInfo: FC<IWeatherInfoProps> = ({ weatherInfo, activeTab }) => {

    return (
        <div className="weather-info">
            {activeTab === "today" ? (
                <div className="weather-info__section">
                    <div>{TODAY.format(FULL_DATE_FORMAT)}</div>

                    <div>{weatherInfo.description}</div>
                    <div>{weatherInfo.temperature}</div>
                    <div>{weatherInfo.wind}</div>
                </div>
            ) : weatherInfo.forecast.map((dayWeather: IWeatherDay) => (
                <div key={dayWeather.day} className="weather-info__section">
                    <div>{TODAY.clone().add(dayWeather.day, 'days').format(FULL_DATE_FORMAT)}</div>
                    {/* <div>{dayWeather.day}</div> */}
                    <div>{dayWeather.temperature}</div>
                    <div>{dayWeather.wind}</div>
                </div>
            ))}


        </div>

    )
};

export default WeatherInfo;