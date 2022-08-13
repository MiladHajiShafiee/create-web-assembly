import { runInitialCommand, runProCommand } from "../utils/index.js";

function build(projectName, optLevel) {
  runInitialCommand();

  let command;
  switch (optLevel) {
    case "none":
      command = `(make run_c_to_js FILENAME=${projectName} && make run_c_to_html FILENAME=${projectName}) || (make run_cpp_to_js FILENAME=${projectName} && make run_cpp_to_html FILENAME=${projectName})`;
      break;
    case "slight":
      command = `(make run_c_to_js_optLevel_-O1 FILENAME=${projectName} && make run_c_to_html_optLevel_-O1 FILENAME=${projectName}) || (make run_cpp_to_js_optLevel_-O1 FILENAME=${projectName} && make run_cpp_to_html_optLevel_-O1 FILENAME=${projectName})`;
      break;
    case "aggressive":
      command = `(make run_c_to_js_optLevel_-O2 FILENAME=${projectName} && make run_c_to_html_optLevel_-O2 FILENAME=${projectName}) || (make run_cpp_to_js_optLevel_-O2 FILENAME=${projectName} && make run_cpp_to_html_optLevel_-O2 FILENAME=${projectName})`;
      break;
    default:
      break;
  }

  runProCommand(command);
}

export default build;
