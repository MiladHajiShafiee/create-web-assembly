import chalk from "chalk";

export const commands = [
  {
    id: "1",
    name: "build",
    desc: "builds C files and generate .wasm and .js files\n",
  },
  {
    id: "2",
    name: "gen-wat",
    desc: "generates .wat file from .wasm file (.wat file is not neccessary for this project just it is text format of .wasm file binary format)\n",
  },
  {
    id: "3",
    name: "run-js",
    desc: "runs the codes inside example.js file\n",
  },
  {
    id: "4",
    name: "server",
    desc: "serves index.html on port 3000\n",
  },
  {
    id: "5",
    name: "start",
    desc: "run all above commands at the same time\n",
  },
  {
    id: "6",
    name: "init",
    desc: "This command will initiate project and create required files and folders\n",
  },
  {
    id: "7",
    name: "list",
    desc: "This command will list all other commands\n",
  },
];

function list() {
  console.log(chalk.blueBright.bold("\n---------------- LIST ALL COMMANDS -------------- :\n"));
  commands.forEach((command) => {
    console.log(
      `${chalk.greenBright.bold.bgBlack(command.name)}: ${chalk.yellowBright(command.desc)}`
    );
  });
  console.log("\n");
}

export default list;
