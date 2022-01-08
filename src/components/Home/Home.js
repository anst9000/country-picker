import { memo } from "react";
import { CountryDetails, CountryPicker } from "..";
import { CountryProvider } from "../../contexts/countryProvider";

export const Home = () => {
  return (
    <CountryProvider>
      <HomeContent />
    </CountryProvider>
  )
};

const HomeContent = memo(() => {
  return (
    <div className="Home">
      <CountryPicker />
      <CountryDetails />
    </div>
  )
})
