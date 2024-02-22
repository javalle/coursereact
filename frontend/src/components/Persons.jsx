import React from 'react'
const Persons = ({personFilters}) => {
    return  (   
        <>
        <ul>
        {personFilters.map((person) =>
            <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
      </>)
}
export default Persons