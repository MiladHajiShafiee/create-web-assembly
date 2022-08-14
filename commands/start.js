import build from "./build.js";
import genWat from "./gen-wat.js";
import runJs from "./run-js.js";
import server from "./server.js";

function start(projectName, optLevel, sourcePath, filesExtension) {
  // const command = `create-webassembly-app build ${projectName} && create-webassembly-app gen-wat ${projectName} && create-webassembly-app run-js ${projectName} && create-webassembly-app server`;
  // runProCommand(command);
  build(projectName, optLevel, sourcePath, filesExtension);
  genWat(projectName);
  runJs(projectName);
  server();
}

export default start;
