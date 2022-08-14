import { runReactInitialCommand, runProCommand } from "../utils/index.js";

function buildReact(fileName, optLevel, sourcePath, filesExtension) {
  runReactInitialCommand(sourcePath, filesExtension);

  let command;
  switch (optLevel) {
    case "none":
      command = `make build_to_js FILENAME=${fileName} || make run_cpp_to_js FILENAME=${fileName}`;
      break;
    case "slight":
      command = `make build_to_js_optLevel_-O1 FILENAME=${fileName} || make run_cpp_to_js_optLevel_-O1 FILENAME=${fileName}`;
      break;
    case "aggressive":
      command = `make build_to_js_optLevel_-O2 FILENAME=${fileName} || make run_cpp_to_js_optLevel_-O2 FILENAME=${fileName}`;
      break;
    default:
      break;
  }

  runProCommand(command);
}

export default buildReact;
