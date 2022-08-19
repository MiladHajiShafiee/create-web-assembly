import init from "./init.js";
import list from "./list.js";
import build from "./build.js";
import start from "./start.js";
import runJs from "./run-js.js";
import config from "./config.js";
import server from "./server.js";
import genWat from "./gen-wat.js";
import version from "./version.js";
import initReact from "./init-react.js";
import buildReact from "./build-react.js";
import startReact from "./start-react.js";

export const commands = [
  {
    id: "1",
    name: "init",
    action: init,
    command: "init <projectName>",
    desc: "This command will initiate project and create required files and folders\n",
  },
  {
    id: "2",
    name: "config",
    action: config,
    command: "config <wasmFileName> <memoryInitial> <memoryMaximum>",
    desc: "This command will configure wasmFileName, memoryInitial, and memoryMaximum\n",
  },
  {
    id: "3",
    name: "build",
    action: build,
    command: "build <wasmFileName> <optLevel> <sourcePath> <filesExtension>",
    desc: "builds C files and generate .wasm and .js files\n",
  },
  {
    id: "4",
    name: "gen-wat",
    action: genWat,
    command: "gen-wat  <wasmFileName>",
    desc: "generates .wat file from .wasm file (.wat file is not neccessary for this project just it is text format of .wasm file binary format)\n",
  },
  {
    id: "5",
    name: "run-js",
    action: runJs,
    command: "run-js",
    desc: "runs the codes inside example.js file\n",
  },
  {
    id: "6",
    name: "server",
    action: server,
    command: "server",
    desc: "serves index.html on port 3000\n",
  },
  {
    id: "7",
    name: "start",
    action: start,
    command:
      "start <wasmFileName> <memoryInitial> <memoryMaximum> <optLevel> <sourcePath> <filesExtension>",
    desc: "run all necessary commands at the same time\n",
  },
  {
    id: "8",
    name: "init-react",
    action: initReact,
    command: "init-react",
    desc: "This command will setup requirements inside react app\n",
  },
  {
    id: "9",
    name: "build-react",
    action: buildReact,
    command: "build-react <wasmFileName> <optLevel> <sourcePath> <filesExtension>",
    desc: "builds C files and generate .wasm and .js files\n",
  },
  {
    id: "10",
    name: "start-react",
    action: startReact,
    command:
      "start-react <wasmFileName> <memoryInitial> <memoryMaximum> <optLevel> <sourcePath> <filesExtension>",
    desc: "run all necessary commands for initiating, setting up and running wasm in a React project\n",
  },
  {
    id: "11",
    name: "list",
    action: list,
    command: "list",
    desc: "This command will list all other commands\n",
  },
  {
    id: "12",
    name: "help",
    action: list,
    command: "help",
    desc: "This command will list all other commands\n",
  },
  {
    id: "12",
    name: "help",
    action: list,
    command: "help",
    desc: "This command will list all other commands\n",
  },
  {
    id: "13",
    name: "version",
    action: version,
    command: "get-version",
    desc: "This command will list all other commands\n",
  },
];
