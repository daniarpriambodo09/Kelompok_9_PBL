// src/GroundAnimation.jsx
import React from 'react';
import Footer from './Footer';

function GroundAnimation() {
  const groundBackgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/tanah.png)`,
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'auto 200%', // Atau 'cover' jika Anda ingin gambar menutupi seluruh area tanpa memperdulikan proporsinya
    backgroundPosition: 'bottom', // Posisikan di bawah, center secara horizontal
    opacity: 1,
  };

  const containerAndBackgroundStyle = {
    position: 'relative',
    width: '100%', // Ini yang memastikan lebar 100%
    height: '400px', // Sesuaikan tinggi lapisan tanah ini
    overflow: 'hidden',
    // margin-top: 'auto', // Jika Anda ingin ini didorong ke bawah
    // Jika margin-top: 'auto' dihapus, pastikan kontainer induk (.App) memiliki display: flex dan flex-direction: column agar ground tetap di bawah

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',

    ...groundBackgroundStyle,
  };

  return (
    <div className="ground-animation-container" style={containerAndBackgroundStyle}>
      <Footer />
    </div>
  );
}

export default GroundAnimation;