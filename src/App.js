import React, { useEffect, useState } from 'react'
import DisplayPhoneBoock from './components/DisplayPhoneBoock'
import AddPersForm from './components/AddPersForm'
import Search from './components/Search'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    personsService.getPersons().then(
      initialPersons =>setPersons(initialPersons)
    )
  }, [])

  const handleDelete = (id)=>{
    const deletPers = persons.find(p =>p.id === id)
    const confirm = window.confirm(`do you want to delete ${deletPers.name}`)
    if (confirm){
      personsService.deletePerson(id).then(r=>{
        setPersons(persons.filter(p=>p.id !== id))
      })
    }
  }

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
    //exist === -1 ?  : window.alert(`${number} is already added to phonebook`)
    if(exist === -1){
      personsService.createPerson(perObj).then(retPerson=>setPersons(persons.concat(retPerson)))
    }else{
      const existedPers = persons[exist]
      const id = existedPers.id 
      console.log(id)
      const conf = window.confirm(`this number is attributed for ${existedPers.name} do you wa to update this person name?`)
      if(conf){
        personsService.updatePerson(id, perObj).then(r=>{
          setPersons(persons.map(p => p.id !== id ? p : r))
        })
      }
    }
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
      {
        filteredList.length>0 ?<DisplayPhoneBoock filteredList={filteredList} handleDelete={handleDelete}></DisplayPhoneBoock>
                         :<p>No persons Yet !</p> 
      }
    </div>
  )
}

export default App