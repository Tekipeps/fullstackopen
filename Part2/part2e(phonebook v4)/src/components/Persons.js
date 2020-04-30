import React from "react";

const Persons = ({ filtered, handleDelete }) => {
  return (
    <div>
      {filtered.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
