import { series } from "async";

import { initiatingProject } from "../utils/index.js";

function init(projectName) {
  initiatingProject(projectName, (startTime) => {
    const packageTasks = [
      (next) => {
        console.log(`\n✨ Done in ${(Date.now() - startTime) / 1000} seconds\n`);
        next();
      },
    ];

    series(packageTasks);
  });
}

export default init;
