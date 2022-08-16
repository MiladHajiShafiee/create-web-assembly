import { configProjectJson, runProCommand } from "../utils/index.js";

function startReact(
  wasmFileName,
  memoryInitial,
  memoryMaximum,
  optLevel,
  sourcePath,
  filesExtension
) {
  runProCommand(`npx create-webassembly-app init-react`);
  runProCommand(
    `cd ./src/wasm && npx create-webassembly-app build-react ${wasmFileName} ${optLevel} ${sourcePath} ${filesExtension}`
  );
  configProjectJson(wasmFileName, memoryInitial, memoryMaximum);
  runProCommand(`cd ./src/wasm && npx create-webassembly-app gen-wat ${wasmFileName}`);
  runProCommand(`npm start`);
}

export default startReact;
