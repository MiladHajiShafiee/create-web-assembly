#! /usr/bin/env node

import { program } from "commander";

import { commands } from "./commands/_COMMANDS_LIST.js";

for (const command of commands) {
  program.command(command.command).description(command.desc).action(command.action);
}

program.parse();
