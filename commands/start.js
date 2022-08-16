import build from "./build.js";
import runJs from "./run-js.js";
import server from "./server.js";
import genWat from "./gen-wat.js";
import { configProjectJson } from "../utils/index.js";

function start(wasmFileName, memoryInitial, memoryMaximum, optLevel, sourcePath, filesExtension) {
  // const command = `create-webassembly-app build ${wasmFileName} && create-webassembly-app gen-wat ${wasmFileName} && create-webassembly-app run-js ${wasmFileName} && create-webassembly-app server`;
  // runProCommand(command);
  build(wasmFileName, optLevel, sourcePath, filesExtension);
  genWat(wasmFileName);
  configProjectJson(wasmFileName, memoryInitial, memoryMaximum);
  runJs();
  server();
}

export default start;
