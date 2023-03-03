import React, { useState, useEffect } from 'react'
import countriesService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState('')

  useEffect(() => {
    countriesService
      .getAll('')
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleCountryChange = (event) => {
    setFiltered(event.target.value)
  }

  const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filtered.toLowerCase())
    )


  // console.log(filteredCountries)
  // if (filteredCountries){
  //   console.log(filteredCountries[0].capital)
  // }
    
  return (
  <div><form>
      <div>
        find countries : <input value = {filtered} onChange = {handleCountryChange}/>
      </div>
    </form>
    <Countries countries = {filteredCountries}></Countries>
  </div>)
}

const Countries = ({countries}) => {
  if (countries.length >= 10) {
    return <div> Too many matches, specify another filter</div>
  }
  else if (countries.length == 1) {
    return  <div>{countries
      .map(country => 
      <Country key={country} country={country}></Country>)}
  </div>
  } else {
    return  <div>{countries
      .map(country => <CountryName key={country.name.official} countryName={country.name.common}></CountryName>
      )}
    </div>
  }
}

const CountryName = ({countryName}) => {
  return <div>
    {countryName}
  </div>
}


const Country = ({country}) => {
  if (country){
    console.log("country to print: ", country)
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital: {country.capital}</p>
      <div>
        area: {country.area} km<sup>2</sup>
      </div>
      <ul>
        <Languages languages={country.languages}></Languages>
      </ul>
      <div>
        <img src = {country.flags.png}></img>
      </div>
      </div>
    )
  }
  return null 
}

const Languages = ({languages}) => {
  const countryLanguages = []
    for (const key in languages) {
      countryLanguages.push(languages[key])
    }
    return (
      <div>
      <h3>languages:</h3>
      <p>
        {countryLanguages.map(language => <li key = {language}>{language}</li>)}
      </p>
      </div>     
    )
}


export default App;
