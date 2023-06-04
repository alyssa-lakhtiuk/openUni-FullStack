import React from 'react';
import { useState, useEffect } from "react";
import personsService from './services/persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [maxId, setMaxId] = useState(0)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
            setNotificationMessage(
              `Updated ${newName} ${newNumber}`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `the information of '${newName}' was already deleted from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)})
            setPersons(persons.filter(p => p.id !== id))
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
    if (newName != '' && newNumber != ''){
      const added = persons.filter(p => {
        return p.name.includes(newName);
      });
      if (added != undefined && added.length != 0){
        console.log('added phonebook person: ', added)
        setNotificationMessage(
          `${newName} is added to phonebook`
        )
      }  
    }
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  // const showInfo = (event) => {
  //   event.preventDefault()
  //   const request = axios.get("http://localhost:3001/api/info")
  //   return request.then(response => response.data)
  // }

  const deletePerson = (id, name) => {
    personsService
      .deleteP(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    console.log(persons)
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      {/* <button onClick={() => showInfo()}>info</button> */}
      <Notification message={notificationMessage} />
      <ErrorMessage message={errorMessage} />
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



export default App