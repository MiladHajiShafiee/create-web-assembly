import { runProCommand } from "../utils/index.js";

function server() {
  const command = "nodemon server.js";
  runProCommand("open http://localhost:3000/");
  runProCommand(command);
}

export default server;
