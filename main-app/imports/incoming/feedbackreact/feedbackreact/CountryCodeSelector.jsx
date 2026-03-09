import React from 'react';

const CountryCodeSelector = ({ value, onChange }) => {
  const countryCodes = [
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+86', country: 'China' },
    { code: '+81', country: 'Japan' },
    { code: '+33', country: 'France' },
    { code: '+49', country: 'Germany' },
    { code: '+39', country: 'Italy' },
    { code: '+34', country: 'Spain' },
    { code: '+61', country: 'Australia' },
    { code: '+64', country: 'New Zealand' },
    { code: '+27', country: 'South Africa' },
  ];

  return (
    <select
      className="country-code-selector"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {countryCodes.map((item) => (
        <option key={item.code} value={item.code}>
          {item.country} {item.code}
        </option>
      ))}
    </select>
  );
};

export default CountryCodeSelector;