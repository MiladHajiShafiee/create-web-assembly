import { useState } from "react";

import "./App.css";
import useWasm from "./wasm/use-wasm";
import { encodeArray, decodeString } from "./wasm/js-helpers";

function App() {
  const wasm = useWasm();
  const [sum, setSum] = useState("?");
  const [numberOne, setNumberOne] = useState(0);
  const [numberTwo, setNumberTwo] = useState(0);
  const [description, setDescription] = useState("");
  const [sumOfPassedArray, setSumOfPassedArray] = useState();

  const setNumber = (e, num) => {
    if (num === "one") {
      setNumberOne(e.target.value);
    } else {
      setNumberTwo(e.target.value);
    }
  };

  const doAddition = () => {
    setSum(wasm?.add(numberOne, numberTwo));

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const ptr = encodeArray(arr, arr.length, 4, wasm);
    const sum = wasm?.accumulate(ptr, arr.length);
    setSumOfPassedArray(`[ 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 ]  =  ${sum}`);
    wasm?.wasmfree(ptr);

    const str = decodeString(wasm?.getString(), wasm?.memory);
    setDescription(str);
  };

  console.log(numberOne, " + ", numberTwo, " = ", sum);

  return (
    <div className="App">
      <div className="text">
        <h1 className="title">WebAssembly with React</h1>
        <h1 className="desc">{description}</h1>
        <p className="desc">{sumOfPassedArray}</p>
      </div>
      <a
        target="_blank"
        className="docs"
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
