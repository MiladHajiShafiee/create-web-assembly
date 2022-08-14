# create-webassembly-app

### Create app in C/C++ (C++ coming soon) and run it in JS with webassembly

<img width="1437" alt="create-webassembly-app" src="https://user-images.githubusercontent.com/54850998/184387075-0d048428-9d83-4d35-b33e-307e6e7fef63.png">

You should have **[Emscripten](https://emscripten.org/docs/getting_started/downloads.html), [WABT](https://github.com/WebAssembly/wabt), [Node js](https://nodejs.org/en/) and [Make]()** installed on your machine, you can find installations guide for mac below :

You can use the diff language tag to generate some colored text:

## **Mac prerequisite installations with Homebrew**

  If Homebrew is NOT installed you can install from here :

 ```js
  > /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

```
 > brew install emscripten
```

```
 > brew install wabt
```

```
 > brew install node
```

```
 > brew install make
```

## **Installation**

```
> npm i create-webassembly-app
```

or
Prefix commands with npx

## **Repo introduction**

- **source** folder contains **C/C++** files and their **headers**.
- **build** folder will contain **.wasm, .wat, .html**  and **.js** files after starting or (build + gen-wat).
- **server.js** will serve **index.html** on port **3000**
- **makefile** will build **C/C++** files (with **emcc/em++**)
- **app-browser.js** will instantiate the generated **wasm** file that you can use in your **index.html** by importing it in script tag like below:

  ```javascript
  import Functions from "/app-browser.js"
  ```

- **app-node.js** will instantiate the generated **wasm** file that you can use in your **JS** files by importing it like below (take a look at example.js file) :

  ```javascript
  import Functions from "/app-node.js"
  ```

- **example.js** you can import **app-node.js** in this file and use **C/C++** codes which are written in **source** folder.

## **Use with React**

### 1. Create a React project

  ```
  > npx create-react-app appName
  ```

### 2. Navigate to the project directory

  ```
  > cd appName
  ```

### 3. Initiate requirements: ( warning: This command will replace App.css and App.js with new ones )

  ```
  > npx create-webassembly-app init-react
  ```

### 4. Navigate to the wasm folder

  ```
  > cd ./src/wasm
  ```

### 5. Build C/C++ files to the build folder

  ```
  > npx create-webassembly-app build-react fileName optLevel sourcePath filesExtension 
  ```
- fileName : the name of wasm file that will be created after building

- optLevel (optimization level) **SHOULD** be one of these:
  - none
  - slight
  - aggressive

- sourcePath (The path of the folder which will contain your code files)
  DEFAULT is source and if you want to use another name then change the folder name in the directory too

- filesExtension (the extension of code files, like c for C programming language)

    **Example command:**

    ```
    > npx create-webassembly-app build-react add none ./source/ c
    ```

### 6. Generate wat file : (generates .wat file from .wasm file)

  **wat** file is not necessary for this project just it is the text format of **wasm** file binary format

  ```
  > npx create-webassembly-app gen-wat fileName
  ```

  - fileName : the name of wasm file that is created through building step

### 7. Navigate to the project root directory & Run the React app

 ```
  > cd ../../
 ```

 ```
  > npm start
 ```

## **How to use**

### 1. Create a project

  ```
  > npx create-webassembly-app init appName
  ```

### 2. Navigate to the project directory

  ```
  > cd appName
  ```

### 3. In this step You should run below **commands** one by one and in order **OR** run the  Magic command

## **Commands**

You should run these **commands** one by one and in order or run the **Magic command** after creating a new project

### 1. Build : (builds C/C++ files and generate .wasm and .js files)

  ```
  > npx create-webassembly-app build appName optLevel sourcePath filesExtension
  ```

- optLevel (optimization level) **SHOULD** be one of these:
  - none
  - slight
  - aggressive

- sourcePath (The path of the folder which will contain your code files)
  DEFAULT is source and if you want to use another name then change the folder name in the directory too

- filesExtension (the extension of code files, like c for C programming language)

    **Example command:**

    ```
    > npx create-webassembly-app build myApp none ./source/ c
    ```

    Another example with different sourth folder name

    **IMPORTANT**: You should change **source** folder **name** to **src** in the project directory

    ```
    > npx create-webassembly-app build myApp none ./src/ c
    ```

### 2. Generate wat file : (generates .wat file from .wasm file)

  **wat** file is not necessary for this project just it is the text format of **wasm** file binary format

  ```
  > npx create-webassembly-app gen-wat appName
  ```

### 3. Run example (runs the codes inside example.js file)

  ```
  > npx create-webassembly-app run-js appName
  ```

### 4. Running server (serves index.html on port 3000)

  ```
  > npx create-webassembly-app server
  ```

## **Magic Command**

  run all the below commands at the same time

  ```
  > npx create-webassembly-app start appName optLevel sourcePath filesExtension
  ```

- optLevel (optimization level) **SHOULD** be one of these:
  - none
  - slight
  - aggressive

- sourcePath (The path of the folder which will contain your code files)
  DEFAULT is source and if you want to use another name then change the folder name in the directory as well

- filesExtension (the extension of code files, like c for C programming language)

    Example command:

    ```
    > npx create-webassembly-app start myApp none ./source/ c
    ```

    Another example with different sourth folder name

    **IMPORTANT**: You should change **source** folder **name** to **src** in the project directory

    ```
    > npx create-webassembly-app start myApp none ./src/ c
    ```
