import React from 'react';
const Persons = ({filteredPersons, deletePerson}) => {
    return <div>{filteredPersons
        .map(person => 
        <Person key={person.id} person={person} deletePerson={deletePerson}></Person>)}
        </div>
  }

const Person = ({person, deletePerson}) => <div>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></div>


export default Persons
  