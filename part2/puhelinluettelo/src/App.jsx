import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  } 

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  } 

  const handleFilterChange = (event) => {
    setFilterWord(event.target.value)
  } 

  const addNumber = (event) => {
    event.preventDefault()
    console.log(persons)
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
      <div>filter: <input value={filterWord} onChange={handleFilterChange}/></div>
      <h2>Add New</h2>
      <form onSubmit={addNumber}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      <ul>
        {
          persons.filter(person => person.name.includes(filterWord)).map(
            person =>
            <li key={person.name}> {person.name} : {person.number} </li>
          )
        }
      </ul>

    </div>
  )

}

export default App