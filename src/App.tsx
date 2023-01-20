import { FC, useCallback, useState } from 'react';
import { IWeatherResponse } from './api/models/WeatherResponse';
import SearchForm from './components/SearchForm/SearchForm';
import Tabs from './components/Weather/Tabs';
import WeatherInfo from './components/Weather/WeatherInfo/WeatherInfo';
import './App.scss';
import { LABELS } from './constants';


const App: FC = () => {
  const [weather, setWeather] = useState<IWeatherResponse | null>(null)
  const [activeTab, setActiveTab] = useState(LABELS.TABS[0]);
  const handleTabClick = useCallback((tab: string) => setActiveTab(tab), []);

  const setWeatherData = useCallback((weather: IWeatherResponse | null) => {
    setActiveTab(LABELS.TABS[0])
    setWeather(weather);
  }, []);

  return (
    <div className="app">

      <div className="app__card">

        <div className="app__card__title">
          {LABELS.APP_TITLE}
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
