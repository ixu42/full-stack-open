import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterTerm, setFilterTerm] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialContacts => {
        console.log('promise fulfilled')
        setPersons(initialContacts)
      })
  }, [])

  // helper functions for input validation
  const isFieldEmpty = (field) => field.trim() === ''
  const isValidNumber = (number) => /^\d+(-\d+)*$/.test(number)
  const isNameTaken = (name) => persons.map(person => person.name).includes(name)
  const isNumberTaken = (number) => persons.map(person => person.number).includes(number)

  const confirmUpdate = (name) => {
    return window.confirm(
      `${name} is already added to the phonebook, ` +
      `replace the old number with a new one?`
    );
  }

  const addContact = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    if (isFieldEmpty(newName) || isFieldEmpty(newNumber)) {
      alert('Please enter a name and number')
      return
    }

    if (!isValidNumber(newNumber)) {
      alert("Please enter a valid number, e.g. 040-123456 or 123-456");
      return
    }

    // handle duplicate name
    if (isNameTaken(newName)) {
      if (persons.find(person => person.name === newName).number === newNumber) {
        alert(`${newName} is already added to phonebook with the same number`)
        return
      }
      if (!confirmUpdate(newName)) return

      const id = persons.find(person => person.name === newName).id
      personService
        .update(id, { name: newName, number: newNumber })
        .then(returnedContact => {
          console.log("Contact updated:", returnedContact);
          setPersons(persons.map(person => person.name === newName ? returnedContact : person))
          setNewName('')
          setNewNumber('')
          setNotification({ message: `Updated ${newName}`, type: 'success' })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(() => {
          alert(`The contact '${newName}' was already deleted from the server`)
          setPersons(persons.filter(person => person.name !== newName))
        })
      return
    }

    // handle duplicate number
    if (isNumberTaken(newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }

    // add new contact
    const newContact = { name: newName, number: newNumber }
    personService
      .create(newContact)
      .then(returnedContact => {
        console.log("Contact added:", returnedContact);
        setPersons(persons.concat(returnedContact))
        setNewName('')
        setNewNumber('')
        setNotification({ message: `Added ${newName}`, type: 'success' })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
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
      <Notification notification={notification} />
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