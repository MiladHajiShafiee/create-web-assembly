import fs from "fs";
import projectConfigJson from "./project.config.json" assert { type: "json" };

// Define wasm file directory
const wasmFilePath = `./build/${projectConfigJson.wasmFileName}.wasm`;
const initial = projectConfigJson.memoryInitial;
const maximum = projectConfigJson.memoryMaximum;

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
    emscripten_resize_heap: memory.grow,
  },
});

// Make exports variable out of codes written in other languages
const exports = result.instance.exports;

// Export codes written in other languages
export default exports;
