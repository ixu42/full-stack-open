const Filter = ({ filterTerm, handleFilterChange }) => {
  return (
    <div>
      <label style={{ marginRight: "5px" }}>Find countries</label>
      <input
        value={filterTerm}
        onChange={handleFilterChange}
      />
    </div>
  )
}

export default Filter