# create-webassembly-app
You should have **[Emscripten](https://emscripten.org/docs/getting_started/downloads.html), [WABT](https://github.com/WebAssembly/wabt), [Node js](https://nodejs.org/en/) and [Make]()** installed on your machine, you can find installations guide for mac below :

## **<span style="color:orange">Mac</span> prerequisite installations with <span style="color:orange">Homebrew</span>** :
 If Homebrew is NOT installed you can install from here :
 ```
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
- **<span style="color:red">source</span>** folder contains **<span style="color:orange">C</span>** files and their **<span style="color:orange">headers</span>**.
- **<span style="color:red">build</span>** folder will contain **<span style="color:orange">.wasm</span>, <span style="color:orange">.wat</span>**  and **<span style="color:orange">.js</span>** files after building.
- **<span style="color:red">server.js</span>** will serve **<span style="color:orange">index.html</span>** on port **<span style="color:green">3000</span>**
- **<span style="color:red">makefile</span>** will build **<span style="color:orange">C</span>** files (with **<span style="color:green">emcc</span>**)
- **<span style="color:red">app-browser.js</span>** will instantiate the generated **<span style="color:orange">wasm</span>** file that you can use in your **<span style="color:green">index.html</span>** by importing it in script tag like below:
  > <span style="color:orange">import</span> <span style="color:lightblue">CFunctions</span> <span style="color:orange">from</span> <span style="color:brown">"/app-browser.js"</span>

- **<span style="color:red">app-node.js</span>** will instantiate the generated **<span style="color:orange">wasm</span>** file that you can use in your **<span style="color:green">JS</span>** files by importing it like below (take a look at example.js file) :
  > <span style="color:orange">import</span> <span style="color:lightblue">CFunctions</span> <span style="color:orange">from</span> <span style="color:brown">"/app-node.js"</span>

- **<span style="color:red">example.js</span>** you can import **<span style="color:orange">app-node.js</span>** in this file and use **<span style="color:green">C</span>** functions which are written in **<span style="color:green">source</span>** folder.

## **<span style="color:orange">Creat a project</span>**
  ```
  > npx create-webassembly-app init MyAwesomeWebAssemblyApp
  ```
  ```
  > cd MyAwesomeWebAssemblyApp
  ```

## **<span style="color:orange">Magic Command</span>**
  run all the below commands at the same time
  ```
  > npx create-webassembly-app start MyAwesomeWebAssemblyApp
  ```

## **<span style="color:orange">Usage(commands)</span>** :
<span style="color:red">You should run these commands one by one and in order or do the </span> <span style="color:orange">Magic command</span>
- <span style="color:gray">Build : (builds C files and generate .wasm and .js files)</span>
  ```
  > npx create-webassembly-app build MyAwesomeWebAssemblyApp
  ```
- <span style="color:gray">Generate wat file : (generates .wat file from .wasm file)</span>
  
  <span style="color:gray">.wat file is not necessary for this project just it is the text format of .wasm file binary format</span>
  ```
  > npx create-webassembly-app gen-wat MyAwesomeWebAssemblyApp
  ```
- <span style="color:gray">Run example (runs the codes inside example.js file)</span>
  ```
  > npx create-webassembly-app run-js MyAwesomeWebAssemblyApp
  ```
- <span style="color:gray">Run server (serves index.html on port 3000)</span>
  ```
  > npx create-webassembly-app server
  ```