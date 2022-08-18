# create-webassembly-app

### Create app in C/C++ (C++ coming soon) and run it in JS with webassembly

<img width="1437" alt="create-webassembly-app" src="https://user-images.githubusercontent.com/54850998/184387075-0d048428-9d83-4d35-b33e-307e6e7fef63.png">

You should have **[Emscripten](https://emscripten.org/docs/getting_started/downloads.html), [WABT](https://github.com/WebAssembly/wabt) (required if you want to use gen-wat command), [Node js](https://nodejs.org/en/) and [Make]()** installed on your machine, you can find installations guide for mac below :

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
### use command below **OR** run commands with **npx**
```
 npm i create-webassembly-app
```

## **List all supported commands**
Run this command to see all supported commands :

```
npx create-webassembly-app list
```

## **Package introduction**
![create-webassembly-app_folder-guide](https://user-images.githubusercontent.com/54850998/185022813-99a5b105-f26b-4c96-baa2-8b3077b63e1c.svg)
- 1.**source** folder contains **C/C++** files and their **headers** (You can also make other nested folders inside source folder they will be added to the makefile automatically).
- 2.**build** folder will contain **.wasm, .wat, .html**  and **.js** files after running **start** command or **build** && **gen-wat** commands (In ReactJs case it won't contain html file).
- 3.**server.js** will serve **index.html** on port **3000** (Doesn't exist in ReactJs case, because create-react-app will run the app on port 3000 automatically)
- 4.**makefile** will build **C/C++** files (with **emcc/em++**)
- 5.**loader-browser.js** will instantiate the generated **wasm** file that you can use in your **index.html** by importing it in script tag like below (Doesn't exist in ReacJs case, a hook will handle it in ReacJs):

  ```javascript
  import exports from "/loader-browser.js"
  ```

- 6.**loader-node.js** will instantiate the generated **wasm** file that you can use in your **JS** files by importing it like below (take a look at example.js file, Doesn't exist in ReacJs case, a hook will handle it in ReacJs) :

  ```javascript
  import exports from "/loader-node.js"
  ```
  
- 7.**js-helper-browser.js** : exported javascript functions for working with memory.

- 8.**js-helper-node.js** : exported javascript functions for working with memory.

- 9.**js-helper.js** : exported javascript functions for working with memory in **React** projects.

- 10.**project.config.json** a json file that contains wasmFileName, memoryInitial, memoryMaximum values that you can configure those with desired values (take a look at config command).

- 11.**example.js** you can import **loader-node.js** in this file and use **C/C++** codes which are written in **source** folder (Doesn't exist in ReacJs case, by importing a hook you can use your C/C++ codes in ReacJs).

- 12.**index.js & index.css** : start point of application in bare case.

- 13.**App.js & App.css** : start point of application in ReactJs case.

- 14.**use-wat.js** : custom hook that will load and instantiate wasm file

## **Use in general**

### 1. Create a project

  ```
  npx create-webassembly-app init appName
  ```

### 2. Navigate to the project directory

  ```
  cd appName
  ```

### 3. In this step You should run **Commands** one by one and in order **OR** run  **Magic command**

## **Commands**

### 1. Configure project.config.json

  ```
  npx create-webassembly-app config wasmFileName memoryInitial memoryMaximum
  ```

- wasmFileName : the name of wasm file that will be created after building

- memoryInitial : WebAssembly Memory instance with an initial size of memoryInitial pages.

- memoryMaximum : WebAssembly Memory instance with a maximum size of memoryMaximum pages.
  
Example :
```js
npx create-webassembly-app config test 256 512
```

### 2. Build : builds C/C++ files and generate .wasm and .js files

  ```
  npx create-webassembly-app build wasmFileName optLevel sourcePath filesExtension
  ```

  ***IGNORE "error: undefined symbol : curTime and logProgress" and continue through steps***

- wasmFileName : the name of wasm file that will be created after building in the build folder
  
- optLevel (optimization level) **SHOULD** be one of these:
  - none
  - slight
  - aggressive

- sourcePath (The path of the folder which will contain your code files)
  DEFAULT is source and if you want to use another name then change the folder name in the directory too (take a look at Another example below)

- filesExtension (the extension of code files, like c for C programming language)

    **Example :**

    ```
    npx create-webassembly-app build test none ./source/ c
    ```

    Another example with changed source folder name

    **IMPORTANT**: You should change **source** folder **name** to **src** in the project directory if you changed **source** to **src** or other name

    ```
    npx create-webassembly-app build test none ./src/ c
    ```

### 3. Generate wat file (optional) : generates .wat file from .wasm file

  **wat** file is not necessary for this project just it is the text format (human readable format) of **wasm** file binary format

  ```
  npx create-webassembly-app gen-wat wasmFileName
  ```

### 4. Run example : runs the codes inside example.js file (doesn't exist in ReactJs case)

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

  **Example :**

  ```js
  npx create-webassembly-app start test 256 512 none ./source/ c
  ```

  Another example with changed source folder name

  **IMPORTANT**: You should change **source** folder **name** to **src** in the project directory if you changed **source** to **src** or other name

  ```js
  npx create-webassembly-app start test 256 512 none ./src/ c
  ```

## **Use with React**

### 1. Create a React project

  ```
  npx create-react-app appName
  ```

### 2. Navigate to the project directory

  ```
  cd appName
  ```

### 3. In this step run **React magic command** **OR** run **React commands** in order and one by one

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
IGNORE "error: undefined symbol : curTime and logProgress" and continue through steps
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

- wasmFileName : the name of wasm file that is created through building step

### 6. Navigate to the project root directory & Run the React app

 ```
  cd ../../
 ```

### 7. Start project

 ```
  npm start
 ```

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

## General example code

No need to copy and paste, After doing one of magic command **OR** commands, index.js will contain these codes :

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WebAssembly</title>
    <link rel="stylesheet" href="index.css" />
  </head>
  <body>
    <div class="text">
      <h1 class="title">WebAssembly</h1>
      <h1 class="desc" id="desc"></h1>
      <h3 class="desc" id="sum-of-array"></h3>
      <h3 class="desc" id="rand-string"></h3>
    </div>
    <a href="https://www.npmjs.com/package/create-webassembly-app" target="_blank" class="docs"
      >DOCUMENTATION</a
    >

    <script type="module">
      import exports from "/loader-browser.js";
      import { encodeArray, decodeString } from "./js-helpers-browser.js";

      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const ptr = encodeArray(arr, arr.length, 4);
      const sumOfArrayEls = exports.accumulate(ptr, arr.length);
      exports.wasmfree(ptr);
      console.log(`[ 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 ]  =  ${sumOfArrayEls}`);
      document.getElementById(
        "sum-of-array"
      ).innerHTML = `[ 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 ]  =  ${sumOfArrayEls}`;

      const str = decodeString(exports.getString());
      console.log(str);
      document.getElementById("desc").innerHTML = str;

      const randStr = decodeString(exports.randString(40));
      console.log(`Generated random string : ${randStr}`);
      document.getElementById("rand-string").innerHTML += `Generated random string : ${randStr}`;

      const btn = document.getElementById("btn");
      btn.addEventListener(
        "click",
        function () {
          const a = document.querySelector("#a").value;
          const b = document.querySelector("#b").value;
          const sum = exports.add(a, b);
          document.querySelector("#res").innerHTML = `${sum}`;
          console.log(a, " + ", b, " = ", sum);
        },
        false
      );
    </script>

    <div class="math-section">
      <input type="number" id="a" />
      <span class="math-sign"> + </span>
      <input type="number" id="b" />
      <span class="math-sign" id="btn"> = </span>
      <span id="res">?</span>
    </div>
  </body>
</html>


```

## React example code

No need to copy and paste, After doing one of React magic command **OR** React commands, App.js will contain these codes :

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

## **List of all supported commands**

- ### **General commands**

```
npx create-webassembly-app list
```

```
npx create-webassembly-app init appName
```

```
npx create-webassembly-app config wasmFileName memoryInitial memoryMaximum
```

```
npx create-webassembly-app build wasmFileName optLevel sourcePath filesExtension
```

```
npx create-webassembly-app gen-wat wasmFileName
```

```
npx create-webassembly-app server
```

```
npx create-webassembly-app start wasmFileName memoryInitial memoryMaximum optLevel sourcePath filesExtension
```

- ### **React commands**

```
npx create-webassembly-app init-react
```

```
npx create-webassembly-app config wasmFileName memoryInitial memoryMaximum
```

```
npx create-webassembly-app build-react wasmFileName optLevel sourcePath filesExtension 
```

```
npx create-webassembly-app gen-wat wasFileName
```

```
npx create-webassembly-app start-react wasmFileName memoryInitial memoryMaximum optLevel sourcePath filesExtension
```
