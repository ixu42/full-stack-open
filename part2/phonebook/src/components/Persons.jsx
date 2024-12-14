const Persons = ({ 
  contactsToShow,
  personService,
  persons,
  setPersons,
}) => {
  const deleteContact = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name} ?`)
    if (!confirmDelete) {
      return
    }
    personService
      .remove(id)
      .then(() => {
        console.log(`${name} deleted successfully`)
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.error("Error deleting contact:", error)
      })
  }

  return (
    <div>
      {contactsToShow.map(person =>
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deleteContact(person.id, person.name)}>delete</button>
        </div>
      )}
    </div>
  )
}

export default Persons