import React, { useState, useEffect } from "react";
import personService from "./services/personService";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

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
      ? personService.remove(id).then((res) => {
          if (res.status === 200) {
            setPersons(persons.filter((person) => person.id !== id));
          }
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
              setPersons(persons.map(person => person.id !== res.id ? person : res))
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
        });
    }

    setNewName("");
    setNewNumber("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
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
