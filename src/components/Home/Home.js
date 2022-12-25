import { memo } from 'react';
import { CountryDetails, CountryPicker } from '..';
import { CountryProvider } from '../../contexts/countryProvider';

// Använder useContext-hook för att slipp
// använda mig av prop drilling
export const Home = () => {
  return (
    <CountryProvider>
      <HomeContent />
    </CountryProvider>
  );
};

// Använder memo som är en s.k. HOC
// d.v.s. om komponenten renderar samma
// resultat för samma props, så kan man använda memo()
const HomeContent = memo(() => {
  return (
    <div className="Home">
      <CountryPicker />
      <CountryDetails />
    </div>
  );
});
