import { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from './components/FilterForm.jsx'
import PersonForm from './components/PersonForm.jsx'
import Person from './components/Person.jsx'
import personService from './service.js'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    personService.getAll()
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
    
    const newPerson =  {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).includes(newName) 
        && window.confirm("Do you want to replace the number?")
    ){
      const p = persons.find(person => newName == person.name)
      const id = p.id
      console.log(p, p.id)
      const changedPerson = { ...p, number: newNumber }
      
      personService.update(id,changedPerson).then(
        returnedPerson => {
          setPersons(persons.map(person =>
            person.id !== id ? person : changedPerson))
        }).catch(error => {
        alert(
          `the person '${p}' was already deleted from server`
        )
      })
      setPersons(persons.filter(n => n.id !== id))
      setNewName("")
      setNewNumber("")
    }
    else {
      personService.create(newPerson)
        .then(response => {
          console.log("posted")
          setPersons(persons.concat(response.data))
          setNewName("")
          setNewNumber("")
      })
    } 
  }

  const deleteNumber = (id) => {
    if (window.confirm("Do you really want to remove this nmuber?")) {
      personService.remove(id).then(
        setPersons(
          persons.filter(person => id != person.id)
        )
        
      
      )
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
      {persons
        .filter(person => person.name.includes(filterWord))
        .map(person =>
          <Person 
            key={person.id} 
            name={person.name} 
            number={person.number}
            deleteThis={() => deleteNumber(person.id)}
          />
      )}
      


    </div>
  )

}

export default App