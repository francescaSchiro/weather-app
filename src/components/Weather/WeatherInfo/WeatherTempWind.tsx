import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind, faTemperatureHalf } from "@fortawesome/free-solid-svg-icons";


interface IWeatherTempWindProps {
  temp: string;
  wind: string;
}

const WeatherTempWind: FC<IWeatherTempWindProps> = ({
  temp,
  wind
}) => {
  return (
    <div className="weather-info__day__date-temperature">
      <div>
        <FontAwesomeIcon icon={faTemperatureHalf} />
        {temp}
      </div>
      <div>
        <FontAwesomeIcon icon={faWind} />
        {wind}
      </div>
    </div>
  )
}

export default WeatherTempWind;