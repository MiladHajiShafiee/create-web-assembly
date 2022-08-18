import fs from "fs";
import ora from "ora";
import path from "path";
import chalk from "chalk";
import { execSync, spawnSync } from "child_process";

import jsonFile from "../files/root/project.config.json" assert { type: "json" };

const isDevEnv = false;

const actionHeaders = [
  " -------------------------------- ⚙️  INITIATING THE PROJECT ⚙️  -------------------------------- :",
  " ------------------------------ ➕  CREATING REQUIRED FOLDERS ➕  ------------------------------ :",
  " ------------------------------- ➕  CREATING REQUIRED FILES ➕  ------------------------------- :",
  " ----------------------------------- ⚙️  INSTALLING MODULES ⚙️  --------------------------------- :",
  " ------------------------------ 💻  RUNNING REQUIRED COMMANDS  💻  ----------------------------- :",
];

const modules = [
  {
    id: "1",
    name: "cors",
    installer: "npm",
    command: "install",
  },
  {
    id: "2",
    name: "express",
    installer: "npm",
    command: "install",
  },
  {
    id: "3",
    name: "nodemon",
    installer: "npm",
    command: "install",
  },
  {
    id: "4",
    installer: "npm",
    name: "create-webassembly-app",
    command: isDevEnv ? "link" : "install",
  },
];

// -------------------------------------- LINE LOGGER --------------------------------------- :
export const lineLogger = (message) => (next) => {
  console.log("\n", chalk.white.bold(message), "\n");
  next();
};

// ------------------------------------- SIMPLE LOGGER -------------------------------------- :
export const simpleLogger = (message) => {
  console.log("\n", chalk.white.bold(message), "\n");
};

// ------------------------------------- CREATE FOLDER -------------------------------------- :
const createFolder = (folderDir) => {
  try {
    if (!fs.existsSync(folderDir)) {
      fs.mkdirSync(folderDir, { recursive: true });

      console.log(
        `\n✅  ${chalk
          .hex("#FFA500")
          .bold(`${folderDir} folder created ${chalk.green.bold("successfully")}`)}\n`
      );
    }
  } catch (err) {
    console.log(chalk.red.bold(`❌ ${err} \n`));
  }
};

// -------------------------------------- CREATE FILES -------------------------------------- :
const createFile = (sourceDir, destinationFileDir) => {
  try {
    if (!fs.existsSync(destinationFileDir)) {
      fs.copyFileSync(sourceDir, destinationFileDir);

      console.log(
        `\n✅  ${chalk
          .hex("#FFA500")
          .bold(`${destinationFileDir} file created ${chalk.green.bold("successfully")}`)}\n`
      );
    }
  } catch (error) {
    console.log(chalk.red.bold(`❌ ${error} \n`));
  }
};

// ------------------------------------- INSTALL MODULE ------------------------------------- :
const installModule = (module, index, isLast, projectName) => {
  console.log(
    `${chalk.white.bold(
      `${chalk.bgHex("#6A0DAD").bold(` ${1 + index} `)} -  Installing ${chalk
        .hex("#FFA500")
        .bold(module.name)}`
    )}`
  );

  spawnSync(module.installer, [module.command, module.name], {
    stdio: "inherit",
    cwd: `./${projectName}`,
  });
  console.log(
    `\n✅  ${chalk
      .hex("#FFA500")
      .bold(`${module.name} installed ${chalk.green.bold("successfully")}`)}\n`
  );
  if (!isLast) {
    console.log(
      "-------------------------------------------------------------------------------------------------\n"
    );
  }
};

