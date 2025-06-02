// components/MainWeather.jsx
import React from 'react';
import TodayCard from './TodayCard';
import HourlyForecast from './HourlyForecast';

function MainWeather({ idCity }) {
  return (
    <div className="main-weather">
      <TodayCard idCity={idCity} />
      <HourlyForecast idCity={idCity} />
    </div>
  );
}

export default MainWeather;
