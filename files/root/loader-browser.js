import { logProgress } from "./js-helpers-browser.js";
import projectConfigJson from "./project.config.json" assert { type: "json" };

// Define wasm file directory
const initial = projectConfigJson.memoryInitial;
const maximum = projectConfigJson.memoryMaximum;
const wasmFilePath = `./build/${projectConfigJson.wasmFileName}.wasm`;

// Define memory
let memory = new WebAssembly.Memory({ initial, maximum });

// Instantiate read wasm file with WebAssembly
const result = await WebAssembly.instantiateStreaming(fetch(wasmFilePath), {
  js: {
    mem: memory,
  },
  env: {
    curTime: () => 100,
    logProgress: logProgress,
    emscripten_resize_heap: memory.grow,
  },
});

const exports = result.instance.exports;

// Export codes written in other languages
export default exports;
