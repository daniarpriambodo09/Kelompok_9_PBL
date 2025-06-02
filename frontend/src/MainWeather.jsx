// components/MainWeather.jsx
import React from 'react';
import TodayCard from './TodayCard';
import HourlyForecast from './HourlyForecast';

function MainWeather() {
  return (
    <div className="main-weather">
      <TodayCard />
      <HourlyForecast />
    </div>
  );
}

export default MainWeather;