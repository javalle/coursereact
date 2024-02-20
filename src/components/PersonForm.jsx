import React from 'react'

const PersonForm = ({submit,newPhoneBook,setNewPhoneBook}) =>{
    console.log(newPhoneBook)
    const handleNameChange = (event) => {
        const newDataPhoneBook = 
          {  name: event.target.value,
            number: newPhoneBook.number}
        
        setNewPhoneBook(newDataPhoneBook)
      }
      const handleNumberChange = (event) => {
        const newDataPhoneBook = {
            name: newPhoneBook.name,
            number: event.target.value
        }
        setNewPhoneBook(newDataPhoneBook)
      }
    return (
    <>
<form onSubmit={submit}>
    <div>
      name: <input value={newPhoneBook.name}
      onChange={handleNameChange} />
    </div>
    <div>
    <div>
      number: <input value={newPhoneBook.number}
      onChange={handleNumberChange} />
    </div>
      <button type="submit">add</button>
    </div>
  </form>
  </>)
  }
export default PersonForm