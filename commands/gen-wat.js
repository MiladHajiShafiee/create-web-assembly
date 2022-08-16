import { runProCommand } from "../utils/index.js";

function genWat(wasmFileName) {
  const command = `wasm2wat ./build/${wasmFileName}.wasm -o ./build/${wasmFileName}.wat`;
  runProCommand(command);
}

export default genWat;
