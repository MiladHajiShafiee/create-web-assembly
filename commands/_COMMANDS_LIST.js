export const commands = [
  {
    id: "1",
    name: "build",
    desc: "builds C files and generate .wasm and .js files\n",
  },
  {
    id: "2",
    name: "gen-wat",
    desc: "generates .wat file from .wasm file (.wat file is not neccessary for this project just it is text format of .wasm file binary format)\n",
  },
  {
    id: "3",
    name: "run-js",
    desc: "runs the codes inside example.js file\n",
  },
  {
    id: "4",
    name: "server",
    desc: "serves index.html on port 3000\n",
  },
  {
    id: "5",
    name: "start",
    desc: "run all necessary commands at the same time\n",
  },
  {
    id: "6",
    name: "init",
    desc: "This command will initiate project and create required files and folders\n",
  },
  {
    id: "7",
    name: "list",
    desc: "This command will list all other commands\n",
  },
  {
    id: "8",
    name: "init-react",
    desc: "This command will setup requirements inside react app",
  },
  {
    id: "9",
    name: "build-react",
    desc: "builds C files and generate .wasm and .js files\n",
  },
  {
    id: "10",
    name: "start-react",
    desc: "run all necessary commands for initiating, setting up and running wasm in a React project\n",
  },
  {
    id: "11",
    name: "help",
    desc: "This command will list all other commands\n",
  },
  {
    id: "12",
    name: "config",
    desc: "This command will configure wasmFileName, memoryInitial, and memoryMaximum\n",
  },
];
