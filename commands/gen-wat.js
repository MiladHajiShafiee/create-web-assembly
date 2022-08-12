import { runProCommand } from "../utils/index.js";

function genWat(projectName) {
  const command = `wasm2wat ./build/${projectName}.wasm -o ./build/${projectName}.wat`;
  runProCommand(command);
}

export default genWat;
