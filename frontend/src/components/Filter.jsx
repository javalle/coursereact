import React from 'react'

const Filter = ({filterStr,setNewFilter,setPersonsFilter,persons}) => {
    const handleFilter = (event) => {
        setNewFilter(event.target.value)
        const letters = event.target.value
        const pattron = new RegExp( letters, "i")
        const newListPhoneBook = persons.filter(({name})=> name.search(pattron)!==-1)
        setPersonsFilter(newListPhoneBook)
      }
    return(
    <div>
    filter show with <input value={filterStr}
    onChange={handleFilter}/>
  </div>
)}
export default Filter