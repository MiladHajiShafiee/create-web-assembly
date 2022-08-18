import fs from "fs";
import { logProgress } from "./js-helpers-node.js";
import projectConfigJson from "./project.config.json" assert { type: "json" };

// Define wasm file directory
const initial = projectConfigJson.memoryInitial;
const maximum = projectConfigJson.memoryMaximum;
const wasmFilePath = `./build/${projectConfigJson.wasmFileName}.wasm`;

// Define memory
let memory = new WebAssembly.Memory({ initial, maximum });

// Read wasm file from build directory
const buffer = fs.readFileSync(wasmFilePath);

// Instantiate read wasm file with WebAssembly
const result = await WebAssembly.instantiate(buffer, {
  js: {
    mem: memory,
  },
  env: {
    curTime: () => 100,
    logProgress: logProgress,
    emscripten_resize_heap: memory.grow,
  },
});

// Make exports variable out of codes written in other languages
const exports = result.instance.exports;

// Export codes written in other languages
export default exports;
