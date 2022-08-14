import { useState } from "react";

import useWasm from "./wasm/use-wasm";

import "./App.css";

function App() {
  const wasm = useWasm("add");
  const [sum, setSum] = useState("?");
  const [numberOne, setNumberOne] = useState(0);
  const [numberTwo, setNumberTwo] = useState(0);

  const setNumber = (e, num) => {
    if (num === "one") {
      setNumberOne(e.target.value);
    } else {
      setNumberTwo(e.target.value);
    }
  };

  const doAddition = () => {
    setSum(wasm?.add(numberOne, numberTwo));
  };

  console.log(numberOne, numberTwo, sum);

  return (
    <div className="App">
      <div className="text">
        <h1 className="title">WebAssembly</h1>
        <h1 className="desc">Code in C/C++ and run it in Javascript with WebAssembly</h1>
      </div>
      <a
        className="docs"
        target="_blank"
        rel="noreferrer"
        href="https://www.npmjs.com/package/create-webassembly-app"
      >
        DOCUMENTATION
      </a>
      <div className="math-section">
        <input value={numberOne} type="number" id="a" onChange={(e) => setNumber(e, "one")} />
        <span className="math-sign"> + </span>
        <input value={numberTwo} type="number" id="b" onChange={(e) => setNumber(e, "two")} />
        <span className="math-sign" id="btn" onClick={doAddition}>
          =
        </span>
        <span id="res">{sum}</span>
      </div>
    </div>
  );
}

export default App;
