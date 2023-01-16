import { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import './App.scss';
import { IWeatherResponse } from './api/models/WeatherResponse';
import { getWeatherByCity, IWeatherResponseError } from './services/weather.service';
import { getCityByZipcodeAndCountry, getGeoByZipcode, IZipCodeError } from './services/zipcode.service';
import { COUNTRIES } from './constants';
import { CityByZipcodeSuccessResponse } from './api/models/CityByZipcodeResponse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { IWeatherDay } from './api/models/WeatherDay';
// https://fontawesome.com/icons/cloud?s=light&f=classic


const App: FC = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState(""); // mi serve per stampare la città derivata da zipcode e country nei risultati
  const [zipCode, setZipCode] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [weather, setWeather] = useState<IWeatherResponse | null>(null)
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [activeTab, setActiveTab] = useState<"today" | "3days">("today");

  useEffect(() => {
    console.log('%cApp.tsx line:17 weather', 'color: #007acc;', weather);
  }, [weather])

  const handleCityChange = useCallback(async (value: string) => {
    setCity(value);
    if (noResultsFound) setNoResultsFound(false)
  }, [noResultsFound]);


  const handleCountryCodeChange = useCallback(async (value: keyof typeof COUNTRIES | "") => {
    setCountryCode(value);
    if (noResultsFound) setNoResultsFound(false)
  }, [noResultsFound]);

  const handleZipCodeChange = useCallback(async (value: string) => {
    setZipCode(value);
    if (noResultsFound) setNoResultsFound(false)
  }, [noResultsFound]);


  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // get weather by city derived from city OR country and zipcode  
    let selectedCity = city;

    if (zipCode) {
      await getGeoByZipcode(zipCode);
      const cityFromZipcodeRes = await getCityByZipcodeAndCountry(zipCode, countryCode);
      if (cityFromZipcodeRes.isError) {
        throw new Error(`NO RESULTS FOUND - ZIPCODE invalid for picked country - selected city not found: ${selectedCity}`)
      }
      const successData = cityFromZipcodeRes.data as CityByZipcodeSuccessResponse;
      const cityResult = successData.results[successData.query.codes[0]];
      selectedCity = cityResult?.[0]?.city
    };
    if (!selectedCity) {
      setNoResultsFound(true)
      throw new Error(`NO RESULTS FOUND - ZIPCODE invalid for picked country - selected city not found: ${selectedCity}`)
    };
    setSelectedCity(selectedCity)
    const weatherRes = await getWeatherByCity({ city: selectedCity });
    if (weatherRes.isError) {
      setNoResultsFound(true)
      throw new Error(weatherRes.data as IWeatherResponseError["error"])
    }
    if (!(weatherRes.data as IWeatherResponse).description) {
      setNoResultsFound(true)
      throw new Error(`NO RESULTS FOUND - CITY not found: ${selectedCity}`)
    }
    setWeather(weatherRes.data as IWeatherResponse)

  }, [city, countryCode, zipCode]);

  const handleResetAll = useCallback(() => {
    setCity("");
    setZipCode("")
    setCountryCode("")
    setWeather(null)
    setNoResultsFound(false)
  }, [])

  return (
    <div className="app">
      <div className="title">
        What's the weather like?
      </div>

      <div className="search column">



        <form onSubmit={handleSubmit} className="form-wrapper column">
          <div className='row'>
            <div className="column">

              <label>Search by city </label>
              <input
                disabled={!!countryCode}
                type="text"
                name="city"
                value={city}
                onChange={(event) => handleCityChange(event.target.value.trim())}
                placeholder="City" />


            </div>

            <div className="column">

              <label>or by country and zipcode </label>

              <select
                disabled={!!city.length}
                name="countryCode"
                onChange={(event) => handleCountryCodeChange((event.target.value as "" | keyof typeof COUNTRIES))}
                placeholder='Seleziona un paese'
                value={countryCode}
              >
                <option value="">Select a country</option>
                {Object.keys(COUNTRIES).map(countryCode => (
                  <option key={countryCode} value={countryCode}>{countryCode} - {COUNTRIES[countryCode as keyof typeof COUNTRIES]}</option>
                ))}
              </select>

              <input
                disabled={!countryCode}
                type="text"
                name="zipcode"
                value={zipCode}
                onChange={(event) => handleZipCodeChange(event.target.value.trim())}
                placeholder="Insert zipcode"
              />

            </div>
          </div>

          <button type="submit" disabled={!city && !zipCode && !countryCode}>Search</button>

        </form>

        <button onClick={handleResetAll} disabled={!zipCode && !city}>Remove filters</button>

      </div>

      <div className='content column'>

        <div>{city ?? selectedCity}</div>
        <div>{countryCode}</div>
        <div>{zipCode}</div>
        {weather ? (
          <>
            <div className='tabs row'>
              <div
                className={`tab column ${activeTab === "today" ? "active" : ""}`}
                onClick={() => setActiveTab("today")}
              >Today<FontAwesomeIcon icon={faCoffee} /></div>
              <div
                className={`tab column ${activeTab === "3days" ? "active" : ""}`}
                onClick={() => setActiveTab("3days")}
              >3 days</div>
            </div>

            <div className="weather-info__wrapper">
              {activeTab === "today" ? (
                <div className="weather-info__section">
                  <div>{weather.description}</div>
                  <div>{weather.temperature}</div>
                  <div>{weather.wind}</div>
                </div>
              ) : weather.forecast.map((dayWeather: IWeatherDay) => (
                <div className="weather-info__section">
                  <div>{dayWeather.day}</div>
                  <div>{dayWeather.temperature}</div>
                  <div>{dayWeather.wind}</div>
                </div>
              ))}


            </div>



          </>
        ) : null}

        {noResultsFound && <div className='no-results'> Sorry, no city found</div>}

      </div>

    </div >
  );
};

export default App;
