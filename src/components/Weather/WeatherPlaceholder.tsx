import { faBolt, faCloudSunRain, faRainbow, faSnowflake, faSun, faUmbrella } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";


const WEATHER_ICONS = [
    faSun,
    faCloudSunRain,
    faRainbow,
    faUmbrella,
    faSnowflake,
    faBolt,
    faCloudSunRain,
];

const WeatherPlaceholder: FC = () => {
    const [visibleIconIndex, setVisibleIconIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const newIndex = (visibleIconIndex + 1) === WEATHER_ICONS.length ? 0 : visibleIconIndex + 1;
            setVisibleIconIndex(newIndex)
        }, 2000);

        return () => clearInterval(interval);
    }, [visibleIconIndex]);

    return (
        <div className="weather-placeholder-container">
            <FontAwesomeIcon icon={WEATHER_ICONS[visibleIconIndex]} fade />
        </div>

    )
};

export default WeatherPlaceholder;