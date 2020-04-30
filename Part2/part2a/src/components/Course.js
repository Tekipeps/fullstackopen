import React from "react";

const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};
const Total = ({ parts }) => {
  const total = parts.map((part) => part.exercises);
  const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue;
  };
  return (
    <p>
      <strong>total of {total.reduce(reducer)} exercises</strong>
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
      <Total parts={parts} />
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
