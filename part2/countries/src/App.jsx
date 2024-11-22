import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Country from './components/Country'

function App() {
  const [countries, setCountries] = useState([])
  const [filterTerm, setFilterTerm] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => response.json())
      .then(data => {
        console.log("Countries data:", data)
        setCountries(data)
      })
  }, [])

  useEffect(() => {
    if (filterTerm.trim() === '') {
      setFilteredCountries(countries)
    } else {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(filterTerm.toLowerCase())
      )
      setFilteredCountries(filtered)
    }
  }, [filterTerm])

  const handleFilterChange = (event) => {
    console.log("filter: ", event.target.value)
    setFilterTerm(event.target.value)
  }

  return (
    <div>
      <Filter filterTerm={filterTerm} handleFilterChange={handleFilterChange} />
        {filterTerm.trim() === '' ? (
          <p>Enter a country name to search</p>
        ) : filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length === 0 ? (
          <p>No matches found</p>
        ) : filteredCountries.length === 1 ? (
          <Country country={filteredCountries[0]} />
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredCountries.map((country) => (
              <li key={country.name.common}>{country.name.common}</li>
            ))}
          </ul>
        )}
    </div>
  )
}

export default App
