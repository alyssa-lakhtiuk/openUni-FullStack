import React from 'react';
import { useState, useEffect } from "react";
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [maxId, setMaxId] = useState(0)
  const [errorMessage, setErrorMessage] = useState('error message will be displayed here...')

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
      
      let index = persons.findIndex(person => person.name === newName);
      let id = persons[index].id;
      nameObject.id = id
      let checkIfChange = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (checkIfChange === true) {
        personsService
          .update(id, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          })
          setErrorMessage(
            `Updated ${newName} ${newNumber}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          
        }
        return
    }
    if(persons.some(item => item.number === newNumber) === true){
      console.log("error for number called")
      alert(`${newNumber} is already added to phonebook`)
      return
    }
    console.log(persons)
    
    personsService
    .create(nameObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      console.log(returnedPerson)
      setMaxId(newMaxId)
      setNewName('')
      setNewNumber('')
    })
    setErrorMessage(
      `${newName} is added to phonebook`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
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
          setErrorMessage(
            `the information of '${name}' was already deleted from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
    console.log(persons)
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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

const Notification = ({ message }) => {
  const errorStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message === null) {
    return null
  }

  return (
    <div style={errorStyle}>
      {message}
    </div>
  )
}

export default App