// ------------------------------ CONFIGURE PROJECT CONFIG JSON ------------------------------ :
export const configProjectJson = (wasmFileName, memoryInitial, memoryMaximum) => {
  const jsonFilePath = "./project.config.json";

  jsonFile.wasmFileName = wasmFileName;
  jsonFile.memoryInitial = parseInt(memoryInitial, 10);
  jsonFile.memoryMaximum = parseInt(memoryMaximum, 10);

  try {
    if (fs.existsSync(jsonFilePath)) {
      fs.writeFileSync(jsonFilePath, JSON.stringify(jsonFile));
      console.log(
        `\n✅  ${chalk
          .hex("#FFA500")
          .bold(`${jsonFilePath} configured ${chalk.green.bold("successfully")}`)}\n`
      );
    } else if (fs.existsSync("./src/project.config.json")) {
      fs.writeFileSync("./src/project.config.json", JSON.stringify(jsonFile));
      console.log(
        `\n✅  ${chalk
          .hex("#FFA500")
          .bold(`${jsonFilePath} configured ${chalk.green.bold("successfully")}`)}\n`
      );
    }
  } catch (error) {
    console.log(chalk.red.bold(`❌ ${error} \n`));
  }
};

// ------------------------------ CREATE MAKEFILE CONTENT ARRAY ----------------------------- :
let contentPaths;
const createMakefileContentArray = (folderPath, fileExtension) => {
  if (!fs.existsSync(folderPath)) {
    console.log(chalk.red.bold(`❌ There is no ${folderPath} path \n`));
    return;
  }

  const files = fs.readdirSync(folderPath);

  for (let i = 0; i < files.length; i++) {
    const filename = path.join(folderPath, files[i]);
    const stat = fs.lstatSync(filename);

    if (stat.isDirectory()) {
      createMakefileContentArray(filename, fileExtension); //recurse
    } else if (filename.endsWith(fileExtension)) {
      const splitFilename = filename.split("/");
      splitFilename.pop();
      const convertSplitFilenameToPath = splitFilename.join("/");
      const prefixFilename = `./${convertSplitFilenameToPath}/*${fileExtension}`;
      contentPaths = [...contentPaths, prefixFilename];
    }
  }
};

// ------------------------------------- CREATE MAKEFILE ------------------------------------ :
const createMakefile = () => {
  const makeCommand = `build_to_js: ${contentPaths.join(" ")}
\temcc ${contentPaths.join(" ")} -o ./build/$(FILENAME).js

build_to_html: ${contentPaths.join(" ")}
\temcc ${contentPaths.join(" ")} -o ./build/$(FILENAME).html

build_to_js_optLevel_-O1: ${contentPaths.join(" ")}
\temcc -O1 ${contentPaths.join(" ")} -o ./build/$(FILENAME).js

build_to_html_optLevel_-O1: ${contentPaths.join(" ")}
\temcc -O1 ${contentPaths.join(" ")} -o ./build/$(FILENAME).html

build_to_js_optLevel_-O2: ${contentPaths.join(" ")}
\temcc -O2 ${contentPaths.join(" ")} -o ./build/$(FILENAME).js

build_to_html_optLevel_-O2: ${contentPaths.join(" ")}
\temcc -O2 ${contentPaths.join(" ")} -o ./build/$(FILENAME).html
`;

  try {
    fs.writeFileSync("./makefile", makeCommand);
    console.log(
      `\n ✅  ${chalk
        .hex("#FFA500")
        .bold(`   makefile's content is added to makefile ${chalk.green.bold("successfully")}`)}\n`
    );
  } catch (err) {
    console.log(chalk.red.bold(`❌  ${err} \n`));
  }
};

// ---------------------------------- CREATE REACT MAKEFILE --------------------------------- :
const createReactMakefile = () => {
  const makeCommand = `build_to_js: ${contentPaths.join(" ")}
\temcc ${contentPaths.join(" ")} -o ./build/$(FILENAME).js

build_to_js_optLevel_-O1: ${contentPaths.join(" ")}
\temcc -O1 ${contentPaths.join(" ")} -o ./build/$(FILENAME).js

build_to_js_optLevel_-O2: ${contentPaths.join(" ")}
\temcc -O2 ${contentPaths.join(" ")} -o ./build/$(FILENAME).js
`;

  try {
    fs.writeFileSync("./makefile", makeCommand);
    console.log(
      `\n ✅  ${chalk
        .hex("#FFA500")
        .bold(`   makefile's content is added to makefile ${chalk.green.bold("successfully")}`)}\n`
    );
  } catch (err) {
    console.log(chalk.red.bold(`❌  ${err} \n`));
  }
};

