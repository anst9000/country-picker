import { useContext } from "react"
import { useQuery } from "react-query"
import { CountryContext } from "../../contexts/countryContext"

const URL = 'https://restcountries.com/v3.1/alpha/'

const fetchCountry = async (country) => {
  const API_URL = `${URL}${country}`
  const response = await fetch(`${API_URL}`)
  const data = await response.json()

  return data
}

const numberWithSpaces = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const CountryDetails = () => {
  const { country } = useContext(CountryContext)

  const { data, isLoading, error } = useQuery(["country", country], () => fetchCountry(country));

  if (isLoading) return <span>loading...</span>
  if (error) return <span>oops!! error occured</span>

  const { name, currencies, capital, languages, area, flags, population, car } = data[0]
  const officialName = name.official
  let city = null

  if (capital) {
    city = capital[0]
  }

  const pngFlag = flags.png
  const carSign = car.signs[0]

  return (
    <div className="CountryDetails">

      <h2>{officialName}</h2>
      <img src={pngFlag} alt="flag"></img>
      {
        currencies && <p><strong>Currency: </strong>
        {Object.values(currencies).map((curr, i) => <span key={i}>{curr.name}</span>)}</p>
      }
      {capital && <p><strong>Capital: </strong><span>{city} </span></p>}
      <p><strong>Languages: </strong>
      {Object.values(languages).map((lang, i) => <span key={i}>{lang} </span>)}</p>
      <p><strong>Area: </strong>{numberWithSpaces(area)} km&#178;</p>
      <p><strong>Population: </strong>{numberWithSpaces(population)}</p>
      <p><strong>Car sign: </strong>
      {Object.values(carSign).map((sign, i) => <span key={i}>{sign}</span>)}</p>

    </div>
  )
};