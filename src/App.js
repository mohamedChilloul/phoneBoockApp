import React, { useState } from 'react'
import DisplayPhoneBoock from './components/DisplayPhoneBoock'
import AddPersForm from './components/AddPersForm'
import Search from './components/Search'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [number, setPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event)=>{
    setNewName(event.target.value)
  }
  const handleNumberChange = (event)=>{
    setPhoneNumber(event.target.value)
  }
  const handleFilterChange = (event)=>{
    setFilter(event.target.value)
  }
  const addNewContact = (event)=>{
    event.preventDefault()
    const perObj={
      name : newName,
      number: number
    }
    let exist = persons.findIndex(o => o.number == perObj.number)
    console.log(exist)
    exist === -1 ? setPersons(persons.concat(perObj)) : window.alert(`${number} is already added to phonebook`)
    setNewName('')
    setPhoneNumber('')
  }
  const filteredList = persons.filter(p => p.name.toLocaleLowerCase().match(filter.toLocaleLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Search text={'saerch for : '} searchValue={filter} onChange={handleFilterChange}></Search>
      <h2>Add A New Contact</h2>
      <AddPersForm addNewContact={addNewContact} newName={newName} handleNameChange={handleNameChange} phoneNumber={number} handleNumberChange={handleNumberChange}></AddPersForm>
      <h2>Numbers</h2>
      <DisplayPhoneBoock filteredList={filteredList}></DisplayPhoneBoock>
    </div>
  )
}

export default App