import { FC } from "react";
import { IWeatherResponse } from "../../api/models/WeatherResponse";
import { ITab } from "./Tabs";
import WeatherInfo from "./WeatherInfo/WeatherInfo";


interface IWeatherContainer {
    weather: IWeatherResponse;
    activeTab: ITab;
}

const WeatherContainer: FC<IWeatherContainer> = ({weather, activeTab}) => {

    return (
            <WeatherInfo
                weatherInfo={weather}
                activeTab={activeTab}
            />
    )
};

export default WeatherContainer;