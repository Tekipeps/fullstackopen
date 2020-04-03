import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ handler, text }) => {
  return <button onClick={handler}>{text}</button>;
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={all} />
            <Statistic text="average" value={average} />
            <Statistic text="positive" value={positive.toString() + "%"} />
          </tbody>
        </table>
      </div>
    );
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const All = () => {
    return good + neutral + bad;
  };
  const Average = () => {
    return (good - bad) / All();
  };
  const Positive = () => {
    return (good / All()) * 100;
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={() => setGood(good + 1)} text="good" />
      <Button handler={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handler={() => setBad(bad + 1)} text="bad" />
      <Statistics
        average={Average()}
        positive={Positive()}
        all={All()}
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
