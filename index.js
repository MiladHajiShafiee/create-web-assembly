#! /usr/bin/env node

import { program } from "commander";

import init from "./commands/init.js";
import build from "./commands/build.js";
import start from "./commands/start.js";
import runJs from "./commands/run-js.js";
import server from "./commands/server.js";
import getWat from "./commands/gen-wat.js";
import list, { commands } from "./commands/list.js";

program.command(commands[6].name).description(commands[6].desc).action(list);
program.command(`${commands[5].name} <projectName>`).description(commands[5].desc).action(init);
program.command(`${commands[0].name} <projectName>`).description(commands[0].desc).action(build);
program.command(`${commands[1].name} <projectName>`).description(commands[1].desc).action(getWat);
program.command(`${commands[2].name} <projectName>`).description(commands[2].desc).action(runJs);
program.command(commands[3].name).description(commands[3].desc).action(server);
program.command(`${commands[4].name} <projectName>`).description(commands[4].desc).action(start);

program.parse();
