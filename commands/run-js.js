import { runProCommand } from "../utils/index.js";

function runJs() {
  const command = "node example.js";
  runProCommand(command);
}

export default runJs;
