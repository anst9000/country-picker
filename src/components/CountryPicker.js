import { useContext, useEffect, useState } from 'react';
import { CountryContext } from '../App';

export const CountryPicker = () => {
  const { country, setCountry } = useContext(CountryContext);
  const [codes, setCodes] = useState([]);

  const CODES_URL = 'https://restcountries.com/v3.1/all';

  useEffect(() => {
    const fetchCodes = async () => {
      const response = await fetch(CODES_URL);
      const data = await response.json();

      setCodes(data);
    };

    fetchCodes();
  }, []);

  let not_sorted_codes = {};

  codes.forEach(code => {
    let name = code.name.common;
    let cca2 = code.cca2;
    not_sorted_codes[name] = cca2;
  });

  // reduce-funktionen i js är en av de knepigaste att
  // begripa, men i princip går det att sortera attribut
  // i objekt med hjälp av den.
  let sorted_codes = Object.keys(not_sorted_codes)
    .sort()
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: not_sorted_codes[key],
      }),
      {},
    );

  return (
    <div className="CountryPicker">
      <h2>Pick a Country</h2>

      <div className="select">
        {/* I CSS har jag stylat en custom-pil för att
        få en lite snyggare select-ruta än default.
        Med hjälp av select::after går det snygga till lite grann. */}
        <select
          name="format"
          id="format"
          value={country}
          onChange={event => {
            setCountry(event.target.value);
          }}
        >
          {/* Visa alla 'options' i vår land-väljare genom att använda map() */}
          {Object.keys(sorted_codes).map((key, index) => (
            <option key={index} value={sorted_codes[key]}>
              {key}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
