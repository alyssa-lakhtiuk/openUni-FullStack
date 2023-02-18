import {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addNewName = (event) => {
    event.preventDefault()
    const nameObject = {
      name : newName
    }
    if(persons.some(item => item.name === newName) === true){
      console.log("alert must be called")
      alert(`${newName} is already added to phonebook`)
      return
    }
    console.log(persons)
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name : <input value = {newName} onChange = {handleNameChange}/>
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

const Person = ({person}) => <div>{person.name}</div>

export default App