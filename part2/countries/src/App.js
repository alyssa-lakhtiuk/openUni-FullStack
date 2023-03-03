import React, { useState, useEffect } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'

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
  else if (countries.length === 1) {
    return  <div>{countries
      .map(country => 
      <Country key={country} country={country}></Country>)}
  </div>
  } else {
    return <CountryInfoNButton countries={countries}></CountryInfoNButton>
  }
}

const CountryInfoNButton = ({countries}) => {
  const [shown, setShown] = useState(null)
  const showCountryInfo = (country) => {
    if (country){
      if (country.name.common !== shown) setShown(country.name.common)
    } else {
      setShown(null)
    }
  }
  console.log("shown country name: ", shown)
  if (shown) {
    return (
    <div>{countries.map(country => 
      <div key={country.name.official}> 
        {country.name.common === shown ? 
            <div> <Country country={country}></Country> <button onClick={() => showCountryInfo(null)}>hide</button></div>: 
            <div><CountryName countryName={country.name.common}></CountryName> <button onClick={() => showCountryInfo(country)}>show</button></div>}
      </div>
      )}
    </div> )
  } else {
    return (<div>{countries
      .map(country => 
      <div key={country.name.official}> 
        <CountryName countryName={country.name.common}></CountryName> <button onClick={() => showCountryInfo(country)}>show</button>
      </div>
      )}
    </div>)
  }
}


const CountryName = ({countryName}) => {
  return <>
    {countryName}
  </>
}


const Country = ({country}) => {
  if (country){
    console.log("country to print: ", country)
    return (
      <div>
        <CountryName countryName={country.name.common}></CountryName>
        <p>capital: {country.capital}</p>
      <div>
        area: {country.area} km<sup>2</sup>
      </div>
      <ul>
        <Languages languages={country.languages}></Languages>
      </ul>
      <div>
        <img src = {country.flags.png} alt={''}></img>
      </div>
      <Weather country={country}></Weather>
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

const Weather = ({country}) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    weatherService
      .getWeather(country)
      .then(responseWeather => {
        setWeather(responseWeather)
      })
  }, [])

  if (weather) {
    console.log("weather:", weather)
    const weatherImg = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    return (
      <div>
          <h2>Weather in {country.capital} </h2>
          <p>temperature {(weather.main.temp - 273).toFixed(2)} Celcius</p>
          <p><img src = {weatherImg} alt = {''}></img></p>
          <p>wind {weather.wind.speed} m/s</p>
      </div>
    )
  }
  return <div>

  </div>
}

export default App;
