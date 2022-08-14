import { runInitialCommand, runProCommand } from "../utils/index.js";

function build(projectName, optLevel, sourcePath, filesExtension) {
  runInitialCommand(sourcePath, filesExtension);

  let command;
  switch (optLevel) {
    case "none":
      command = `(make build_to_js FILENAME=${projectName} && make build_to_html FILENAME=${projectName}) || (make run_cpp_to_js FILENAME=${projectName} && make run_cpp_to_html FILENAME=${projectName})`;
      break;
    case "slight":
      command = `(make build_to_js_optLevel_-O1 FILENAME=${projectName} && make build_to_html_optLevel_-O1 FILENAME=${projectName}) || (make run_cpp_to_js_optLevel_-O1 FILENAME=${projectName} && make run_cpp_to_html_optLevel_-O1 FILENAME=${projectName})`;
      break;
    case "aggressive":
      command = `(make build_to_js_optLevel_-O2 FILENAME=${projectName} && make build_to_html_optLevel_-O2 FILENAME=${projectName}) || (make run_cpp_to_js_optLevel_-O2 FILENAME=${projectName} && make run_cpp_to_html_optLevel_-O2 FILENAME=${projectName})`;
      break;
    default:
      break;
  }

  runProCommand(command);
}

export default build;
