# create-webassembly-app

### Create app in C/C++ (C++ coming soon) and run it in JS with webassembly


<img width="1437" alt="create-webassembly-app" src="https://user-images.githubusercontent.com/54850998/184387075-0d048428-9d83-4d35-b33e-307e6e7fef63.png">

You should have **[Emscripten](https://emscripten.org/docs/getting_started/downloads.html), [WABT](https://github.com/WebAssembly/wabt), [Node js](https://nodejs.org/en/) and [Make]()** installed on your machine, you can find installations guide for mac below :

You can use the diff language tag to generate some colored text:

## **<span style="color:orange">Mac</span> prerequisite installations with <span style="color:orange">Homebrew</span>** :
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
## **<span style="color:orange">Installation</span>** :
```
> npm i create-webassembly-app
```
or
Prefix commands with npx

## **<span style="color:orange">Repo introduction</span>** :
- **<span style="color:red">source</span>** folder contains **<span style="color:orange">C/C++</span>** files and their **<span style="color:orange">headers</span>**.
- **<span style="color:red">build</span>** folder will contain **<span style="color:orange">.wasm</span>, <span style="color:orange">.wat</span>, <span style="color:orange">.html</span>**  and **<span style="color:orange">.js</span>** files after starting or (build + gen-wat).
- **<span style="color:red">server.js</span>** will serve **<span style="color:orange">index.html</span>** on port **<span style="color:green">3000</span>**
- **<span style="color:red">makefile</span>** will build **<span style="color:orange">C/C++</span>** files (with **<span style="color:green">emcc/em++</span>**)
- **<span style="color:red">app-browser.js</span>** will instantiate the generated **<span style="color:orange">wasm</span>** file that you can use in your **<span style="color:green">index.html</span>** by importing it in script tag like below:
  ```javascript
  import Functions from "/app-browser.js"
  ```

- **<span style="color:red">app-node.js</span>** will instantiate the generated **<span style="color:orange">wasm</span>** file that you can use in your **<span style="color:green">JS</span>** files by importing it like below (take a look at example.js file) :
  ```javascript
  import Functions from "/app-node.js"
  ```

- **<span style="color:red">example.js</span>** you can import **<span style="color:orange">app-node.js</span>** in this file and use **<span style="color:green">C/C++</span>** codes which are written in **<span style="color:green">source</span>** folder.

## **<span style="color:orange">How to use</span>**
  ### 1. Create a project
   
  ```
  > npx create-webassembly-app init appName
  ```
  ### 2. Navigate to the project directory

  ```
  > cd appName
  ```
  ### 3. <span style="color:red">In this step You should run below **commands** one by one and in order **OR** run the </span> <span style="color:orange">Magic command</span>

## **<span style="color:orange">Commands</span>** :
<span style="color:red">You should run these **commands** one by one and in order or run the **<span style="color:orange">Magic command</span>** after creating a new project</span>
- Build : (builds C files and generate .wasm and .js files)
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

- Generate wat file : (generates .wat file from .wasm file)
  
   **wat** file is not necessary for this project just it is the text format of **wasm** file binary format
  ```
  > npx create-webassembly-app gen-wat appName
  ```
- Run example (runs the codes inside example.js file)
  ```
  > npx create-webassembly-app run-js appName
  ```
- Run server (serves index.html on port 3000)
  ```
  > npx create-webassembly-app server
  ```

## **<span style="color:orange">Magic Command</span>**
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
