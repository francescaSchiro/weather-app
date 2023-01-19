import { faPooStorm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isAxiosError } from "axios";
import { FC, FormEvent, useCallback, useState } from "react";
import { IWeatherResponse } from "../../api/models/WeatherResponse";
import { CITIES, ICity } from "../../constants";
import { getWeatherByCity } from "../../services/weather.service";
import Spinner from "../Spinner/Spinner";
import "./search-weather-form.scss"



interface ISearchWeatherForm {
    onSubmitted: (weather: IWeatherResponse, city: string) => void;
};

const SearchWeatherForm: FC<ISearchWeatherForm> = ({ onSubmitted }) => {
    const [city, setCity] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null)


    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        console.log('handleSubmit');
        try {
            const weatherRes = await getWeatherByCity({ city });
            console.log('weatherRes', weatherRes);
            onSubmitted(weatherRes, city)
        } catch (err) {
            let errMessage;
            // throw new Error(String(err));
            if (isAxiosError(err) && err.response) {
                console.log('%cSearchWeatherForm.tsx line:33 err', 'color: #007acc;', err);
                errMessage = `ERR ${err.response.status}: ${err.response.data.message}: ` as string;
             } 
             else {
                errMessage = err as string
            }
            setErrorMessage(errMessage)

        } finally {
            setIsLoading(false)
        }

    }, [city, onSubmitted]);

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
            {true ? (
                <>
                <div className="error-message">{errorMessage?.toString() ?? "errore"}</div>
                <div className="error-icon"><FontAwesomeIcon icon={faPooStorm} beatFade/></div>
                </>
            ) : null}


        </div>
    )
};

export default SearchWeatherForm;