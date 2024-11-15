const Persons = ({ contactsToShow }) => {
  return (
    <div>
      {contactsToShow.map(person =>
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      )}
    </div>
  )
}

export default Persons