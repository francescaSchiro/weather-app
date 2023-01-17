import { FC, useCallback, useState } from "react";
import { IWeatherResponse } from "../../api/models/WeatherResponse";
import Tabs, { ITab } from "./Tabs";
import WeatherInfo from "./WeatherInfo";
import "./weather-container.scss"


interface IWeatherContainer {
    weather: IWeatherResponse;
}

const WeatherContainer: FC<IWeatherContainer> = ({weather}) => {
    const [activeTab, setActiveTab] = useState<ITab>("today");
    const handleTabClick = useCallback((tab: ITab) => setActiveTab(tab), []);

    return (
        <div className="weather-container">
            <Tabs
                activeTab={activeTab}
                onTabClick={handleTabClick}
            />
            <WeatherInfo
                weatherInfo={weather}
                activeTab={activeTab}
            />
        </div>
    )
};

export default WeatherContainer;