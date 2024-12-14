const PersonForm = ({
  addContact, 
  newName, 
  handleNameChange, 
  newNumber, 
  handleNumberChange,
  isSubmitting
}) => {
  return (
    <form onSubmit={addContact}>
      <div>
        name:
        <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit" disabled={isSubmitting}>add</button>
      </div>
    </form>
  )
}

export default PersonForm