// ------------------------------------- INITIAL COMMAND ------------------------------------ :
export const runInitialCommand = (sourcePath, filesExtension) => {
  contentPaths = [];
  runProCommand("npm pkg set 'type'='module'");
  createMakefileContentArray(sourcePath, `.${filesExtension}`);
  createMakefile();
};

// ---------------------------------- REACT INITIAL COMMAND --------------------------------- :
export const runReactInitialCommand = (sourcePath, filesExtension) => {
  contentPaths = [];
  createMakefileContentArray(sourcePath, `.${filesExtension}`);
  createReactMakefile();
};

// --------------------------------------- RUN COMMAND -------------------------------------- :
const runCommand = (command, index, projectName) => {
  const spinner = ora({
    prefixText: " ",
    spinner: "clock",
    text: `${chalk.white.bold(
      `${1 + index} -  Running "${chalk.hex("#FFA500").bold(command.command)}"`
    )}`,
  }).start();

  try {
    execSync(command.command, { cwd: `./${projectName}` });
    spinner.stopAndPersist({
      symbol: "✅ ",
      text: `${1 + index} -  ${chalk
        .hex("#FFA500")
        .bold(`"${command.command}" run ${chalk.green.bold("successfully")}`)}\n`,
    });
  } catch (error) {
    spinner.color = "red";
    spinner.stopAndPersist({
      symbol: "  ❌ ",
      text: `${chalk.red.bold(`exec error: ${error}`)}`,
    });
  }
};

// -------------------------------------- RUN PROCOMMAND ------------------------------------ :
export const runProCommand = (command) => {
  const spinner = ora({
    prefixText: "\n",
    spinner: "clock",
    text: `${chalk.white.bold(`  Running "${chalk.hex("#FFA500").bold(command)}"`)}`,
  }).start();

  try {
    execSync(command);
    spinner.stopAndPersist({
      symbol: "✅ ",
      text: `  ${chalk
        .hex("#FFA500")
        .bold(`"${command}" run ${chalk.green.bold("successfully")}`)}\n`,
    });
  } catch (error) {
    spinner.color = "red";
    spinner.stopAndPersist({
      symbol: "  ❌ ",
      text: `${chalk.red.bold(`exec error: ${error}`)}`,
    });
  }
};

// ------------------------------------- INITIAL PROJECT ------------------------------------ :
export const initiatingProject = (projectName, callback) => {
  console.log("\n");
  const startTime = Date.now();

  const folders = [
    { id: "1", name: projectName, dir: "." },
    { id: "2", name: "build", dir: `./${projectName}` },
    { id: "3", name: "source", dir: `./${projectName}` },
    { id: "4", name: "add", dir: `./${projectName}/source` },
    { id: "5", name: "subtract", dir: `./${projectName}/source` },
  ];

  const commands = [{ id: "2", command: "npm init --yes" }];

  const files = [
    {
      id: "1",
      destinationFileDir: `./${projectName}/app-browser.js`,
      sourceDir: isDevEnv
        ? `../create-webassembly-app/files/root/app-browser.js`
        : `./${projectName}/node_modules/create-webassembly-app/files/root/app-browser.js`,
    },
    {
      id: "2",
      destinationFileDir: `./${projectName}/app-node.js`,
      sourceDir: isDevEnv
        ? `../create-webassembly-app/files/root/app-node.js`
        : `./${projectName}/node_modules/create-webassembly-app/files/root/app-node.js`,
    },
    {
      id: "3",
      destinationFileDir: `./${projectName}/example.js`,
      sourceDir: isDevEnv
        ? `../create-webassembly-app/files/root/example.js`
        : `./${projectName}/node_modules/create-webassembly-app/files/root/example.js`,
    },
    {
      id: "4",
      destinationFileDir: `./${projectName}/index.html`,
      sourceDir: isDevEnv
        ? `../create-webassembly-app/files/root/index.html`
        : `./${projectName}/node_modules/create-webassembly-app/files/root/index.html`,
    },
    {
      id: "5",
      destinationFileDir: `./${projectName}/index.css`,
      sourceDir: isDevEnv
        ? `../create-webassembly-app/files/root/index.css`
        : `./${projectName}/node_modules/create-webassembly-app/files/root/index.css`,
    },
    {
      id: "6",
      destinationFileDir: `./${projectName}/makefile`,
      sourceDir: isDevEnv
        ? `../create-webassembly-app/files/root/makefile`
        : `./${projectName}/node_modules/create-webassembly-app/files/root/makefile`,
    },
    {
      id: "7",
      destinationFileDir: `./${projectName}/server.js`,
      sourceDir: isDevEnv
        ? `../create-webassembly-app/files/root/server.js`
        : `./${projectName}/node_modules/create-webassembly-app/files/root/server.js`,
    },
    {
      id: "8",
      destinationFileDir: `./${projectName}/js-helpers-browser.js`,
      sourceDir: isDevEnv
        ? `../create-webassembly-app/files/root/js-helpers-browser.js`
        : `./${projectName}/node_modules/create-webassembly-app/files/root/js-helpers-browser.js`,
    },
    {
      id: "9",
      destinationFileDir: `./${projectName}/js-helpers-node.js`,
      sourceDir: isDevEnv
        ? `../create-webassembly-app/files/root/js-helpers-node.js`
        : `./${projectName}/node_modules/create-webassembly-app/files/root/js-helpers-node.js`,
    },
    {
      id: "10",
      destinationFileDir: `./${projectName}/loader-browser.js`,
      sourceDir: isDevEnv
        ? `../create-webassembly-app/files/root/loader-browser.js`
        : `./${projectName}/node_modules/create-webassembly-app/files/root/loader-browser.js`,
    },
    {
      id: "11",
      destinationFileDir: `./${projectName}/loader-node.js`,
      sourceDir: isDevEnv
        ? `../create-webassembly-app/files/root/loader-node.js`
        : `./${projectName}/node_modules/create-webassembly-app/files/root/loader-node.js`,
    },
    {
      id: "12",
      destinationFileDir: `./${projectName}/project.config.json`,
      sourceDir: isDevEnv
        ? `../create-webassembly-app/files/root/project.config.json`
        : `./${projectName}/node_modules/create-webassembly-app/files/root/project.config.json`,
    },
    {
      id: "13",
      destinationFileDir: `./${projectName}/source/main.c`,
      sourceDir: isDevEnv
        ? `../create-webassembly-app/files/source/main.c`
        : `./${projectName}/node_modules/create-webassembly-app/files/source/main.c`,
    },
    {
      id: "14",
      destinationFileDir: `./${projectName}/source/add/add.c`,
      sourceDir: isDevEnv
        ? `../create-webassembly-app/files/source/add/add.c`
        : `./${projectName}/node_modules/create-webassembly-app/files/source/add/add.c`,
    },
    {
      id: "15",
      destinationFileDir: `./${projectName}/source/add/add.h`,
      sourceDir: isDevEnv
        ? `../create-webassembly-app/files/source/add/add.h`
        : `./${projectName}/node_modules/create-webassembly-app/files/source/add/add.h`,
    },
    {
      id: "16",
      destinationFileDir: `./${projectName}/source/subtract/subtract.c`,
      sourceDir: isDevEnv
        ? `../create-webassembly-app/files/source/subtract/subtract.c`
        : `./${projectName}/node_modules/create-webassembly-app/files/source/subtract/subtract.c`,
    },
    {
      id: "17",
      destinationFileDir: `./${projectName}/source/subtract/subtract.h`,
      sourceDir: isDevEnv
        ? `../create-webassembly-app/files/source/subtract/subtract.h`
        : `./${projectName}/node_modules/create-webassembly-app/files/source/subtract/subtract.h`,
    },
  ];

  simpleLogger(actionHeaders[1]);
  folders.forEach((folder) => {
    createFolder(`${folder.dir}/${folder.name}`);
  });

  simpleLogger(actionHeaders[4]);
  commands.forEach((command, index) => {
    runCommand(command, index, projectName);
  });

  simpleLogger(actionHeaders[3]);
  modules.forEach((module, index) => {
    const isLast = 1 + index === modules.length;
    installModule(module, index, isLast, projectName);
  });

  simpleLogger(actionHeaders[2]);
  files.forEach((file) => {
    createFile(file.sourceDir, file.destinationFileDir);
  });

  callback(startTime);
};

// ---------------------------------- INITIAL REACT PROJECT --------------------------------- :
export const initiateReactProject = (callback) => {
  console.log("\n");
  const startTime = Date.now();

  const folders = [
    { id: "1", name: "wasm", dir: "./src" },
    { id: "2", name: "build", dir: "./src/wasm" },
    { id: "3", name: "source", dir: "./src/wasm" },
    { id: "4", name: "add", dir: "./src/wasm/source" },
    { id: "5", name: "subtract", dir: "./src/wasm/source" },
  ];

  const files = [
    {
      id: "1",
      destinationFileDir: "./src/App.js",
      sourceDir: isDevEnv
        ? "../create-webassembly-app/files/react/App.js"
        : "./node_modules/create-webassembly-app/files/react/App.js",
    },
    {
      id: "2",
      destinationFileDir: "./src/App.css",
      sourceDir: isDevEnv
        ? "../create-webassembly-app/files/react/App.css"
        : "./node_modules/create-webassembly-app/files/react/App.css",
    },
    {
      id: "3",
      destinationFileDir: "./src/wasm/use-wasm.js",
      sourceDir: isDevEnv
        ? "../create-webassembly-app/files/react/use-wasm.js"
        : "./node_modules/create-webassembly-app/files/react/use-wasm.js",
    },
    {
      id: "4",
      destinationFileDir: "./src/wasm/js-helpers.js",
      sourceDir: isDevEnv
        ? "../create-webassembly-app/files/react/js-helpers.js"
        : "./node_modules/create-webassembly-app/files/react/js-helpers.js",
    },
    {
      id: "5",
      destinationFileDir: `./src/project.config.json`,
      sourceDir: isDevEnv
        ? "../create-webassembly-app/files/root/project.config.json"
        : `./node_modules/create-webassembly-app/files/root/project.config.json`,
    },
    {
      id: "6",
      destinationFileDir: "./src/wasm/makefile",
      sourceDir: isDevEnv
        ? "../create-webassembly-app/files/react/makefile"
        : "./node_modules/create-webassembly-app/files/react/makefile",
    },
    {
      id: "7",
      destinationFileDir: "./src/wasm/source/main.c",
      sourceDir: isDevEnv
        ? "../create-webassembly-app/files/source/main.c"
        : "./node_modules/create-webassembly-app/files/source/main.c",
    },
    {
      id: "8",
      destinationFileDir: "./src/wasm/source/add/add.c",
      sourceDir: isDevEnv
        ? "../create-webassembly-app/files/source/add/add.c"
        : "./node_modules/create-webassembly-app/files/source/add/add.c",
    },
    {
      id: "9",
      destinationFileDir: "./src/wasm/source/add/add.h",
      sourceDir: isDevEnv
        ? "../create-webassembly-app/files/source/add/add.h"
        : "./node_modules/create-webassembly-app/files/source/add/add.h",
    },
    {
      id: "10",
      destinationFileDir: "./src/wasm/source/subtract/subtract.c",
      sourceDir: isDevEnv
        ? "../create-webassembly-app/files/source/subtract/subtract.c"
        : "./node_modules/create-webassembly-app/files/source/subtract/subtract.c",
    },
    {
      id: "11",
      destinationFileDir: "./src/wasm/source/subtract/subtract.h",
      sourceDir: isDevEnv
        ? "../create-webassembly-app/files/source/subtract/subtract.h"
        : "./node_modules/create-webassembly-app/files/source/subtract/subtract.h",
    },
  ];

  fs.unlinkSync("./src/App.js");
  fs.unlinkSync("./src/App.css");

  simpleLogger(actionHeaders[1]);
  folders.forEach((folder) => {
    createFolder(`${folder.dir}/${folder.name}`);
  });

  simpleLogger(actionHeaders[3]);
  installModule(modules[3], 0, true, "");

  simpleLogger(actionHeaders[2]);
  files.forEach((file) => {
    createFile(file.sourceDir, file.destinationFileDir);
  });

  callback(startTime);
};
