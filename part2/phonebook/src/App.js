import React from 'react';
import { useState, useEffect } from "react";
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [maxId, setMaxId] = useState(0)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setMaxId(initialPersons.length)})
  }, []);

  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFiltration = (event) => {
    setFilterValue(event.target.value)
  }

  console.log(persons)
  const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filterValue.toLowerCase())
    )
    

  const addNewNameNNumber = (event) => {
    event.preventDefault()
    const newMaxId = maxId + 1
    console.log('max id ', newMaxId)
    console.log('persons array ', persons)
    const nameObject = {
      name : newName,
      number : newNumber,
      id: newMaxId
    }
    if(persons.some(item => item.name === newName) === true){
      console.log("alert for name called")
      alert(`${newName} is already added to phonebook`)
      return
    }
    if(persons.some(item => item.number === newNumber) === true){
      console.log("alert for number called")
      alert(`${newNumber} is already added to phonebook`)
      return
    }
    console.log(persons)
    
    personsService
    .create(nameObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setMaxId(newMaxId)
      setNewName('')
      setNewNumber('')
    })
  }

  const deletePerson = (id, name) => {
    let confirmation = window.confirm(`Delete ${name}?`);
    if (confirmation) {
      personsService
        .deleteP(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(
            `the information of '${name}' was already deleted from server`
          )
          setTimeout(() => {
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
    console.log(persons)
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} 
              handleFiltration={handleFiltration}/>
      <h2>add a new</h2>
      <PersonForm addNewNameNNumber={addNewNameNNumber} 
                  newName={newName} 
                  handleNameChange={handleNameChange} 
                  newNumber={newNumber} 
                  handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} 
               deletePerson={deletePerson}/>
    </div>
  )
} 

const Filter = ({filterValue, handleFiltration}) => {
  return <div>
          filter shown with : <input value = {filterValue} onChange = {handleFiltration}/>
      </div>
}

const PersonForm = ({addNewNameNNumber, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return <form onSubmit={addNewNameNNumber}>
        <div>
          name : <input value = {newName} onChange = {handleNameChange}/>
        </div>
        <div>
          number : <input value = {newNumber} onChange = {handleNumberChange}/>
        </div>
        <div>
          <button type = "submit">add</button>
        </div>
      </form>
}

const Persons = ({filteredPersons, deletePerson}) => {
  return <div>{filteredPersons.map(person => <Person key={person.id} person={person} deletePerson={deletePerson}></Person>)}</div>
}
const Person = ({person, deletePerson}) => <div>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></div>

export default App