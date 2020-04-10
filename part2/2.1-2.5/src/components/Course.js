import React from "react";

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  );
};
const Total = ({ parts }) => {
  const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue;
  };
  const total = parts.map((part) => part.exercises);

  return (
    <div>
      <b>total of {total.reduce(reducer)} exercises</b>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
