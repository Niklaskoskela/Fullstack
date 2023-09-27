import "./index.css"

import { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from './components/FilterForm.jsx'
import Countries from './components/Countries.jsx'
import personService from './service.js'
import StatusMessage from './components/StatusMessage.jsx'

const App = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect')
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then(
      response => {
        setCountries(response.data)
      }
    ).catch(
      console.log("fail")
    )
  },[])


  const [filterWord, setFilterWord] = useState('')
  const [statusMessage, setStatusMessage] = useState(null)
  const [statusStyle, setStatusStyle] = useState('success')


  const handleFilterChange = (event) => {
    setFilterWord(event.target.value)
  } 

    


  return (
    <div>
      <h2>COUNTRIES</h2>
      <StatusMessage message={statusMessage} className={statusStyle} />
      
      <p>Search:</p>
      <FilterForm filterWord={filterWord} handleFilterChange={handleFilterChange}/>
    
      <p>–––</p>
      <Countries 
      countries={  countries.filter(country => country.name.common.includes(filterWord))}
      setFilterWord={(filterWord) => setFilterWord(filterWord)}
        />
      


    </div>
  )

}

export default App