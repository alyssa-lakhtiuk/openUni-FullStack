import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number : '040-1234567', id: 1}, 
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  // ])
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
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

  const filteredPersons = persons
    .filter((person) =>
      person.name.toLowerCase().includes(filterValue.toLowerCase())
    )
    

  const addNewNameNNumber = (event) => {
    event.preventDefault()
    const nameObject = {
      name : newName,
      number : newNumber,
      id: persons.length + 1
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
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} handleFiltration={handleFiltration}/>
      <h2>add a new</h2>
      <PersonForm addNewNameNNumber={addNewNameNNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons}/>
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

const Persons = ({filteredPersons}) => {
  return <div>{filteredPersons.map(person => <Person key={person.id} person={person}></Person>)}</div>
}
const Person = ({person}) => <div>{person.name} {person.number}</div>

export default App