import axios from 'axios'
import { useEffect, useState } from 'react'
import personService from './services/persons'

const Filter = (props) => {
  return (
    <>
      filter:
      <input
        value={props.newCondition}
        onChange={props.handleConditionChange} />
    </>
  )
}

const Persons = (props) => {
  return (
    <>
      {props.namesToShow.map(person => (
        <Person key={person.name} person={person} deletePerson={props.deletePerson} />
      ))
      }
    </>
  )
}

const Person = (props) => {
  const handleDeletePerson = (event) => {
    event.preventDefault()
    if (window.confirm(`Delete ${props.person.name}`)) {
      props.deletePerson(props.person.id, props.person.name)
    }
  }
  return (
    <form>
      <p >{props.person.name} {props.person.number} <button onClick={handleDeletePerson}>delete</button></p>
    </form>
  )
}

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('name')

  const [newNumber, setNewNumber] = useState('number')

  const [newCondition, setNewCondition] = useState('')

  const [deleteMessage, setDeleteMessage] = useState('')

  const [addMessage, setAddMessage] = useState('')

  const [updateMessage, setUpdateMessage] = useState('')

  const [deleteType, setDeleteType] = useState('success')

  const [addType, setAddType] = useState('success')

  const [updateType, setUpdateType] = useState('success')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const deletePerson = (id, name) => {
    personService.deletePerson(id).then(response => {
      console.log("RESPONSE DATA.NAME")
      console.log(response.data)
      setDeleteType('success')
      setDeleteMessage(`Deleted ${name}`)
      setTimeout(() => {
        setDeleteMessage(null)
      }, 5000)
      const filteredPersons = persons.filter(person => person.id != id)
      setPersons(filteredPersons)
      setNewName('')
      setNewNumber('')
    })
      .catch(error => {
        setDeleteType('error')
        setDeleteMessage(`Failed to delete ${name}`)
        setTimeout(() => {
          setUpdateMessage(null)
        }, 5000)
      })
  }

  const namesToShow = newCondition.length === 0
    ? persons
    : persons.filter(person => person.name.toUpperCase().startsWith(newCondition.toUpperCase()))


  const addNameAndNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const duplicate = persons.find(person => person.name === newName)
    if (duplicate) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(duplicate.id, personObject).then(response => {
          setUpdateType('success')
          setUpdateMessage(`Updated ${response.data.name}`)
          setTimeout(() => {
            setUpdateMessage(null)
          }, 5000)
          setPersons(persons.map(person => person.id === response.data.id ? response.data : person))
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          setUpdateType('error')
          setUpdateMessage(`Information of ${duplicate.name} has already been removed from the server`)
          setTimeout(() => {
            setUpdateMessage(null)
          }, 5000)
        })
      }

    } else {
      //setPersons(persons.concat(personObject))

      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setAddMessage('success')
          setAddMessage(`Added ${response.data.name}`)
          setTimeout(() => {
            setAddMessage(null)
          }, 5000)
        }).catch(error => {
          setAddType('error')
          setAddMessage(`Failed to add ${personObject.name}`)
          setTimeout(() => {
            setAddMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleConditionChange = (event) => {
    setNewCondition(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {deleteMessage && <Notification message={deleteMessage} type={deleteType} ></Notification>}
      {addMessage && <Notification message={addMessage} type={addType}></Notification>}
      {updateMessage && <Notification message={updateMessage} type={updateType}></Notification>}
      <Filter newCondition={newCondition} handleConditionChange={handleConditionChange} />

      <h2>add new person and number</h2>
      <form onSubmit={addNameAndNumber}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange} />
        </div>

        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>


      <h2>Numbers</h2>
      <div>
        <Persons namesToShow={namesToShow} deletePerson={deletePerson} />
      </div>
    </div>
  )

}

export default App