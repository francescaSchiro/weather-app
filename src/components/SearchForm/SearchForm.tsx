import { faPooStorm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isAxiosError } from "axios";
import { FC, FormEvent, useCallback, useState } from "react";
import { IWeatherResponse } from "../../api/models/WeatherResponse";
import { CITIES, ICity, LABELS } from "../../constants";
import { getWeatherByCity } from "../../services/weather.service";
import Spinner from "../Spinner/Spinner";
import WeatherPlaceholder from "../Weather/WeatherPlaceholder";
import "./search-form.scss"


interface ISearchWeatherForm {
	onSubmitted: (weather: IWeatherResponse | null) => void;
};

const SearchForm: FC<ISearchWeatherForm> = ({ onSubmitted }) => {
	const [city, setCity] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	// dont show animation if error or weather
	const [showPlaceholder, setShowPlaceholder] = useState(true);

	const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		try {
			const weatherRes = await getWeatherByCity({ city });
			onSubmitted(weatherRes)
		} catch (err) {
			let errMessage;
			if (isAxiosError(err) && err.response) {
				errMessage = `ERR ${err.response.status}: ${err.response.data.message}: ` as string;
				onSubmitted(null)
			}
			else {
				errMessage = err as string
				onSubmitted(null)
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
		<div className="search-form">

			<form onSubmit={handleSubmit} className="search-form__wrapper">

				<div className="search-form__wrapper__city-select" data-cy="select">

					<select
						name="city"
						onChange={(event) => onCityChange(event.target.value as "" | ICity)}
						value={city}
					>
						<option value="" disabled>{LABELS.FORM.SELECT_PLACEHOLDER}</option>
						{CITIES.map(city => (
							<option data-cy={`option-${city}`} key={city} value={city}>{city}</option>
						))}
					</select>
					<span className="focus"></span>

				</div>

				<button type="submit" disabled={!city}>
					{isLoading ? <Spinner /> : LABELS.FORM.BUTTON}
				</button>

			</form>

			{errorMessage ? (
				<>
					<div className="error">
						<div className="error__icon">
							<FontAwesomeIcon icon={faPooStorm} shake />
						</div>
						{errorMessage?.toString() ?? LABELS.FORM.ERROR}
					</div>
				</>
			) : showPlaceholder ? <WeatherPlaceholder /> : null}

		</div>
	)
};

export default SearchForm;