import { FC, useCallback, useState } from 'react';
import { IWeatherResponse } from './api/models/WeatherResponse';
import SearchForm from './components/SearchForm/SearchForm';
import Tabs, { ITab } from './components/Weather/Tabs';
import WeatherInfo from './components/Weather/WeatherInfo/WeatherInfo';
import './App.scss';


const App: FC = () => {
  const [weather, setWeather] = useState<IWeatherResponse | null>(null)
  const [activeTab, setActiveTab] = useState<ITab>("today");
  const handleTabClick = useCallback((tab: ITab) => setActiveTab(tab), []);

  const setWeatherData = useCallback((weather: IWeatherResponse | null) => {
    console.log('%cApp.tsx line:23 weather', 'color: #007acc;', weather);
    setActiveTab("today")
    setWeather(weather);
  }, []);


  return (
    <div className="app">

      <div className="app__card">

        <div className="app__card__title">
          What's the weather like in...
        </div>

        <SearchForm
          onSubmitted={setWeatherData}
        />

        {weather ? (
          <div className="weather-container">

            <Tabs
              activeTab={activeTab}
              onTabClick={handleTabClick}
            />

            <WeatherInfo
              weatherInfo={weather}
              activeTab={activeTab}
            />

          </div>
          
        ) : null}

      </div>

    </div >
  );
};

export default App;
