import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterTerm, setFilterTerm] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialContacts => {
        console.log('promise fulfilled')
        setPersons(initialContacts)
      })
  }, [])

  const confirmUpdate = (name) => {
    return window.confirm(
      `${name} is already added to the phonebook, ` +
      `replace the old number with a new one?`
    );
  }

  const addContact = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    if (newName.trim() === '' || newNumber.trim() === '') {
      alert('Please enter a name and number')
      return
    }
    if (!/^\d+(-\d+)*$/.test(newNumber)) {
      alert("Please enter a valid number, e.g. 040-123456 or 123-456");
      return;
    }
    if (persons.map(person => person.name).includes(newName)) {
      if (!confirmUpdate(newName))
        return
      const id = persons.find(person => person.name === newName).id
      personService
        .update(id, { name: newName, number: newNumber })
        .then(returnedContact => {
          console.log("Contact updated:", returnedContact);
          setPersons(persons.map(person => person.name === newName ? returnedContact : person))
          setNewName('')
          setNewNumber('')
        })
        .catch(() => {
          alert(`The contact '${newName}' was already deleted from the server`)
          setPersons(persons.filter(person => person.name !== newName))
        })
      return
    }
    if (persons.map(person => person.number).includes(newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }
    const newContact = { name: newName, number: newNumber }
    personService
      .create(newContact)
      .then(returnedContact => {
        console.log("Contact added:", returnedContact);
        setPersons(persons.concat(returnedContact))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = (event) => {
    console.log("name: ", event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log("number: ", event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log("filter: ", event.target.value)
    setFilterTerm(event.target.value)
  }

  const contactsToShow = filterTerm === ''
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(filterTerm.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterTerm={filterTerm} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addContact={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons {...{ contactsToShow, personService, persons, setPersons }} />
    </div>
  )
}

export default App