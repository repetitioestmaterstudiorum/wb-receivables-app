import React, { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={increment}>
        Click Me
      </button>
      <br />
      <br />
      <p>You've pressed the button {counter} times.</p>
    </div>
  );
};

export default Counter;
