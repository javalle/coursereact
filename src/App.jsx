import React, { useState,useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneServices from './services/phones'

import axios from 'axios';
const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newPhoneBook, setNewPhoneBook ] = useState([{name:'',number:''}])
  const [ filter, setNewFilter] = useState('')
  const [personFilters, setPersonsFilter] = useState(persons)

 useEffect(() => { 
    phoneServices
    .getAll()
    .then(initialPhones => {
        setPersons(initialPhones)
        setPersonsFilter(initialPhones)
    })
    },[])

//   const setNewPhoneBookAux = (newPhoneBookAux) => {
//     console.log(newPhoneBookAux)
//     console.log("aqui")
//     setNewPhoneBook(newPhoneBookAux)
//   }

  const addPerson = (event) => {
    event.preventDefault()
    
    
    const result = persons.find(
        ({name})=>
        name===newPhoneBook.name)
    console.log(result)
    if(result === undefined){
        const newPerson = {
            name: newPhoneBook.name,
            number: newPhoneBook.number
        }
        phoneServices
        .create(newPerson)
        .then(returnPerson => {
        
            console.log(returnPerson)
            phoneServices
            .getAll()
            .then(initialPhones => {
                setPersons(initialPhones)
                setPersonsFilter(initialPhones)
            })
            
            const newPersonClean = {
                name: '',
                number: ''
            }
            setNewPhoneBook(newPersonClean)
        })
        
    }else{
        alert(`${newPhoneBook.name} is already added to phonebook` )
    }
  }
//   useEffect(()=>{
//     console.log('effect')
//     axios
//         .get('http://localhost:3001/persons')
//         .then(response=>{
//             console.log('promise ok')
//             console.log(response.data)
//             setPersons(response.data)
//             setPersonsFilter(response.data)
//         })
//   },[])
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterStr={filter} setNewFilter={setNewFilter} setPersonsFilter={setPersonsFilter} persons={persons}/>
      <h2>add a new</h2>
      <PersonForm submit={addPerson} newPhoneBook={newPhoneBook} setNewPhoneBook={setNewPhoneBook} />
      <h2>Numbers</h2>
      <Persons personFilters={personFilters} />
      <div>debug: {newPhoneBook.name}</div>
    </div>
  )
}

export default App