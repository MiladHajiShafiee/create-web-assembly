import { configProjectJson } from "../utils/index.js";

function config(wasmFileName, memoryInitial, memoryMaximum) {
  configProjectJson(wasmFileName, memoryInitial, memoryMaximum);
}

export default config;
