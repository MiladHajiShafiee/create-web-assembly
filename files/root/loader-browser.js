import projectConfigJson from "./project.config.json" assert { type: "json" };

// Define wasm file directory
const wasmFilePath = `./build/${projectConfigJson.wasmFileName}.wasm`;
const initial = projectConfigJson.memoryInitial;
const maximum = projectConfigJson.memoryMaximum;

// Define memory
let memory = new WebAssembly.Memory({ initial, maximum });

// Instantiate read wasm file with WebAssembly
const result = await WebAssembly.instantiateStreaming(fetch(wasmFilePath), {
  js: {
    mem: memory,
  },
  env: {
    emscripten_resize_heap: memory.grow,
  },
});

const exports = result.instance.exports;

// Export codes written in other languages
export default exports;
