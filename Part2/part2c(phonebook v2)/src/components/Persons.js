import React from "react";

const Persons = ({ filtered }) => {
  return (
    <div>
      {filtered.map((person, i) => (
        <p key={i}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
