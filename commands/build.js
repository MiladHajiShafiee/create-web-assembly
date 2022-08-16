import { runInitialCommand, runProCommand } from "../utils/index.js";

function build(wasmFileName, optLevel, sourcePath, filesExtension) {
  runInitialCommand(sourcePath, filesExtension);

  let command;
  switch (optLevel) {
    case "none":
      command = `(make build_to_js FILENAME=${wasmFileName} && make build_to_html FILENAME=${wasmFileName}) || (make run_cpp_to_js FILENAME=${wasmFileName} && make run_cpp_to_html FILENAME=${wasmFileName})`;
      break;
    case "slight":
      command = `(make build_to_js_optLevel_-O1 FILENAME=${wasmFileName} && make build_to_html_optLevel_-O1 FILENAME=${wasmFileName}) || (make run_cpp_to_js_optLevel_-O1 FILENAME=${wasmFileName} && make run_cpp_to_html_optLevel_-O1 FILENAME=${wasmFileName})`;
      break;
    case "aggressive":
      command = `(make build_to_js_optLevel_-O2 FILENAME=${wasmFileName} && make build_to_html_optLevel_-O2 FILENAME=${wasmFileName}) || (make run_cpp_to_js_optLevel_-O2 FILENAME=${wasmFileName} && make run_cpp_to_html_optLevel_-O2 FILENAME=${wasmFileName})`;
      break;
    default:
      break;
  }

  runProCommand(command);
}

export default build;
