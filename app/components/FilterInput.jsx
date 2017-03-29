import React from 'react'

const FilterInput = (props) => {

  const handleChange = props.handleChange
  const inputValue = props.inputValue

  return (
    <form className="form-group" style={{marginTop: '20px'}}>
      <input
        onChange={handleChange}
        value={inputValue}
        className="form-control"
        placeholder="Enter Friend's Name"
      />
    </form>
  )
}

export default FilterInput
