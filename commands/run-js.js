import { runProCommand } from "../utils/index.js";

function runJs(projectName) {
  const command = `node example.js ${projectName}`;
  runProCommand(command);
}

export default runJs;
