import packageJson from "./package.json" assert { type: "json" };

// Define wasm file directory
const wasmFilePath = `./build/${packageJson.name}.wasm`;

// Instantiate read wasm file with WebAssembly
const result = await WebAssembly.instantiateStreaming(fetch(wasmFilePath), {});

// Make exports variable which contains codes written in other languages
const exports = result.instance.exports;

// Export codes written in other languages
export default exports;
