import { useState, useEffect } from 'react';

const data = [
  { id: 1, country: 'United States' },
  { id: 2, country: 'Canada' },
  { id: 3, country: 'Mexico' },
  { id: 4, country: 'Brazil' },
  { id: 5, country: 'Argentina' },
  { id: 6, country: 'United Kingdom' },
  { id: 7, country: 'France' },
  { id: 8, country: 'Germany' },
  { id: 9, country: 'Italy' },
  { id: 10, country: 'Spain' },
  { id: 11, country: 'Russia' },
  { id: 12, country: 'China' },
  { id: 13, country: 'Japan' },
  { id: 14, country: 'South Korea' },
  { id: 15, country: 'India' },
  { id: 16, country: 'Australia' },
  { id: 17, country: 'South Africa' },
  { id: 18, country: 'Egypt' },
  { id: 19, country: 'Nigeria' },
  { id: 20, country: 'Kenya' },
];

function Soal2() {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  const handleReset = () => {
    setSelectedCountry('');
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target && !target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '100px',
      }}
    >
      <div className="dropdown-container">
        <p
          style={{
            fontSize: '18px',
            color: 'white',
            marginBottom: '8px',
          }}
        >
          value: {selectedCountry || ''}
        </p>

        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={selectedCountry}
            onClick={toggleDropdown}
            placeholder="Select"
            readOnly
            style={{
              backgroundColor: 'white',
              padding: '8px',
              borderRadius: '8px',
            }}
          />

          {selectedCountry && (
            <span
              onClick={handleReset}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                fontSize: '18px',
                color: '#888',
              }}
            >
              X
            </span>
          )}

          {isDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #ddd',
                marginTop: '5px',
                width: '100%',
                zIndex: 10,
                boxSizing: 'border-box',
              }}
            >
              {data.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectCountry(item.country)}
                  style={{
                    padding: '8px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  {item.country}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Soal2;
