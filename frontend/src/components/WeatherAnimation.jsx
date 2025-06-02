import React from 'react';

function WeatherAnimation() {
  // Style umum untuk container animasi
  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '200px',
    overflow: 'hidden',
  };

  // Style dasar untuk tiap gambar awan
  const baseCloudStyle = {
    position: 'absolute',
    width: '120px',
    height: 'auto',
    opacity: 0.95,
    userSelect: 'none',
    pointerEvents: 'none',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
  };

  return (
    <div className="weather-animation" style={containerStyle}>
      <img
        src={`${process.env.PUBLIC_URL}/images/cloud1.png`}
        alt="Cloud 1"
        style={{
          ...baseCloudStyle,
          top: '20px',
          left: '10%',
          animationName: 'floatCloud',
          animationDuration: '10s',
          animationDelay: '0s',
        }}
        draggable={false}
      />
      <img
        src={`${process.env.PUBLIC_URL}/images/cloud1.png`}
        alt="Cloud 2"
        style={{
          ...baseCloudStyle,
          top: '70px',
          left: '40%',
          animationName: 'floatCloud',
          animationDuration: '10s',
          animationDelay: '1s',
        }}
        draggable={false}
      />
      <img
        src={`${process.env.PUBLIC_URL}/images/cloud1.png`}
        alt="Cloud 3"
        style={{
          ...baseCloudStyle,
          top: '110px',
          left: '70%',
          animationName: 'floatCloud',
          animationDuration: '10s',
          animationDelay: '2s',
        }}
        draggable={false}
      />
      <img
        src={`${process.env.PUBLIC_URL}/images/cloud1.png`}
        alt="Cloud 4"
        style={{
          ...baseCloudStyle,
          top: '90px',
          left: '20%',
          animationName: 'floatCloud',
          animationDuration: '7s',
          animationDelay: '3s',
        }}
        draggable={false}
      />
      <img
        src={`${process.env.PUBLIC_URL}/images/cloud1.png`}
        alt="Cloud 5"
        style={{
          ...baseCloudStyle,
          top: '5px',
          left: '60%',
          animationName: 'floatCloud',
          animationDuration: '7s',
          animationDelay: '0s',
        }}
        draggable={false}
      />
      {/* Keyframes animasi dibuat di dalam style tag */}
      <style>
        {`
          @keyframes floatCloud {
            0% { transform: translateX(0); }
            100% { transform: translateX(20vw); }
          }
        `}
      </style>
    </div>
  );
}

export default WeatherAnimation;
