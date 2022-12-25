import { useContext } from 'react';
import { useQuery } from 'react-query';
import { CountryContext } from '../../contexts/countryContext';

const URL = 'https://restcountries.com/v3.1/alpha/';

const fetchCountry = async country => {
  const API_URL = `${URL}${country}`;
  const response = await fetch(`${API_URL}`);
  const data = await response.json();

  return data;
};

// Enkel funktion för att kunna visa stora tal lite snyggare
const numberWithSpaces = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const CountryDetails = () => {
  const { country } = useContext(CountryContext);

  // useQuery är smidigt att använda för att kunna visa
  // t.ex. en spinner och ev. fel vid fetch
  const { data, isLoading, error } = useQuery(['country', country], () =>
    fetchCountry(country),
  );

  if (isLoading) return <span>loading...</span>;
  if (error) return <span>oops!! error occured {error}</span>;

  // Datat som kommer från 'restcountries' varierar mycket så det krävs
  // lite handpåläggning för att plocka ut och snygga till datat.
  const { name, currencies, capital, languages, area, flags, population, car } =
    data[0];
  const officialName = name.official;
  let city = null;

  if (capital) {
    city = capital[0];
  }

  const pngFlag = flags.png;
  const allLanguages = Object.values(languages)
    .map(lang => lang)
    .join(', ');
  const carSign = car.signs[0];
  const wholeCarSign = Object.values(carSign)
    .map(sign => sign)
    .join('');

  return (
    <div className="CountryDetails">
      <h2>{officialName}</h2>
      <img src={pngFlag} alt="flag"></img>
      <div className="country-data">
        {currencies && (
          <div className="details">
            <p>
              <strong>Currency: </strong>
            </p>
            <p>
              {Object.values(currencies).map((curr, i) => (
                <span key={i}>{curr.name}</span>
              ))}
            </p>
          </div>
        )}
        {capital && (
          <div className="details">
            <p>
              <strong>Capital: </strong>
            </p>
            <p>
              <span>{city} </span>
            </p>
          </div>
        )}
        <div className="details">
          <p>
            <strong>Languages: </strong>
          </p>
          <p>
            <span>{allLanguages}</span>
          </p>
        </div>
        <div className="details">
          <p>
            <strong>Area: </strong>
          </p>
          <p>
            <span>{numberWithSpaces(area)} km&#178;</span>
          </p>
        </div>
        <div className="details">
          <p>
            <strong>Population: </strong>
          </p>
          <p>
            <span>{numberWithSpaces(population)}</span>
          </p>
        </div>
        <div className="details">
          <p>
            <strong>Car sign: </strong>
          </p>
          <p>
            <span>{wholeCarSign}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
