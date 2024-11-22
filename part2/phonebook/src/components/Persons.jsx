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
      .then(returnedContact => {
        console.log("Contact deleted:", returnedContact)
        setPersons(persons.filter(person => person.id !== returnedContact.id))
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