import { runInitialCommand, runProCommand } from "../utils/index.js";

function build(projectName) {
  runInitialCommand();
  const command = `make run FILENAME=${projectName}`;
  runProCommand(command);
}

export default build;
