import { useState, useEffect } from 'react'
import axios from 'axios'


const Country = (props) => {
  const co = props.country
  const langs = co.languages
  const langArray = []

  for (var key in langs) {
    langArray.push(langs[key])
  }

  return(
    <div>
      <h2>{co.name.common}</h2>
      <p>{co.capital}</p>
      <p>{co.area}</p>
      <p>Languages</p>
      <ul>
        {
          langArray.map(lang => <li key={lang}>{lang}</li>)
        }
      </ul>
      <img src={co.flags.png}></img>

    </div>
  )
}

const CapitalWeather = (props) => {
  const api_key = import.meta.env.VITE_SOME_KEY
  const [weather, setWeather] = useState(null)
  useEffect( () =>{
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${props.capital}&appid=${api_key}&units=metric`)
    .then(response =>{
      setWeather(response.data)
      console.log(response.data)
      }
    )}
  )
  if (weather === null) {
    return null
  }

  const weatherIcon = weather.weather[0].icon

  return(
    <div>
      <h3>WEATHER</h3>
      <h4> {props.capital}</h4>
      <p>temp: {weather.main.temp} degrees</p>
      <p>wind: {weather.wind.speed} m/s </p>
      <p> <img src={"https://openweathermap.org/img/wn/"+weatherIcon+"@2x.png"}></img> </p>

    </div>
  )


}

const Countries = (props) => {

    const len = props.countries.length
    console.log(props.countries)
    console.log(len)

    const revealCountry = (country) => {
      props.setFilterWord(country.name.common)
    }

    if (len === 1 ){
      return (
        <div>
        COUNTRY:
        {props.countries.map(country => 
         <div> 
          <Country country={country}/> 
          <CapitalWeather capital={country.capital}/> 
         </div>
        )}
      </div>
      
      )
    }
    else if (len <= 10){
      return (
        <ul>
        <p>{props.countries.length}</p>
        {props.countries.map(country => 
          <li key={country.name.common}> {country.name.common} <button onClick={() => revealCountry(country)}> SHOW </button></li>
          )}

      </ul>
      )
      
    }
    else {
      return(
      <div>
        too many countries available
      </div>)
    }

    
    
  }

  export default Countries