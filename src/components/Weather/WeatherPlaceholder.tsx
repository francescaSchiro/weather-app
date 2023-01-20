import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import { ANIMATION_INTERVAL, WEATHER_ICONS } from "../../constants";


const WeatherPlaceholder: FC = () => {
  const [visibleIconIndex, setVisibleIconIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (visibleIconIndex + 1) === WEATHER_ICONS.length ? 0 : visibleIconIndex + 1;
      setVisibleIconIndex(newIndex)
    }, ANIMATION_INTERVAL);

    return () => clearInterval(interval);
  }, [visibleIconIndex]);

  return (
    <div className="weather-placeholder-container">
      <FontAwesomeIcon icon={WEATHER_ICONS[visibleIconIndex]} fade />
    </div>
  )
};

export default WeatherPlaceholder;