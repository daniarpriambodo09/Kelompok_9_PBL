import React from 'react';

function Header({ searchTerm, setSearchTerm, onSearch }) {
  const handleInputChange = (e) => setSearchTerm(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <header>
      <div className="logo">
        <h1>Langit.In</h1>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Cari lokasi..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={onSearch}>
        </button>
      </div>
    </header>
  );
}

export default Header;
