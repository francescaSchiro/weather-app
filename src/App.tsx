import { FC, useCallback, useState } from 'react';
import './App.scss';
import { IWeatherResponse } from './api/models/WeatherResponse';
import WeatherContainer from './components/Weather/WeatherContainer';
import SearchWeatherForm from './components/SearchForm/SearchWeatherForm';

// https://fontawesome.com/icons/cloud?s=light&f=classic


const App: FC = () => {
  const [selectedCity, setSelectedCity] = useState(""); // mi serve per stampare la città derivata da zipcode e country nei risultati
  const [weather, setWeather] = useState<IWeatherResponse | null>(null)
  // const [noResultsFound, setNoResultsFound] = useState(false);






  const resetWeather = useCallback(() => setWeather(null), []);

  const handleSubmit = useCallback((weather: IWeatherResponse, city: string) => {
    console.log('%cApp.tsx line:23 weather', 'color: #007acc;', weather);
    setWeather(weather);
    setSelectedCity(city)
  }, []);


  return (
    <div className="app">
      <div className="title">
        What's the weather like?
      </div>

      <SearchWeatherForm
        onFormSubmit={handleSubmit}
        onFormReset={resetWeather}
      />

      <div className='content'>

        <div className="title">{selectedCity}</div>

        {weather ? (
          <WeatherContainer
            weather={weather}
          />
        ) : null}

        {/* {noResultsFound && <div className='no-results'> Sorry, no city found</div>} */}

      </div>

    </div >
  );
};

export default App;
