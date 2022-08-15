import { runProCommand } from "../utils/index.js";

function startReact(projectName, fileName, optLevel, sourcePath, filesExtension) {
  runProCommand(`npx create-react-app ${projectName}`);
  runProCommand(`cd ${projectName} && npx create-webassembly-app init-react`);
  runProCommand(
    `cd ${projectName}/src/wasm && npx create-webassembly-app build-react ${fileName} ${optLevel} ${sourcePath} ${filesExtension}`
  );
  runProCommand(`cd ${projectName}/src/wasm && npx create-webassembly-app gen-wat ${fileName}`);
  runProCommand(`cd ${projectName} && npm start`);
}

export default startReact;
