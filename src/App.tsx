import { FC, useCallback, useState } from 'react';
import { IWeatherResponse } from './api/models/WeatherResponse';
import SearchWeatherForm from './components/SearchForm/SearchWeatherForm';
import Tabs, { ITab } from './components/Weather/Tabs';
import WeatherIconsAnimation from './components/Weather/WeatherIconsAnimation';
import WeatherInfo from './components/Weather/WeatherInfo/WeatherInfo';
import './App.scss';


const App: FC = () => {
  const [selectedCity, setSelectedCity] = useState(""); // mi serve per stampare la città derivata da zipcode e country nei risultati
  const [weather, setWeather] = useState<IWeatherResponse | null>(null)
  const [activeTab, setActiveTab] = useState<ITab>("today");
  const handleTabClick = useCallback((tab: ITab) => setActiveTab(tab), []);

  const setWeatherData = useCallback((weather: IWeatherResponse, city: string) => {
    console.log('%cApp.tsx line:23 weather', 'color: #007acc;', weather);
    setActiveTab("today")
    setWeather(weather);
    setSelectedCity(city)
  }, []);


  return (
    <div className="app">

      <div className="app-card">

        <div className="title">
          What's the weather like in...
        </div>

        <SearchWeatherForm
          onSubmitted={setWeatherData}
        />

        <div className="title selected-city">{selectedCity}</div>

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
          
        ) : <WeatherIconsAnimation />}



      </div>

    </div >
  );
};

export default App;
