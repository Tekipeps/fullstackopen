import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = ({ anecdotes }) => {
  const presentAnecdote = () => Math.floor(Math.random() * anecdotes.length);
  const [selected, setSelected] = useState(presentAnecdote);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0]);
  const buttonHandler = () => {
    setSelected(presentAnecdote);
  };

  const vote = () => {
    const nvotes = [...votes];
    nvotes[selected] += 1;
    setVotes(nvotes);
  };
  const highestVote = Math.max(...votes);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={buttonHandler}>next anecdote</button>
      <h1>Anecdotes with the most votes</h1>
      <p>{anecdotes[votes.indexOf(highestVote)]}</p>
      <p>has {highestVote} votes</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));