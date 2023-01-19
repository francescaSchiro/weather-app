import { faPooStorm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isAxiosError } from "axios";
import { FC, FormEvent, useCallback, useState } from "react";
import { IWeatherResponse } from "../../api/models/WeatherResponse";
import { CITIES, ICity } from "../../constants";
import { getWeatherByCity } from "../../services/weather.service";
import Spinner from "../Spinner/Spinner";
import WeatherPlaceholder from "../Weather/WeatherPlaceholder";
import "./search-weather-form.scss"



interface ISearchWeatherForm {
	onSubmitted: (weather: IWeatherResponse | null) => void;
};

const SearchWeatherForm: FC<ISearchWeatherForm> = ({ onSubmitted }) => {
	const [city, setCity] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	// dont show animation if error or weather set
	const [showPlaceholder, setShowPlaceholder] = useState(true);


	const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		console.log('handleSubmit');
		try {
			const weatherRes = await getWeatherByCity({ city });
			console.log('weatherRes', weatherRes);
			onSubmitted(weatherRes)
		} catch (err) {
			let errMessage;
			if (isAxiosError(err) && err.response) {
				console.log('%cSearchWeatherForm.tsx line:33 err', 'color: #007acc;', err);
				errMessage = `ERR ${err.response.status}: ${err.response.data.message}: ` as string;
				onSubmitted(null)
			}
			else {
				onSubmitted(null)
				errMessage = err as string
			}
			setErrorMessage(errMessage)

		} finally {
			setIsLoading(false)
			setShowPlaceholder(false)
		}

	}, [city, onSubmitted]);

	const onCityChange = useCallback((city: string) => {
		if (errorMessage) setErrorMessage(null);
		setCity(city);
	}, [errorMessage]);



	return (
		<div className="search-weather-form">

			<form onSubmit={handleSubmit} className="form-wrapper">

				<div className="citySelect" data-cy="select">

					<select
						name="city"
						onChange={(event) => onCityChange(event.target.value as "" | ICity)}
						value={city}
					>
						<option value="" disabled>Pick a city</option>
						{CITIES.map(city => (
							<option data-cy={`option-${city}`} key={city} value={city}>{city}</option>
						))}
					</select>
					<span className="focus"></span>

				</div>

				<button type="submit" disabled={!city}>
					{isLoading ? <Spinner /> : "find out!"}
				</button>

			</form>

			{errorMessage ? (
				<>
					<div className="error-message">
						<div className="error-icon">
							<FontAwesomeIcon icon={faPooStorm} shake />
						</div>
						{errorMessage?.toString() ?? "errore"}
					</div>
				</>
			) : showPlaceholder ? <WeatherPlaceholder /> : null}

		</div>
	)
};

export default SearchWeatherForm;