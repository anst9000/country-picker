import { useState } from "react"
import { CountryContext } from "./countryContext"

export const CountryProvider = ({ children }) => {
  const [country, setCountry] = useState('SE')

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  )
}

