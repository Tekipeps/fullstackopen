import React, { useState, useEffect } from "react";
import personService from "./services/personService";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  return <div className={type}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handFilterChange = (event) => {
    setNewFilter(event.target.value);
  };
  const handleDelete = (id, name) => {
    window.confirm(`delete ${name}?`)
      ? personService
          .remove(id)
          .then((res) => {
            if (res.status === 200) {
              setPersons(persons.filter((person) => person.id !== id));
            }
          })
          .catch((error) => {
            setNotificationType("error")
            setMessage(`${name} has already been removed from the server`)
            setPersons(persons.filter((person) => person.id !== id));
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
      : console.log();
  };
  const filtered = persons
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
    : [];

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const person = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (person) {
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
        ? personService
            .update(person.id, { name: newName, number: newNumber })
            .then((res) => {
              setPersons(
                persons.map((person) => (person.id !== res.id ? person : res))
              );
              setNotificationType("success")
              setMessage(`Changed ${res.name} to ${res.number}`);
              setTimeout(() => {
                setMessage(null);
              }, 3000);
            })
        : console.log();
    } else {
      personService
        .create({
          name: newName,
          number: newNumber,
        })
        .then((person) => {
          setPersons([...persons, person]);
          setNotificationType("success")
          setMessage(`Added ${person.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    }

    setNewName("");
    setNewNumber("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={notificationType} />
      <Filter newFilter={newFilter} handleFilterChange={handFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons filtered={filtered} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
