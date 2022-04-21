import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  console.log("process.env.REACT_APP_API_URL 1", process.env.REACT_APP_API_URL);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          {process.env.REACT_APP_API_URL}
        </p>
        <a
          className="App-link"
          href={process.env.REACT_APP_API_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
