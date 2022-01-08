import { useContext, useEffect, useState } from "react"
import { CountryContext } from "../../contexts/countryContext"

export const CountryPicker = () => {
  const { country, setCountry } = useContext(CountryContext)
  const [codes, setCodes] = useState([])

  const CODES_URL = 'https://restcountries.com/v3.1/all'

  useEffect(() => {
    const fetchCodes = async () => {
      const response = await fetch(CODES_URL)
      const data = await response.json()

      setCodes(data)
    }

    fetchCodes()
  }, [])

  let not_sorted_codes = {}

  codes.forEach(code => {
    let name = code.name.common
    let cca2 = code.cca2
    not_sorted_codes[name] = cca2
  })

  // console.log(not_sorted_codes)

  let sorted_codes = Object.keys(not_sorted_codes)
    .sort()
    .reduce((acc, key) => ({
        ...acc, [key]: not_sorted_codes[key]
    }), {})

  // console.log(sorted_codes)

  return (
    <div className="CountryPicker">
      <h2>Pick a Country</h2>

      <div className="select">
        <select name="format" id="format" value={country} onChange={(event) => {setCountry(event.target.value)}}>
          {Object.keys(sorted_codes).map((key, index) => {
            return <option key={index} value={sorted_codes[key]}>{key}</option>
          })}
          </select>
      </div>
    </div>
  )
};