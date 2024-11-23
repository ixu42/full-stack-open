import { useState, useEffect } from 'react'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const city = country.capital?.[0] || "non-existent"
  if (city === "non-existent") {
    const countryName = country.name?.common || "non-existent"
    return <p>{countryName}: Country info incomplete: capital city missing</p>
  }
  const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`

  useEffect(() => {
    console.log("Fetching weather data for", city)
    setLoading(true)
    setError(null)

    fetch(weatherUrl)
      .then((response) => {
        if (!response.ok) {
        throw new Error(`Weather data fetch failed for ${city}: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        console.log("Weather data:", data)
        setWeather(data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
  }, [city])

  if (loading) return <p>Loading weather data...</p>
  if (error) return <p>{error}</p>

  if (weather === null || weather.weather === null 
      || weather.weather[0] === null || weather.weather[0].icon === null 
      || weather.main === null || weather.main.temp === null 
      || weather.wind === null || weather.wind.speed === null) {
    return <p>Data fetched incomplete</p>
  }
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {city}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Flag" width="150" />
      <h2>Weather in {city}</h2>
      <div>temperature {weather.main.temp} Celsius</div>
      <img src={weatherIconUrl} alt="Weather icon" image="80"/>
      <div>wind {weather.wind.speed} m/s</div>
      </div>
  )
}

export default Country