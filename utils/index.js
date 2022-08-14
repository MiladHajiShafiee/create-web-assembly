import fs from "fs";
import ora from "ora";
import path from "path";
import chalk from "chalk";
import { execSync, spawnSync } from "child_process";

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

// --------------------------------- CREATE MAKEFILE CONTENT -------------------------------- :
let contentPaths = [];
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

// ------------------------------------- INITIAL COMMAND ------------------------------------ :
export const runInitialCommand = (sourcePath, filesExtension) => {
  runProCommand("npm pkg set 'type'='module'");
  createMakefileContentArray(sourcePath, `.${filesExtension}`);
  createMakefile();
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

// ------------------------------------- CREATE FOLDERS ------------------------------------- :
export const initiatingProject = (projectName, callback) => {
  console.log("\n");
  const startTime = Date.now();

  const actionHeaders = [
    " -------------------------------- ⚙️  INITIATING THE PROJECT ⚙️  -------------------------------- :",
    " ------------------------------ ➕  CREATING REQUIRED FOLDERS ➕  ------------------------------ :",
    " ------------------------------- ➕  CREATING REQUIRED FILES ➕  ------------------------------- :",
    " ----------------------------------- ⚙️  INSTALLING MODULES ⚙️  --------------------------------- :",
    " ------------------------------ 💻  RUNNING REQUIRED COMMANDS  💻  ----------------------------- :",
  ];

  const folders = [
    { id: "1", name: projectName, dir: "." },
    { id: "2", name: "build", dir: `./${projectName}` },
    { id: "3", name: "source", dir: `./${projectName}` },
    { id: "4", name: "add", dir: `./${projectName}/source` },
    { id: "5", name: "subtract", dir: `./${projectName}/source` },
  ];

  const commands = [{ id: "2", command: "npm init --yes" }];

  const modules = [
    {
      id: "1",
      installer: "npm",
      command: "install",
      name: "cors",
    },
    {
      id: "2",
      installer: "npm",
      command: "install",
      name: "express",
    },
    {
      id: "3",
      installer: "npm",
      command: "install",
      name: "nodemon",
    },
    {
      id: "4",
      installer: "npm",
      command: "link",
      name: "create-webassembly-app",
    },
  ];

  const files = [
    {
      id: "1",
      destinationFileDir: `./${projectName}/app-browser.js`,
      sourceDir: `../create-webassembly-app/files/root/app-browser.js`,
      // sourceDir: `./${projectName}/node_modules/create-webassembly-app/files/root/app-browser.js`,
    },
    {
      id: "2",
      destinationFileDir: `./${projectName}/app-node.js`,
      sourceDir: `../create-webassembly-app/files/root/app-node.js`,
      // sourceDir: `./${projectName}/node_modules/create-webassembly-app/files/root/app-node.js`,
    },
    {
      id: "3",
      destinationFileDir: `./${projectName}/example.js`,
      sourceDir: `../create-webassembly-app/files/root/example.js`,
      // sourceDir: `./${projectName}/node_modules/create-webassembly-app/files/root/example.js`,
    },
    {
      id: "4",
      destinationFileDir: `./${projectName}/index.html`,
      sourceDir: `../create-webassembly-app/files/root/index.html`,
      // sourceDir: `./${projectName}/node_modules/create-webassembly-app/files/root/index.html`,
    },
    {
      id: "5",
      destinationFileDir: `./${projectName}/index.css`,
      sourceDir: `../create-webassembly-app/files/root/index.css`,
      // sourceDir: `./${projectName}/node_modules/create-webassembly-app/files/root/index.css`,
    },
    {
      id: "6",
      destinationFileDir: `./${projectName}/makefile`,
      sourceDir: `../create-webassembly-app/files/root/makefile`,
      // sourceDir: `./${projectName}/node_modules/create-webassembly-app/files/root/makefile`,
    },
    {
      id: "7",
      destinationFileDir: `./${projectName}/server.js`,
      sourceDir: `../create-webassembly-app/files/root/server.js`,
      // sourceDir: `./${projectName}/node_modules/create-webassembly-app/files/root/server.js`,
    },
    {
      id: "8",
      destinationFileDir: `./${projectName}/source/main.c`,
      sourceDir: `../create-webassembly-app/files/source/main.c`,
      // sourceDir: `./${projectName}/node_modules/create-webassembly-app/files/source/main.c`,
    },
    {
      id: "9",
      destinationFileDir: `./${projectName}/source/add/add.c`,
      sourceDir: `../create-webassembly-app/files/source/add/add.c`,
      // sourceDir: `./${projectName}/node_modules/create-webassembly-app/files/source/add/add.c`,
    },
    {
      id: "10",
      destinationFileDir: `./${projectName}/source/add/add.h`,
      sourceDir: `../create-webassembly-app/files/source/add/add.h`,
      // sourceDir: `./${projectName}/node_modules/create-webassembly-app/files/source/add/add.h`,
    },
    {
      id: "11",
      destinationFileDir: `./${projectName}/source/subtract/subtract.c`,
      sourceDir: `../create-webassembly-app/files/source/subtract/subtract.c`,
      // sourceDir: `./${projectName}/node_modules/create-webassembly-app/files/source/subtract/subtract.c`,
    },
    {
      id: "12",
      destinationFileDir: `./${projectName}/source/subtract/subtract.h`,
      sourceDir: `../create-webassembly-app/files/source/subtract/subtract.h`,
      // sourceDir: `./${projectName}/node_modules/create-webassembly-app/files/source/subtract/subtract.h`,
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
