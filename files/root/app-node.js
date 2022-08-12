import fs from "fs";

// Get the args from terminal
const args = process.argv;

// Last arg as filePath
const fileName = args[args.length - 1].split(".")[0];

// Define wasm file directory
const wasmFilePath = `./build/${fileName}.wasm`;

// Read wasm file from build directory
const buffer = fs.readFileSync(wasmFilePath);

// Instantiate read wasm file with WebAssembly
const result = await WebAssembly.instantiate(buffer);

// Make exports variable which contains C functions
const exports = result.instance.exports;

// Export functions that are written in C
export default exports;
