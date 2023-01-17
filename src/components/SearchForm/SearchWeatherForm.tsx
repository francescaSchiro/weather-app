import { FC, FormEvent, useCallback, useState } from "react";
import { IWeatherResponse } from "../../api/models/WeatherResponse";
import { CITIES, ICity } from "../../constants";
import { getWeatherByCity, IWeatherResponseError } from "../../services/weather.service";
import Spinner from "../Spinner/Spinner";
import "./search-weather-form.scss"



interface ISearchWeatherForm {
    onFormSubmit: (weather: IWeatherResponse, city: string) => void;
    onFormReset: () => void;
};

const SearchWeatherForm: FC<ISearchWeatherForm> = ({ onFormSubmit, onFormReset }) => {
    const [city, setCity] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)


    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const weatherRes = await getWeatherByCity({ city });
        if (weatherRes.isError) {
            setErrorMessage(weatherRes.data)
            setIsLoading(false)
            throw new Error(weatherRes.data)
        };
        onFormSubmit(weatherRes.data as IWeatherResponse, city)

        setIsLoading(false)

    }, [city, onFormSubmit]);

    const onCityChange = useCallback((city: string) => {
        if (errorMessage) setErrorMessage(null);
        setCity(city);
    }, [errorMessage]);



    return (
        <div className="search-weather-form">

            <form onSubmit={handleSubmit} className="form-wrapper">
                <div className="citySelect">
                    <select
                        name="city"
                        onChange={(event) => onCityChange(event.target.value as "" | ICity)}
                        value={city}
                    >
                        <option value="" disabled>Pick a city</option>
                        {CITIES.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    <span className="focus"></span>


                </div>

                <button type="submit" disabled={!city}>
                    {isLoading ? <Spinner /> : "Search"}
                </button>

            </form>
            {errorMessage ? (
                <div className="error-message">{errorMessage}</div>
            ) : null}


        </div>
    )
};

export default SearchWeatherForm;