import {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', 
      number : '040-1234567'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addNewNameNNumber = (event) => {
    event.preventDefault()
    const nameObject = {
      name : newName,
      number : newNumber
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
      <form onSubmit={addNewNameNNumber}>
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
      <h2>Numbers</h2>
      <div>{persons.map(person => <Person key={person.name} person={person}></Person>)}</div>
    </div>
  )
} 

const Person = ({person}) => <div>{person.name} {person.number}</div>

export default App