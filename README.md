# create-webassembly-app

### Create app in C/C++ (C++ coming soon) and run it in JS with webassembly

<img width="1437" alt="create-webassembly-app" src="https://user-images.githubusercontent.com/54850998/184387075-0d048428-9d83-4d35-b33e-307e6e7fef63.png">

You should have **[Emscripten](https://emscripten.org/docs/getting_started/downloads.html), [WABT](https://github.com/WebAssembly/wabt), [Node js](https://nodejs.org/en/) and [Make]()** installed on your machine, you can find installations guide for mac below :

## **Mac prerequisite installations with Homebrew**

  If Homebrew is NOT installed you can install from here :

 ```js
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

```
 brew install emscripten
```

```
 brew install wabt
```

```
 brew install node
```

```
 brew install make
```

## **Installation**

```
> npm i create-webassembly-app
```

### OR

Prefix commands with npx

## **Package introduction**

- **source** folder contains **C/C++** files and their **headers** (You can also make other nested folders inside source folder they will be added to the makefile automatically).
- **build** folder will contain **.wasm, .wat, .html**  and **.js** files after starting or [build + gen-wat] (In ReactJs case it won't contain html file).
- **server.js** will serve **index.html** on port **3000** (Doesn't exist in ReactJs case, because create-react-app will run the app on port 3000 automatically)
- **makefile** will build **C/C++** files (with **emcc/em++**)
- **loader-browser.js** will instantiate the generated **wasm** file that you can use in your **index.html** by importing it in script tag like below (Doesn't exist in ReacJs case, a hook will handle it in ReacJs):

  ```javascript
  import Functions from "/loader-browser.js"
  ```

- **loader-node.js** will instantiate the generated **wasm** file that you can use in your **JS** files by importing it like below (take a look at example.js file, Doesn't exist in ReacJs case, a hook will handle it in ReacJs) :

  ```javascript
  import Functions from "/loader-node.js"
  ```
  
- **js-helper-browser.js** exported javascript functions for working with memory.

- **js-helper-node.js** exported javascript functions for working with memory.

- **js-helper.js** exported javascript functions for working with memory in **React** projects.

- **project.config.json** a json file that contains wasmFileName, memoryInitial, memoryMaximum that you can configure those with desired values (take a look at config commands).

- **example.js** you can import **loader-node.js** in this file and use **C/C++** codes which are written in **source** folder (Doesn't exist in ReacJs case, by importing a hook you can use your C/C++ codes in ReacJs).

## **Use with React**

### 1. Create a React project

  ```
  npx create-react-app appName
  ```

### 2. Navigate to the project directory

  ```
  cd appName
  ```

### 3. In this step Run React magic command **OR** Run React commands in order and one by one

## React magic command

  ```
  npx create-webassembly-app start-react wasmFileName memoryInitial memoryMaximum optLevel sourcePath filesExtension
  ```

- wasmFileName : the name of wasm file that will be created after building

- memoryInitial : WebAssembly Memory instance with an initial size of memoryInitial pages.

- memoryMaximum : WebAssembly Memory instance with a maximum size of memoryMaximum pages.

- optLevel (optimization level) **SHOULD** be one of these:
  - none
  - slight
  - aggressive

- sourcePath (The path of the folder which will contain your code files)
  DEFAULT is source and if you want to use another name then change the folder name in the directory too

- filesExtension (the extension of code files, like c for C programming language)

    **Example command:**

    ```js
    npx create-webassembly-app start-react test 256 512 none ./source/ c
    ```

## React commands

### 1. Initiate requirements: ( warning: This command will replace App.css and App.js with new ones )

  ```
  npx create-webassembly-app init-react
  ```

### 2. Configure project.config.json

  ```
  npx create-webassembly-app config wasmFileName memoryInitial memoryMaximum
  ```

  Example command:
  ```js
  npx create-webassembly-app config test 256 512
  ```

### 3. Navigate to the wasm folder

  ```
  cd ./src/wasm
  ```

### 4. Build C/C++ files to the build folder

  ```
  npx create-webassembly-app build-react wasmFileName optLevel sourcePath filesExtension 
  ```

- wasmFileName : the name of wasm file that will be created after building

- optLevel (optimization level) **SHOULD** be one of these:
  - none
  - slight
  - aggressive

- sourcePath (The path of the folder which will contain your code files)
  DEFAULT is source and if you want to use another name then change the folder name in the directory too

- filesExtension (the extension of code files, like c for C programming language)

    **Example command:**

    ```
    npx create-webassembly-app build-react test none ./source/ c
    ```

### 5. Generate wat file : (generates .wat file from .wasm file)

  **wat** file is not necessary for this project just it is the text format of **wasm** file binary format

  ```
  npx create-webassembly-app gen-wat wasFileName
  ```

- fileName : the name of wasm file that is created through building step

### 6. Navigate to the project root directory & Run the React app

 ```
  cd ../../
 ```

 ```
  npm start
 ```

## React example code

No need to copy and paste after doing one of React commands (React magic command OR React commands) App.js will contain these codes :

  ```js
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


  ```

## **How to use in general**

### 1. Create a project

  ```
  npx create-webassembly-app init appName
  ```

### 2. Navigate to the project directory

  ```
  cd appName
  ```

### 3. In this step You should run below **commands** one by one and in order **OR** run the  Magic command

## **Commands**

You should run these **commands** one by one and in order or run the **Magic command** after creating a new project

### 1. Configure project.config.json

  ```
  npx create-webassembly-app config wasmFileName memoryInitial memoryMaximum
  ```

  Example command:
  ```js
  npx create-webassembly-app config test 256 512
  ```

### 2. Build : (builds C/C++ files and generate .wasm and .js files)

  ```
  npx create-webassembly-app build wasmFileName optLevel sourcePath filesExtension
  ```

- wasmFileName : the name of wasm file that will be created after building
  
- optLevel (optimization level) **SHOULD** be one of these:
  - none
  - slight
  - aggressive

- sourcePath (The path of the folder which will contain your code files)
  DEFAULT is source and if you want to use another name then change the folder name in the directory too

- filesExtension (the extension of code files, like c for C programming language)

    **Example command:**

    ```
    npx create-webassembly-app build test none ./source/ c
    ```

    Another example with different sourth folder name

    **IMPORTANT**: You should change **source** folder **name** to **src** in the project directory

    ```
    npx create-webassembly-app build wasmFileName none ./src/ c
    ```

### 3. Generate wat file : (generates .wat file from .wasm file)

  **wat** file is not necessary for this project just it is the text format of **wasm** file binary format

  ```
  npx create-webassembly-app gen-wat wasmFileName
  ```

### 4. Run example (runs the codes inside example.js file)

  For test:

  ```
  npx create-webassembly-app run-js
  ```

  Show result:

  ```js
  node example.js
  ```

### 5. Running server (serves index.html on port 3000)

  ```
  npx create-webassembly-app server
  ```

## **Magic Command**

  Run all the above commands at the same time

  ```
  npx create-webassembly-app start wasmFileName memoryInitial memoryMaximum optLevel sourcePath filesExtension
  ```

- wasmFileName : the name of wasm file that will be created after building
  
- memoryInitial : WebAssembly Memory instance with an initial size of memoryInitial pages.

- memoryMaximum : WebAssembly Memory instance with a maximum size of memoryMaximum pages.
  
- optLevel (optimization level) **SHOULD** be one of these:
  - none
  - slight
  - aggressive

- sourcePath (The path of the folder which will contain your code files)
  DEFAULT is source and if you want to use another name then change the folder name in the directory as well

- filesExtension (the extension of code files, like c for C programming language)

    Example command:

    ```js
    npx create-webassembly-app start test 256 512 none ./source/ c
    ```

    Another example with different sourth folder name

    **IMPORTANT**: You should change **source** folder **name** to **src** in the project directory

    ```js
    npx create-webassembly-app start test 256 512 none ./src/ c
    ```
