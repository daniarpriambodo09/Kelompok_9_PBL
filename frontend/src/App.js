import React, { useState } from 'react';
import Header from './components/Header';
import MainWeather from './components/MainWeather';
import ForecastSection from './components/ForecastSection';
import AdditionalCards from './components/AdditionalCards';
import WeatherMap from './components/WeatherMap';
import WeatherStats from './components/WeatherStats';
// import WeatherAlert from './components/AlertSection';
import AlertSection from './components/AlertSection';
import WeatherAnimation from './components/WeatherAnimation';
import GroundAnimation from './components/GroundAnimation';
import './App.css';

function App() {
  const [idCity, setIdCity] = useState(1);  // default kota ID
  const [searchTerm, setSearchTerm] = useState('');

  // Fungsi untuk melakukan pencarian kota
  const handleSearch = async (query) => {
    if (!query) return;

    try {
      const res = await fetch(`http://localhost:8000/search_kota?query=${query}`);
      if (!res.ok) throw new Error('Gagal mencari kota');
      const data = await res.json();

      if (data.length > 0) {
        // Misal ambil kota pertama yg cocok
        setIdCity(data[0].id);  
        setSearchTerm(''); // reset input
      } else {
        alert('Kota tidak ditemukan');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat mencari kota');
    }
  };

  return (
    <div className="App">
      <div className="video-overlay"></div>

      <div className="container">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={() => handleSearch(searchTerm)}
        />
        <WeatherAnimation />
        <MainWeather idCity={idCity} />
        <ForecastSection idCity={idCity} />
        <AlertSection idCity={idCity} />
        <AdditionalCards />
        <WeatherMap />
        <WeatherStats />
        <GroundAnimation />
      </div>
    </div>
  );
}

export default App;
