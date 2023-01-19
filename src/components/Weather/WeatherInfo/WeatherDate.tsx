import moment from "moment";
import { FC } from "react";


interface IWeatherDateProps {
    date: moment.Moment;
};

const WeatherDate: FC<IWeatherDateProps> = ({
    date,
}) => {
    // const FULL_DATE_FORMAT = "dddd DD MMMM yyyy";
    const DAY = date.format("dddd DD");
    const MONTH = date.format("MMMM");
    const YEAR = date.format("yyyy");
    return (
        <div className="date">
            <div>{DAY}</div>
            <div>{MONTH}</div>
            <div>{YEAR}</div>
        </div>

    )
}

export default WeatherDate;