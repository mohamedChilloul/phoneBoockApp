import React, { useEffect, useState } from 'react'
import DisplayPhoneBoock from './components/DisplayPhoneBoock'
import AddPersForm from './components/AddPersForm'
import Search from './components/Search'
import personsService from './services/persons'
import Notification from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [NoteMessage, setMessage] = useState(null)
  const [success, setSuccess] = useState(null)

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
        setSuccess(true)
        setMessage(`${deletPers.name} has been deleted from the phone boock`)
        setTimeout(()=>{
          setMessage(null)
        },5000)
        
      }).catch(err=>{
        setSuccess(false)
        setMessage(`${deletPers.name} can't be deleted, because it has been deleted before !`)
        setTimeout(()=>{
          setMessage(null)
        },4000)
        setPersons(persons.filter(p=>p.id !== deletPers.id))
      })

    }
  }

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
    if(exist === -1){
      personsService.createPerson(perObj).then(retPerson=>{
        setPersons(persons.concat(retPerson))
        setMessage(`${perObj.name} has been added successfully to the phoneBoock`)
        setSuccess(true)
        setTimeout(()=>{
          setMessage(null)
        },4000)
      })
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
          setMessage(`${perObj.name} has been modified successfully to the phoneBoock`)
          setSuccess(true)
          setTimeout(()=>{
            setMessage(null)
          },4000)
        }).catch(err=>{
          setSuccess(false)
          setMessage(`${perObj.name} can't be modified, because it was deleted !`)
          setTimeout(()=>{
            setMessage(null)
          },4000)
          setPersons(persons.filter(p => p.id !== id)) 
        }
        )
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
      <Notification message={NoteMessage} success={success}></Notification>
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