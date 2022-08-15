import chalk from "chalk";

import { commands } from "./_COMMANDS_LIST.js";

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
