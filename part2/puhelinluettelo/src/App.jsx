import { useState, useEffect } from 'react'
import axios from 'axios'

const FilterForm = (props) => {
  return(
  <div>
    filter: 
    <input value={props.filterWord} onChange={props.handleFilterChange}/>
  </div>
  )
}


const PersonForm = (props) => {


  return(
    <form onSubmit={props.addNumber}>
        <div>name: <input value={props.newName} onChange={props.handleNameChange}/></div>
        <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
        
        
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
} 

const Persons = (props) => {
  return (
    <ul>
      {props.persons.map(
            person =>
            <li key={person.name}> {person.name} : {person.number} </li>
          )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const [filterWord, setFilterWord] = useState('')
  const handleFilterChange = (event) => {
    setFilterWord(event.target.value)
  } 

  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  } 
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const addNumber = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson =  {
        name: newName,
        number: newNumber
      }
      setPersons(
        persons.concat(newPerson)
      )
      setNewName("")
      setNewNumber("")
    } 
  }

    


  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filterWord={filterWord} handleFilterChange={handleFilterChange}/>
      <h2>Add New</h2>
      <PersonForm 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addNumber={addNumber}
      />
      <h2>Numbers</h2>

      <Persons persons={persons.filter(person => person.name.includes(filterWord))}/>


    </div>
  )

}

export default App